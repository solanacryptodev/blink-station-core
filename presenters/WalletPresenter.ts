import 'reflect-metadata';
import { action, reaction, computed, makeObservable, observable, toJS } from "mobx";
import { singleton } from "tsyringe";
import { WalletAdapter } from "@solana/wallet-adapter-base";
import { MAIN_WALLETS, walletOrder, WalletStore, walletStore } from "@/stores/WalletStore";

@singleton()
export class WalletPresenter {
    private static instance: WalletPresenter | null = null;
    walletStore: WalletStore;
    connected: boolean;
    walletModal: boolean;
    playerName: string | null;
    previousAdapter: WalletAdapter | null;

    constructor() {
        this.connected = false;
        this.walletModal = false;
        this.previousAdapter = null;
        this.playerName = null;
        this.walletStore = walletStore;

        makeObservable(this, {
            connected: observable,
            previousAdapter: observable,
            walletModal: observable,
            playerName: observable,

            handleConnect: action.bound,
            handleDisconnect: action.bound,
            setConnected: action.bound,
            activateWalletModal: action.bound,
            playerNames: action.bound,

            isConnected: computed,
            supportedWallets: computed,
            player: computed
        })

        this.setupReactions()
    }

    setupReactions() {
        // This reaction will run once when the wallet is connected
        reaction(
            () => this.isConnected,
            async (connected) => {
                if (connected && this.playerName === null) {
                    await this.playerNames();
                } else {
                    console.log('You are not connected to a wallet');
                }
            }
        );
    }

    static getInstance(): WalletPresenter {
        if (!WalletPresenter.instance) {
            WalletPresenter.instance = new WalletPresenter();
        }
        return WalletPresenter.instance;
    }

    handleConnect(walletAdapter: WalletAdapter) {
        this.previousAdapter = walletAdapter;
        // console.log('Connecting to wallet...', this.previousAdapter);
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

    get player(): string {
        // console.log('player name...', this.playerName);
        return this.playerName as string;
    }

    activateWalletModal(active: boolean) {
        this.walletModal = active;
    }

    get supportedWallets(): WalletAdapter[] {
        return Object.values( this.walletStore.adaptors )
            .filter( ( wallet ) => MAIN_WALLETS?.includes( wallet.url ) )
            .sort( ( a, b ) => walletOrder.indexOf( a.name ) - walletOrder.indexOf( b.name ) );
    }

    async playerNames(): Promise<void> {
        const response = await fetch( '/api/programs/playerName', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(walletStore.wallet?.publicKey?.toString()),
        });

        if ( response.status !== 200 ) {
            console.log('error getting names')
        }
        const fetchedData = await response.json();
        this.playerName = fetchedData[0];
        // console.log('API response: ', toJS(this.playerName));
    }
}
