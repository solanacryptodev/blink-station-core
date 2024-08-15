import 'reflect-metadata';
import { action, reaction, computed, makeObservable, observable, autorun } from "mobx";
import { singleton } from "tsyringe";
import { Adapter, WalletAdapter } from "@solana/wallet-adapter-base";
import { MAIN_WALLETS, walletOrder } from "@/stores/WalletStore";
import { RootStore } from "@/stores/RootStore";
import { loadPlayerName } from "@/app/actions";
import { toast } from 'sonner'

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
            fetchPlayerName: action.bound,

            isConnected: computed,
            supportedWallets: computed,
            playerName: computed,
            wallet: computed,
            tokensLeft: computed
        })
    }


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
        this.fetchPlayerName();
    }

    handleDisconnect() {
        this.rootStore.walletStore.disconnect();
        this.setConnected(false);
        localStorage.removeItem('walletAdapter');
        this.rootStore.playerStore.setPlayerName(null);
        this.updatePlayerName(null);
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

    get tokensLeft(): number {
        const num = this.rootStore.subscriptionStore.playerAcct[0]?.tokenCount;
        return num ? num : 0;
    }

    get account(): boolean {
        return this.rootStore.subscriptionStore.hasAccount;
    }

    updatePlayerName(name: string | null): void {
        this.rootStore.playerStore.setPlayerName(name);
    }

    activateWalletModal(active: boolean): void {
        this.walletModal = active;
    }

    get supportedWallets(): WalletAdapter[] {
        return Object.values( this.rootStore.walletStore.adaptors )
            .filter( ( wallet ) => MAIN_WALLETS?.includes( wallet.url ) )
            .sort( ( a, b ) => walletOrder.indexOf( a.name ) - walletOrder.indexOf( b.name ) );
    }

    async fetchPlayerName(): Promise<void> {
        if (this.isConnected && this.playerName === null && this.wallet.publicKey) {
            this.setIsLoading(true);
            try {
                const nameFound = await loadPlayerName(this.wallet.publicKey.toString());
                if (nameFound) {
                    this.updatePlayerName(nameFound);
                    this.rootStore.subscriptionStore.setPlayerProfileStatus(true);
                } else {
                    toast.error('You must create a player profile on the SAGE website before continuing.');
                }
            } catch (error) {
                console.error('Error fetching player name:', error);
                // Optionally set an error state here
            } finally {
                this.setIsLoading(false);
            }
        }
    }
}
