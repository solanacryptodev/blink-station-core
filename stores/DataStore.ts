import { makeObservable } from "mobx";
import {
    totalBuyAndSellQuantities,
    totalBuyAndSellPrices,
    totalAssetExchanges,
    lowestCurrentPrice,
    averageSellPrice } from '@/app/data-actions';
import { RootStore } from "@/stores/RootStore";

export class DataStore {
    private static instance: DataStore | null = null;
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this, {

        })
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
        return await totalBuyAndSellPrices(mint, currency);
    }

    async totalAssetExchanges(mint: string, currency: string) {
        return await totalAssetExchanges(mint, currency);
    }

    async averageSellPrice(mint: string, currency: string) {
        return await averageSellPrice(mint, currency);
    }
}
