import { StarRating } from "@/lib/types";
import { RootStore } from "@/stores/RootStore";
import { assets } from '@/lib/metadata';
import { ATLAS, USDC } from '@/lib/constants';
import { mean } from "lodash";

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
        const findMint = assets.find(asset => asset.name.toLowerCase() === mint);
        const findCurrency = currency === 'USDC' ? USDC : ATLAS;

        let totalClassBuyPrice = 0;

        const lowestCurrentPrice = await this.rootStore.dataStore.lowestCurrentPrice(findMint?.mint!, findCurrency);
        const totalBuyAndSellQty = await this.rootStore.dataStore.totalBuyAndSellQuantities(findMint?.mint!, findCurrency);
        const totalBuyAndSellPrice = await this.rootStore.dataStore.totalBuyAndSellPrices(findMint?.mint!, findCurrency);
        const demandRating = (totalBuyAndSellQty.totalBuyQuantity! / totalBuyAndSellQty.totalSellQuantity!) * 50;
        const averageSellPrice = await this.rootStore.dataStore.averageSellPrice(findMint?.mint!, findCurrency);
        const pcr = ((averageSellPrice.averageSellPrice! - lowestCurrentPrice.lowestSellPrice!) / averageSellPrice.averageSellPrice!) * 100;

        for (let asset of assets) {
            if (asset.class === findMint?.class) {
                const buyPrice = await this.rootStore.dataStore.totalBuyAndSellPrices(asset.mint, findCurrency);
                totalClassBuyPrice += buyPrice.totalBuyPrice!;
                console.log('total class buy price...', asset.name, totalClassBuyPrice);
            }
        }

        const averageClassBuyPrice = totalClassBuyPrice / assets.filter(asset => asset.class === findMint?.class).length;
        console.log('average class buy price...', averageClassBuyPrice);
        console.log('length...', assets.filter(asset => asset.class === findMint?.class).length);
        const lr = (totalBuyAndSellPrice.totalBuyPrice! / averageClassBuyPrice) * 100;
        const sr = (demandRating! * 0.3) + (lr! * 0.2) + ( pcr! * 0.1 );

        this.assetData.push({
            totalBuyQuantity: totalBuyAndSellQty.totalBuyQuantity,
            totalSellQuantity: totalBuyAndSellQty.totalSellQuantity,
            totalBuyPrice: totalBuyAndSellPrice.totalBuyPrice,
            totalSellPrice: totalBuyAndSellPrice.totalSellPrice,
            lowestSellPrice: lowestCurrentPrice.lowestSellPrice,
            demandRating: demandRating,
            priceCompetitivenessRating: pcr,
            starRating: sr,
            classLiquidity: lr
        });

        return this.assetData.map(asset => ({
            lowestSellPrice: asset.lowestSellPrice,
            totalBuyQuantity: asset.totalBuyQuantity,
            totalSellQuantity: asset.totalSellQuantity,
            totalBuyPrice: asset.totalBuyPrice,
            totalSellPrice: asset.totalSellPrice,
            demandRating: asset.demandRating,
            priceCompetitivenessRating: asset.priceCompetitivenessRating,
            starRating: asset.starRating,
            classLiquidity: asset.classLiquidity
        }))
    }
}
