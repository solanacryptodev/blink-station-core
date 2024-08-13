import 'reflect-metadata';
import { makeObservable, observable } from "mobx";
import { singleton } from "tsyringe";
import { PlayerStore } from "@/stores/PlayerStore";
import { WalletStore } from '@/stores/WalletStore';
import { SubscriptionStore } from "@/stores/SubscriptionStore";
import { MusicStore } from "@/stores/MusicStore";

@singleton()
export class RootStore {
    private static instance: RootStore | null = null;
    walletStore: WalletStore;
    playerStore: PlayerStore;
    subscriptionStore: SubscriptionStore;
    musicStore: MusicStore;

    constructor() {
        this.walletStore = new WalletStore();
        this.playerStore = new PlayerStore(this);
        this.subscriptionStore = new SubscriptionStore(this);
        this.musicStore = new MusicStore(this);

        makeObservable(this, {
            walletStore: observable,
            playerStore: observable,
            subscriptionStore: observable,
            musicStore: observable,
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
        ])
        this.musicStore.initializeAudio();

        // if they have a player profile, then load it. If not, then direct them to Sage website

        // if they have a player profile, check if they have an account. If not, they create one

        // If they have an account, load the membership data from mongo database
    }
}
