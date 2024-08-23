import { StarRating } from "@/lib/types";
import { RootStore } from "@/stores/RootStore";
import { assets } from '@/lib/metadata';
import { ATLAS, USDC } from '@/lib/constants';

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

        const lowestCurrentPrice = await this.rootStore.dataStore.lowestCurrentPrice(findMint?.mint!, findCurrency);
        const totalBuyAndSellQty = await this.rootStore.dataStore.totalBuyAndSellQuantities(findMint?.mint!, findCurrency);
        const totalBuyAndSellPrice = await this.rootStore.dataStore.totalBuyAndSellPrices(findMint?.mint!, findCurrency);

        this.assetData.push({
            totalBuyQuantity: totalBuyAndSellQty.totalBuyQuantity,
            totalSellQuantity: totalBuyAndSellQty.totalSellQuantity,
            totalBuyPrice: totalBuyAndSellPrice.totalBuyPrice,
            totalSellPrice: totalBuyAndSellPrice.totalSellPrice,
            lowestSellPrice: lowestCurrentPrice.lowestSellPrice
        });

        return this.assetData.map(asset => ({
            lowestSellPrice: asset.lowestSellPrice,
            totalBuyQuantity: asset.totalBuyQuantity,
            totalSellQuantity: asset.totalSellQuantity,
            totalBuyPrice: asset.totalBuyPrice,
            totalSellPrice: asset.totalSellPrice
        }))
    }
}
