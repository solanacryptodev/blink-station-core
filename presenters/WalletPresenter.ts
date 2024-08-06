import 'reflect-metadata';
import { action, computed, makeObservable, observable } from "mobx";
import { singleton } from "tsyringe";
import { WalletAdapter } from "@solana/wallet-adapter-base";
import { MAIN_WALLETS, walletOrder, WalletStore, walletStore } from "@/stores/WalletStore";

@singleton()
export class WalletPresenter {
    private static instance: WalletPresenter | null = null;
    walletStore: WalletStore;
    connected: boolean;
    walletModal: boolean;
    previousAdapter: WalletAdapter | null;

    constructor() {
        this.connected = false;
        this.walletModal = false;
        this.previousAdapter = null;
        this.walletStore = walletStore;

        makeObservable(this, {
            connected: observable,
            previousAdapter: observable,
            walletModal: observable,

            handleConnect: action.bound,
            handleDisconnect: action.bound,
            setConnected: action.bound,
            activateWalletModal: action.bound,

            isConnected: computed,
            supportedWallets: computed,
        })
    }

    static getInstance(): WalletPresenter {
        if (!WalletPresenter.instance) {
            WalletPresenter.instance = new WalletPresenter();
        }
        return WalletPresenter.instance;
    }

    handleConnect(walletAdapter: WalletAdapter) {
        this.previousAdapter = walletAdapter;
        console.log('Connecting to wallet...', this.previousAdapter);
        this.walletStore.connect(walletAdapter?.name);
        this.setConnected(true);
    }

    handleDisconnect() {
        this.walletStore.disconnect();
        this.setConnected(false);
        localStorage.removeItem('walletAdapter');
        // console.log('connection status...', this.connected);
    }

    setConnected(connected: boolean): boolean {
        this.walletStore.setConnected(connected);
        return this.connected = connected;
    }

    get isConnected(): boolean {
        // console.log('connection status...', this.connected);
        return this.connected;
    }

    activateWalletModal(active: boolean) {
        this.walletModal = active;
    }

    get supportedWallets(): WalletAdapter[] {
        return Object.values( this.walletStore.adaptors )
            .filter( ( wallet ) => MAIN_WALLETS?.includes( wallet.url ) )
            .sort( ( a, b ) => walletOrder.indexOf( a.name ) - walletOrder.indexOf( b.name ) );
    }
}
