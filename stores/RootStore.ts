import 'reflect-metadata';
import { makeObservable, observable } from "mobx";
import { singleton } from "tsyringe";
import { PlayerStore } from "@/stores/PlayerStore";
import { WalletStore } from '@/stores/WalletStore';
import { SubscriptionStore } from "@/stores/SubscriptionStore";
import { MusicStore } from "@/stores/MusicStore";
import { DataStore } from "@/stores/DataStore";

@singleton()
export class RootStore {
    private static instance: RootStore | null = null;
    walletStore: WalletStore;
    playerStore: PlayerStore;
    subscriptionStore: SubscriptionStore;
    musicStore: MusicStore;
    dataStore: DataStore;

    constructor() {
        this.walletStore = new WalletStore();
        this.playerStore = new PlayerStore(this);
        this.subscriptionStore = new SubscriptionStore(this);
        this.musicStore = new MusicStore(this);
        this.dataStore = new DataStore(this);

        makeObservable(this, {
            walletStore: observable,
            playerStore: observable,
            subscriptionStore: observable,
            musicStore: observable,
            dataStore: observable
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
            this.walletStore.initialize(),
            this.subscriptionStore.initializeDatabase(),
            this.dataStore.initialize()
        ])
        // this.musicStore.initializeAudio();
    }
}
