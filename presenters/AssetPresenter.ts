import { StarRating } from "@/lib/types";
import { RootStore } from "@/stores/RootStore";
import { assets } from '@/lib/metadata';
import { ATLAS, USDC } from '@/lib/constants';
import { toast } from "sonner";
import NodeCache from "node-cache";

export class AssetPresenter {
    private static instance: AssetPresenter | null = null;
    private rootStore: RootStore;
    private cache: NodeCache;

    constructor() {
        this.rootStore = RootStore.getInstance();
        this.cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes
        // Add event listener for cache operations
        this.cache.on("set", (key, value) => {
            // console.log(`Cache set: ${key}`);
        });
        this.cache.on("del", (key, value) => {
            // console.log(`Cache deleted: ${key}`);
        });
    }

    static getInstance(): AssetPresenter {
        if (!AssetPresenter.instance) {
            AssetPresenter.instance = new AssetPresenter();
        }
        return AssetPresenter.instance;
    }

    private dataUpdateCallback: ((data: Partial<StarRating>) => void) | null = null;

    async fetchAssetData(mint: string, currency: string, callback: (data: Partial<StarRating>) => void): Promise<void> {
        this.dataUpdateCallback = callback;
        const cacheKey = `${mint}-${currency}`;
        const cachedData = this.cache.get<StarRating>(cacheKey)!;
        if (cachedData) {
            // console.log('Cache hit:', cacheKey);
            this.emitPartialData(cachedData);
            return;
        } else {
            // console.log('Cache miss:', cacheKey);
        }


        const findMint = assets.find(asset => asset.name.toLowerCase() === mint.toLowerCase());
        if (!findMint) {
            toast.error('Asset not found', {
                richColors: true,
                duration: 5000
            });
            throw new Error('Asset not found');
        }

        const findCurrency = currency === 'USDC' ? USDC : ATLAS;
        const assetsInClass = assets.filter(asset => asset.class === findMint.class);

        const assetData: Partial<StarRating> = {};

        // Fetch data progressively
        const dataFetchers = [
            this.fetchLowestCurrentPrice(findMint.mint, findCurrency),
            this.fetchTotalBuyAndSellQuantities(findMint.mint, findCurrency),
            this.fetchTotalBuyAndSellPrices(findMint.mint, findCurrency),
            this.fetchAverageSellPrice(findMint.mint, findCurrency),
            this.fetchTotalTradingVolume(findMint.mint, findCurrency),
            this.calculateClassAverages(assetsInClass, findCurrency),
        ];

        for (const fetcher of dataFetchers) {
            try {
                const result = await fetcher;
                // console.log('Fetcher result:', result);
                Object.assign(assetData, result);
                this.emitPartialData(assetData);
            } catch (error) {
                console.error('Error fetching data:', error);
                // this.emitPartialData({ error: 'Error fetching data' });
            }
        }

        // console.log('All data fetched, calculating ratings...');
        // console.log('Data before calculateRatings:', assetData);
        const fullData = this.calculateRatings(assetData as StarRating);
        // console.log('Full data after calculateRatings:', fullData);
        this.cache.set(cacheKey, fullData);
        // console.log('Caching data:', fullData);
        this.emitPartialData(fullData);
    }

    private async fetchLowestCurrentPrice(mint: string, currency: string): Promise<StarRating> {
        const data = await this.rootStore.dataStore.lowestCurrentPrice(mint, currency);
        return { lowestSellPrice: data.lowestSellPrice };
    }

    private async fetchTotalBuyAndSellQuantities(mint: string, currency: string): Promise<StarRating> {
        const data = await this.rootStore.dataStore.totalBuyAndSellQuantities(mint, currency);
        return {
            totalBuyQuantity: data.totalBuyQuantity,
            totalSellQuantity: data.totalSellQuantity
        };
    }

    private async fetchTotalBuyAndSellPrices(mint: string, currency: string): Promise<StarRating> {
        const data = await this.rootStore.dataStore.totalBuyAndSellPrices(mint, currency);
        return {
            totalBuyPrice: data.totalBuyPrice,
            totalSellPrice: data.totalSellPrice
        };
    }

    private async fetchAverageSellPrice(mint: string, currency: string): Promise<StarRating> {
        const data = await this.rootStore.dataStore.averageSellPrice(mint, currency);
        return { averageSellPrice: data.averageSellPrice };
    }

    private async fetchTotalTradingVolume(mint: string, currency: string): Promise<StarRating> {
        const cacheKey = `totalTradingVolume-${mint}-${currency}`;
        const cachedVolume = this.cache.get<number>(cacheKey);

        if (cachedVolume !== undefined) {
            return { totalTradingVolume: cachedVolume };
        }

        const volume = await this.rootStore.dataStore.totalAssetExchanges(mint, currency);
        this.cache.set(cacheKey, volume);
        return { totalTradingVolume: volume };
    }

    private async calculateClassAverages(assetsInClass: typeof assets, currency: string): Promise<StarRating> {
        const batchSize = 5;
        let totalClassBuyPrice = 0;
        let totalClassVolume = 0;

        for (let i = 0; i < assetsInClass.length; i += batchSize) {
            const batch = assetsInClass.slice(i, i + batchSize);
            const [batchBuyPrice, batchVolume] = await Promise.all([
                this.processLRBatch(batch, currency),
                this.processVolumeBatch(batch, currency)
            ]);
            totalClassBuyPrice += batchBuyPrice;
            totalClassVolume += batchVolume;
        }

        return {
            averageClassBuyPrice: totalClassBuyPrice / assetsInClass.length,
            averageClassVolume: totalClassVolume / assetsInClass.length
        };
    }

    private async processLRBatch(batch: typeof assets, currency: string): Promise<number> {
        const batchPromises = batch.map(asset =>
            this.rootStore.dataStore.totalBuyAndSellPrices(asset.mint, currency)
        );
        const batchResults = await Promise.all(batchPromises);
        return batchResults.reduce((sum, result) => sum + (result.totalBuyPrice || 0), 0);
    }

    private async processVolumeBatch(batch: typeof assets, currency: string): Promise<number> {
        const batchPromises = batch.map(asset =>
            this.rootStore.dataStore.totalAssetExchanges(asset.mint, currency)
        );
        const batchResults = await Promise.all(batchPromises);
        return batchResults.reduce((sum, result) => sum + (result || 0), 0);
    }

    private calculateRatings(data: StarRating): StarRating {
        // console.log('Calculating ratings with data:', data);
        const vr = (data.totalTradingVolume! / data.averageClassVolume!) * 100;
        const dr = (data.totalBuyQuantity! / data.totalSellQuantity!) * 100;
        const pcr = ((data.averageSellPrice! - data.lowestSellPrice!) / data.averageSellPrice!) * 100;
        const lr = (data.totalBuyPrice! / data.averageClassBuyPrice!) * 100;
        const sr = (vr * 0.4) + (dr * 0.3) + (lr * 0.2) + (pcr * 0.1);

        return {
            ...data,
            volumeRating: vr,
            demandRating: dr,
            priceCompetitivenessRating: pcr,
            classLiquidity: lr,
            starRating: sr
        };
    }

    private emitPartialData(data: Partial<StarRating>) {
        console.log('Emitting partial data:', data);
        if (this.dataUpdateCallback) {
            this.dataUpdateCallback(data);
        }
    }
}
