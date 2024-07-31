import { makeAutoObservable, runInAction } from 'mobx';
import {
    Adapter,
    MessageSignerWalletAdapter,
    SendTransactionOptions,
    SignerWalletAdapter,
    WalletError,
    WalletName,
    WalletReadyState
} from '@solana/wallet-adapter-base';
import { WalletNotConnectedError, WalletNotReadyError } from '@solana/wallet-adapter-base';
import { Connection, PublicKey, Transaction, TransactionSignature, VersionedTransaction } from '@solana/web3.js';
// import { WalletNotSelectedError } from './errors';

interface Wallet {
    adapter: Adapter;
    readyState: WalletReadyState;
}

type ErrorHandler = (error: WalletError) => void;

class WalletModel {
    // Props
    defaultAutoConnect: boolean = false;
    wallets: Wallet[] = [];

    // Wallet state
    adapter: Adapter | null = null;
    connected: boolean = false;
    connecting: boolean = false;
    disconnecting: boolean = false;
    localStorageKey: string = 'walletAdapter';
    onError: ErrorHandler = (error: WalletError) => console.error(error);
    publicKey: PublicKey | null = null;
    ready: WalletReadyState = WalletReadyState.Unsupported;
    wallet: Adapter | null = null;
    walletsByName: Record<WalletName, Adapter> = {};
    name: WalletName | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setConnecting(connecting: boolean) {
        this.connecting = connecting;
    }

    setDisconnecting(disconnecting: boolean) {
        this.disconnecting = disconnecting;
    }

    setReady(ready: WalletReadyState) {
        this.ready = ready;
    }

    updateConfig(config: Partial<WalletModel>) {
        Object.assign(this, config);
    }

    updateWallets(wallets: Wallet[]) {
        this.wallets = wallets;
    }

    updateStatus(status: { connected: boolean; publicKey: PublicKey | null }) {
        this.connected = status.connected;
        this.publicKey = status.publicKey;
    }

    resetWallet() {
        this.updateWallet(null);
    }

    updateWallet(name: WalletName | null) {
        if (typeof window !== 'undefined') {
            localStorage.setItem(this.localStorageKey, name || '');
        }
        const adapter = name ? this.walletsByName[name] : null;
        this.updateWalletState(adapter);
    }

    private updateWalletState(adapter: Adapter | null) {
        this.removeAdapterEventListeners();
        this.adapter = adapter;
        this.name = adapter?.name || null;
        this.wallet = adapter;
        this.ready = adapter?.readyState || WalletReadyState.Unsupported;
        this.publicKey = adapter?.publicKey || null;
        this.connected = adapter?.connected || false;

        if (adapter) {
            this.addAdapterEventListeners(adapter);
            if (this.shouldAutoConnect()) {
                this.autoConnect();
            }
        }
    }

    private addAdapterEventListeners(adapter: Adapter) {
        this.wallets.forEach(({ adapter }) => {
            adapter.on('readyStateChange', this.onReadyStateChange);
        });
        adapter.on('connect', this.onConnect);
        adapter.on('disconnect', this.onDisconnect);
        adapter.on('error', this.onError);
    }

    private removeAdapterEventListeners() {
        if (!this.adapter) return;

        this.wallets.forEach(({ adapter }) => {
            adapter.off('readyStateChange', this.onReadyStateChange);
        });
        this.adapter.off('connect', this.onConnect);
        this.adapter.off('disconnect', this.onDisconnect);
        this.adapter.off('error', this.onError);
    }

    private onConnect = () => {
        if (!this.adapter) return;
        runInAction(() => {
            this.publicKey = this.adapter!.publicKey;
            this.connected = this.adapter!.connected;
        });
    };

    private onDisconnect = () => {
        this.resetWallet();
    };

    private onReadyStateChange = (readyState: WalletReadyState) => {
        if (!this.adapter) return;
        runInAction(() => {
            this.ready = this.adapter!.readyState;
            const walletIndex = this.wallets.findIndex(({ adapter }) => adapter.name === this.adapter!.name);
            if (walletIndex !== -1) {
                this.wallets[walletIndex].readyState = readyState;
            }
        });
    };

    private shouldAutoConnect(): boolean {
        return !!(
            this.defaultAutoConnect &&
            this.adapter &&
            (this.ready === WalletReadyState.Installed || this.ready === WalletReadyState.Loadable) &&
            !this.connected &&
            !this.connecting
        );
    }

