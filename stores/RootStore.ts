import 'reflect-metadata';
import { makeObservable, observable } from "mobx";
import { singleton } from "tsyringe";
import { PlayerStore } from "@/stores/PlayerStore";
import { WalletStore } from '@/stores/WalletStore';

@singleton()
export class RootStore {
    private static instance: RootStore | null = null;
    walletStore: WalletStore;
    playerStore: PlayerStore;

    constructor() {
        this.walletStore = new WalletStore();
        this.playerStore = new PlayerStore(this);

        makeObservable(this, {
            walletStore: observable,
            playerStore: observable
        })
    }

    static getInstance(): RootStore {
        if (!RootStore.instance) {
            RootStore.instance = new RootStore();
        }
        return RootStore.instance;
    }

    async initializeStores() {
        // Startup sequence for all stores
        await Promise.all([
            this.walletStore.initialize()
        ])

        if ( this.walletStore.connected ) {
            // await this.playerStore.loadPlayerName();
        }

        // if they have a player profile, then load it. If not, then direct them to Sage website

        // if they have a player profile, check if they have an account. If not, they create one

        // If they have an account, load the membership data from mongo database
    }
}
