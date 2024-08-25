import { StarRating } from "@/lib/types";
import { RootStore } from "@/stores/RootStore";
import { assets } from '@/lib/metadata';
import { ATLAS, USDC } from '@/lib/constants';
import { toast } from "sonner";

export class AssetPresenter {
    private static instance: AssetPresenter | null = null;
    private rootStore: RootStore;
    assetData: StarRating[]

    constructor() {
        this.assetData = []
        this.rootStore = RootStore.getInstance();
    }

    static getInstance(): AssetPresenter {
        if (!AssetPresenter.instance) {
            AssetPresenter.instance = new AssetPresenter();
        }
        return AssetPresenter.instance;
    }

    async fetchAssetData(mint: string, currency: string): Promise<StarRating[]> {
        const findMint = assets.find(asset => asset.name.toLowerCase() === mint)!;
        const findCurrency = currency === 'USDC' ? USDC : ATLAS;
        const batchSize = 5; // Adjust this value based on APIs capacity
        let totalClassBuyPrice = 0;
        let totalClassVolume = 0;

        if (!findMint) {
            toast.error('Asset not found' , {
                richColors: true,
                duration: 5000
            });
        }

        const assetsInClass = assets.filter(asset => asset.class === findMint.class);

        // Process assets in batches of 5
        for (let i = 0; i < assetsInClass.length; i += batchSize) {
            const batch = assetsInClass.slice(i, i + batchSize);
            totalClassBuyPrice += await this.processLRBatch(batch, findCurrency);

            // Optional: Add a small delay between batches to reduce server load
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        for (let i = 0; i < assetsInClass.length; i += batchSize) {
            const batch = assetsInClass.slice(i, i + batchSize);
            totalClassVolume += await this.processVolumeBatch(batch, findCurrency);

            // Optional: Add a small delay between batches to reduce server load
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        const averageClassBuyPrice = totalClassBuyPrice / assetsInClass.length;
        const averageClassVolume = totalClassVolume / assetsInClass.length;

        // Fetch data for the specific asset
        const [
            lowestCurrentPrice,
            totalBuyAndSellQty,
            totalBuyAndSellPrice,
            averageSellPrice,
            totalTradingVolume
        ] = await Promise.all([
            this.rootStore.dataStore.lowestCurrentPrice(findMint.mint, findCurrency),
            this.rootStore.dataStore.totalBuyAndSellQuantities(findMint.mint, findCurrency),
            this.rootStore.dataStore.totalBuyAndSellPrices(findMint.mint, findCurrency),
            this.rootStore.dataStore.averageSellPrice(findMint.mint, findCurrency),
            this.rootStore.dataStore.totalAssetExchanges(findMint.mint, findCurrency)
        ]);

        console.log('trading volume:', totalTradingVolume)
        console.log('average class trading volume:', averageClassVolume)

        const vr = (totalTradingVolume / averageClassVolume) * 100
        const dr = (totalBuyAndSellQty.totalBuyQuantity! / totalBuyAndSellQty.totalSellQuantity!) * 100;
        const pcr = ((averageSellPrice.averageSellPrice! - lowestCurrentPrice.lowestSellPrice!) / averageSellPrice.averageSellPrice!) * 100;
        const lr = (totalBuyAndSellPrice.totalBuyPrice! / averageClassBuyPrice) * 100
        const sr = (vr * 0.4) + (dr * 0.3) + (lr * 0.2) + (pcr * 0.1);

        this.assetData.push({
            totalBuyQuantity: totalBuyAndSellQty.totalBuyQuantity,
            totalSellQuantity: totalBuyAndSellQty.totalSellQuantity,
            totalBuyPrice: totalBuyAndSellPrice.totalBuyPrice,
            totalSellPrice: totalBuyAndSellPrice.totalSellPrice,
            lowestSellPrice: lowestCurrentPrice.lowestSellPrice,
            demandRating: dr,
            priceCompetitivenessRating: pcr,
            classLiquidity: lr,
            volumeRating: vr,
            starRating: sr
        });

        return [this.assetData[this.assetData.length - 1]];
    }

    /* Batch processing method */
    processLRBatch = async (batch: typeof assets, findCurrency: string): Promise<number> => {
        const batchPromises = batch.map(asset =>
            this.rootStore.dataStore.totalBuyAndSellPrices(asset.mint, findCurrency)
        );
        const batchResults = await Promise.all(batchPromises);
        return batchResults.reduce((sum, result) => sum + (result.totalBuyPrice || 0), 0);
    };

    processVolumeBatch = async (batch: typeof assets, findCurrency: string): Promise<number> => {
        const batchPromises = batch.map(asset =>
            this.rootStore.dataStore.totalAssetExchanges(asset.mint, findCurrency)
        );
        const batchResults = await Promise.all(batchPromises);
        return batchResults.reduce((sum, result) => sum + (result || 0), 0);
    };
}
