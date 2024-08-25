import { makeObservable } from "mobx";
import {
    totalBuyAndSellQuantities,
    totalBuyAndSellPrices,
    totalAssetExchanges,
    lowestCurrentPrice,
    averageSellPrice } from '@/app/data-actions';
import { RootStore } from "@/stores/RootStore";

export class DataStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this, {})
    }

    async initialize() {
        console.log('Initializing DataStore...');
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
        return await totalAssetExchanges(mint, currency);
    }

    async averageSellPrice(mint: string, currency: string) {
        return await averageSellPrice(mint, currency);
    }
}
