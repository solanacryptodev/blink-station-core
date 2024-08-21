import { makeObservable } from "mobx";
import { totalBuyAndSellQuantities, totalBuyAndSellPrices } from '@/app/flipside-actions';
import { ATLAS } from '@/lib/constants'
import { RootStore } from "@/stores/RootStore";
import { assets } from '@/lib/metadata'

export class DataStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this, {

        })
    }

    async initialize() {
        const ship = assets[8].mint;
        const data = await totalBuyAndSellQuantities(ship, ATLAS);
        console.log('totalBuys...', data.totalBuyQuantity);
        console.log('totalSells...', data.totalSellQuantity);

        const amtData = await totalBuyAndSellPrices(ship, ATLAS);
        console.log('totalBuysAmounts...', amtData.totalBuyPrice);
        console.log('totalSellsAmounts...', amtData.totalSellPrice);
    }
}
