import { makeObservable } from "mobx";
import {
    averageSellPrice,
    lowestCurrentPrice,
    totalAssetExchanges,
    totalBuyAndSellPrices,
    totalBuyAndSellQuantities
} from '@/app/data-actions';
import { RootStore } from "@/stores/RootStore";
// import NodeCache from "node-cache";

export class DataStore {
    // private cache: NodeCache;
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        // this.cache = new NodeCache({ stdTTL: 600 });

        makeObservable(this, {})
    }

    async initialize() {
        //console.log('Initializing DataStore...');
    }

    async lowestCurrentPrice(mint: string, currency: string) {
        return await lowestCurrentPrice(mint, currency);
    }

    async totalBuyAndSellQuantities(mint: string, currency: string) {
        return await totalBuyAndSellQuantities(mint, currency);
    }

    async totalBuyAndSellPrices(mint: string, currency: string) {
        try {
            return await totalBuyAndSellPrices(mint, currency);
        } catch (error) {
            console.error('Error in DataStore.totalBuyAndSellPrices:', error);
            throw error;
        }
    }

    async totalAssetExchanges(mint: string, currency: string) {
        const cacheKey = `totalAssetExchanges-${mint}-${currency}`;
        // const cachedResult = this.cache.get<number>(cacheKey);
        //
        // if (cachedResult !== undefined) {
        //     return cachedResult;
        // }

        try {
            // this.cache.set(cacheKey, result);
            return await totalAssetExchanges( mint, currency );
        } catch (error) {
            console.error('Error in DataStore.totalAssetExchanges:', error);
            throw error;
        }
    }

    async averageSellPrice(mint: string, currency: string) {
        return await averageSellPrice(mint, currency);
    }
}