    private async autoConnect() {
        try {
            this.setConnecting(true);
            await this.adapter?.connect();
        } catch (error) {
            this.resetWallet();
        } finally {
            this.setConnecting(false);
        }
    }

    async connect(): Promise<void> {
        if (this.connected || this.connecting || this.disconnecting) return;
        // if (!this.adapter) throw this.newError(new WalletNotSelectedError());
        if (!(this.ready === WalletReadyState.Installed || this.ready === WalletReadyState.Loadable)) {
            this.resetWallet();
            if (typeof window !== 'undefined') {
                window.open(this.adapter?.url, '_blank');
            }
            throw this.newError(new WalletNotReadyError());
        }

        try {
            this.setConnecting(true);
            await this.adapter?.connect();
        } catch (error: unknown) {
            this.resetWallet();
            throw error;
        } finally {
            this.setConnecting(false);
        }
    }

    async disconnect(): Promise<void> {
        if (this.disconnecting) return;
        if (!this.adapter) return this.resetWallet();

        try {
            this.setDisconnecting(true);
            await this.adapter.disconnect();
        } finally {
            this.resetWallet();
            this.setDisconnecting(false);
        }
    }

    async select(walletName: WalletName): Promise<void> {
        if (this.name === walletName) return;
        if (this.adapter) await this.disconnect();
        this.updateWallet(walletName);
    }

    async sendTransaction(
        transaction: Transaction | VersionedTransaction,
        connection: Connection,
        options?: SendTransactionOptions
    ): Promise<TransactionSignature> {
        if (!this.connected) throw this.newError(new WalletNotConnectedError());
        // if (!this.adapter) throw this.newError(new WalletNotSelectedError());
        return this.adapter?.sendTransaction( transaction, connection, options )!;
    }

    // async signTransaction<T extends Transaction | VersionedTransaction>(transaction: T): Promise<T> {
    //     if (!this.connected) throw this.newError(new WalletNotConnectedError());
    //     // if (!this.adapter || !('signTransaction' in this.adapter)) {
    //     //     throw this.newError(new WalletNotSelectedError());
    //     // }
    //     return await this.adapter?.signTransaction(transaction);
    // }

    // async signAllTransactions<T extends Transaction | VersionedTransaction>(transactions: T[]): Promise<T[]> {
    //     if (!this.connected) throw this.newError(new WalletNotConnectedError());
    //     // if (!this.adapter || !('signAllTransactions' in this.adapter)) {
    //     //     throw this.newError(new WalletNotSelectedError());
    //     // }
    //     return await this.adapter.signAllTransactions(transactions);
    // }

    // async signMessage(message: Uint8Array): Promise<Uint8Array> {
    //     if (!this.connected) throw this.newError(new WalletNotConnectedError());
    //     // if (!this.adapter || !('signMessage' in this.adapter)) {
    //     //     throw this.newError(new WalletNotSelectedError());
    //     // }
    //     return await this.adapter?.(message);
    // }

    private newError(error: WalletError): WalletError {
        this.onError(error);
        return error;
    }
}

export const walletStore = new WalletModel();

export async function initializeWallet(config: {
    wallets: Adapter[];
    defaultAutoConnect?: boolean;
    localStorageKey?: string;
    onError?: ErrorHandler;
}): Promise<void> {
    const { wallets, defaultAutoConnect = false, localStorageKey = 'walletAdapter', onError = (error: WalletError) => console.error(error) } = config;

    const walletsByName = wallets.reduce<Record<WalletName, Adapter>>((acc, wallet) => {
        acc[wallet.name] = wallet;
        return acc;
    }, {});

    const mappedWallets = wallets.map((adapter) => ({
        adapter,
        readyState: adapter.readyState,
    }));

    walletStore.updateConfig({
        wallets: mappedWallets,
        walletsByName,
        defaultAutoConnect,
        localStorageKey,
        onError,
    });

    if (typeof window !== 'undefined') {
        const walletName = localStorage.getItem(localStorageKey) as WalletName | null;
        if (walletName) {
            walletStore.updateWallet(walletName);
        }
    }
}

// if (typeof window !== 'undefined') {
//     window.addEventListener('beforeunload', () => walletStore.removeAdapterEventListeners());
// }
