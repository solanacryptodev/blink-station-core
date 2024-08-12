import 'reflect-metadata';
import { action, reaction, computed, makeObservable, observable } from "mobx";
import { singleton } from "tsyringe";
import { Adapter, WalletAdapter } from "@solana/wallet-adapter-base";
import { MAIN_WALLETS, walletOrder } from "@/stores/WalletStore";
import { RootStore } from "@/stores/RootStore";

/* Presents relevant data about the Player to various Views
*  - Wallet data
*  - Player data
*  */
@singleton()
export class PlayerPresenter {
    private static instance: PlayerPresenter | null = null;
    private rootStore: RootStore;
    walletModal: boolean;
    isLoading: boolean;
    previousAdapter: WalletAdapter | null;

    constructor() {
        this.rootStore = RootStore.getInstance();
        this.walletModal = false;
        this.previousAdapter = null;
        this.isLoading = false;

        makeObservable(this, {
            previousAdapter: observable,
            walletModal: observable,
            isLoading: observable,

            handleConnect: action.bound,
            handleDisconnect: action.bound,
            setConnected: action.bound,
            activateWalletModal: action.bound,
            setIsLoading: action.bound,

            isConnected: computed,
            supportedWallets: computed,
            playerName: computed,
            wallet: computed
        })

        // this.setupReactions()
    }

    // setupReactions() {
    //     // This reaction will run once when the wallet is connected
    //     reaction(
    //         () => this.isConnected,
    //         async (connected) => {
    //             if (connected && this.playerName === null) {
    //                 await this.rootStore.playerStore.loadPlayerName();
    //             } else {
    //                 console.log('You are not connected to a wallet');
    //             }
    //         }
    //     );
    // }

    static getInstance(): PlayerPresenter {
        if (!PlayerPresenter.instance) {
            PlayerPresenter.instance = new PlayerPresenter();
        }
        return PlayerPresenter.instance;
    }

    handleConnect(walletAdapter: WalletAdapter) {
        this.previousAdapter = walletAdapter;
        // console.log('Connecting to wallet...', this.previousAdapter);
        this.rootStore.walletStore.connect(walletAdapter?.name);
        this.setConnected(true);
    }

    handleDisconnect() {
        this.rootStore.walletStore.disconnect();
        this.setConnected(false);
        localStorage.removeItem('walletAdapter');
        this.rootStore.playerStore.setPlayerName(null);
        // console.log('connection status...', this.connected);
    }

    setConnected(connected: boolean): void {
        this.rootStore.walletStore.setConnected(connected)
    }

    setIsLoading(loading: boolean): void {
        this.isLoading = loading;
    }

    get isConnected(): boolean {
        // console.log('connection status...', this.connected);
        return this.rootStore.walletStore.connected;
    }

    get playerName(): string {
        // console.log('player name...', this.playerName);
        return this.rootStore.playerStore.playerName as string;
    }

    get wallet(): Adapter {
        return this.rootStore.walletStore.wallet!;
    }

    updatePlayerName(name: string) {
        this.rootStore.playerStore.setPlayerName(name);
    }

    activateWalletModal(active: boolean) {
        this.walletModal = active;
    }

    get supportedWallets(): WalletAdapter[] {
        return Object.values( this.rootStore.walletStore.adaptors )
            .filter( ( wallet ) => MAIN_WALLETS?.includes( wallet.url ) )
            .sort( ( a, b ) => walletOrder.indexOf( a.name ) - walletOrder.indexOf( b.name ) );
    }
}
