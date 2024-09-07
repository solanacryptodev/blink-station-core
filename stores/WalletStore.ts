import 'reflect-metadata';
import { action, makeObservable, observable } from 'mobx';
import {
    Adapter,
    SendTransactionOptions, WalletAdapter,
    WalletError,
    WalletName,
    WalletNotConnectedError,
    WalletNotReadyError,
    WalletReadyState
} from '@solana/wallet-adapter-base';
import { PublicKey } from '@solana/web3.js';
import {
    AsyncSigner,
    buildAndSignTransaction,
    ConnectionOrRbh,
    InstructionReturn,
    sendTransaction,
    TransactionSender
} from '@staratlas/data-source'
import {
    PhantomWalletAdapter,
    TorusWalletAdapter,
    SolflareWalletAdapter,
    CoinbaseWalletAdapter,
    LedgerWalletAdapter,
    MathWalletAdapter,
    getDerivationPath,
} from '@solana/wallet-adapter-wallets';
import { singleton } from "tsyringe";
import { RootStore } from "@/stores/RootStore";

// const rootStore = RootStore.getInstance();

// import { WalletNotSelectedError } from './errors';

interface Wallet {
    adapter: Adapter;
    readyState: WalletReadyState;
}

type ErrorHandler = (error: WalletError) => void;

export enum WalletOrder {
    PHANTOM = 'Phantom',
    SOLFLARE = 'Solflare',
    LEDGER = 'Ledger',
    BACKPACK = 'Backpack',
}

export const walletOrder: string[] = Object.values(WalletOrder).map((wallet: string) => wallet);

export const MAIN_WALLETS = [
    new PhantomWalletAdapter().url,
    new SolflareWalletAdapter().url,
    new LedgerWalletAdapter().url,
];

@singleton()
export class WalletStore {
    // rootStore: RootStore;
    // Props
    defaultAutoConnect: boolean = false;
    wallets: Wallet[] = [];

    // Wallet state
    connected: boolean;
    connecting: boolean;
    disconnecting: boolean;
    localStorageKey: string;
    onError: ErrorHandler = (error: WalletError) => console.error(error);
    publicKey: PublicKey | null;
    ready: boolean;
    wallet: Adapter | null;
    walletsByName: Record<WalletName, Adapter>;
    name: WalletName | null;
    adaptors: WalletAdapter[] = [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
        new LedgerWalletAdapter({
            derivationPath: getDerivationPath(),
        }),
        new CoinbaseWalletAdapter(),
        new TorusWalletAdapter(),
        new MathWalletAdapter(),
    ];

    constructor() {
        // this.rootStore = RootStore.getInstance();
        this.connected = false;
        this.connecting = false;
        this.disconnecting = false;
        this.localStorageKey = 'walletAdapter';
        this.publicKey = null;
        this.ready = false;
        this.walletsByName = {};
        this.name = null;
        this.wallet = null;

        makeObservable(this, {
            connected: observable,
            connecting: observable,
            disconnecting: observable,
            localStorageKey: observable,
            publicKey: observable,
            ready: observable,
            name: observable,
            wallet: observable,
            // rootStore: observable,

            setConnecting: action.bound,
            setConnected: action.bound,
            setPublicKey: action.bound,
            setDisconnecting: action.bound,
            setReady: action.bound,
            setWallet: action.bound,
            updateWalletState: action.bound,
        });
    }

    componentDidMount() {
        this.onReadyStateChange()
    }

    setConnecting(connecting: boolean) {
        this.connecting = connecting;
        // console.log('connecting...', this.connecting);
    }

    setConnected(connected: boolean) {
        this.connected = connected;
    }

    setPublicKey(publicKey: PublicKey | null) {
        this.publicKey = publicKey;
    }

    setDisconnecting(disconnecting: boolean) {
        this.disconnecting = disconnecting;
    }

    setReady(ready: boolean) {
        this.ready = ready;
    }

    setWallet(wallet: Adapter | null) {
        localStorage.setItem('walletAdapter', wallet?.name!);
        this.wallet = wallet;
    }

    updateConfig(config: Partial<WalletStore>) {
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
        this.setConnected(false);
        this.setPublicKey(null);
        this.setReady(false);
        this.updateWallet(null);
    }

    updateWallet(name: WalletName | null) {
        if (typeof window !== 'undefined') {
            localStorage.setItem(this.localStorageKey, name || '');
        }
        const adapter = name ? this.walletsByName[name] : null;
        this.updateWalletState(adapter);
    }

    updateWalletState(adapter: Adapter | null) {
        this.removeAdapterEventListeners();
        this.wallet = adapter;
        this.name = adapter?.name || null;
        this.ready = adapter?.readyState === (WalletReadyState.Installed || WalletReadyState.Loadable);
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
        if (!this.wallet) return;

        this.wallets.forEach(({ adapter }) => {
            adapter.off('readyStateChange', this.onReadyStateChange);
        });
        this.wallet.off('connect', this.onConnect);
        this.wallet.off('disconnect', this.onDisconnect);
        this.wallet.off('error', this.onError);
    }

    private onConnect = () => {
        if (!this.wallet) return;

        this.setConnected(this.wallet?.connected!);
        this.setPublicKey(this.wallet?.publicKey!);
        this.setReady(this.wallet?.readyState === (WalletReadyState.Installed || WalletReadyState.Loadable));
    };

    private onDisconnect = () => {
        if ( !this.wallet ) return;

        this.resetWallet();
    };

    private onReadyStateChange = () => {
        if (!this.wallet) return;
        this.setReady(this.wallet?.readyState === (WalletReadyState.Installed || WalletReadyState.Loadable));
        // runInAction(() => {
        //     const walletIndex = this.wallets.findIndex(({ adapter }) => adapter.name === this.adapter!.name);
        //     if (walletIndex !== -1) {
        //         this.wallets[walletIndex].readyState = readyState;
        //     }
        // });
    };

    private shouldAutoConnect(): boolean {
        return !!(
            this.defaultAutoConnect &&
            this.wallet &&
            (this.ready || this.wallet.readyState === WalletReadyState.Installed) &&
            !this.connected &&
            !this.connecting
        );
    }

    private async autoConnect() {
        try {
            this.setConnecting(true);
            await this.wallet?.connect();
        } catch (error) {
            this.resetWallet();
        } finally {
            this.setConnecting(false);
        }
    }

    async initialize(): Promise<void> {
        await initializeWallet({
            wallets: this.adaptors,
            defaultAutoConnect: true,
            localStorageKey: this.localStorageKey,
            // onError: this.onError,
        });
    }

    async connect(walletName: WalletName): Promise<void> {
        if (this.connected || this.connecting || this.disconnecting) return;
        // if (!this.adapter) throw this.newError(new WalletNotSelectedError());
        const adaptor = this.adaptors.find((_adaptor) => _adaptor.name === walletName);
        this.setWallet(adaptor!);
        this.setConnecting(true);
        this.addAdapterEventListeners(adaptor!);
        try {
            await adaptor?.connect();
        } catch (error) {
            this.resetWallet();
            throw error;
        } finally {
            this.setConnecting(false);
        }
    }

    async disconnect(): Promise<void> {
        if (this.disconnecting) return;
        if (!this.wallet) return this.resetWallet();
        console.log('Disconnecting from wallet...', this.wallet);
        try {
            this.setDisconnecting(true);
            await this.wallet.disconnect();
            console.log('Disconnected from wallet...', this.wallet, this.connected);
        } finally {
            this.resetWallet();
            this.setDisconnecting(false);
        }
    }

    async select(walletName: WalletName): Promise<void> {
        if (this.name === walletName) return;
        if (this.wallet) await this.disconnect();
        this.updateWallet(walletName);
    }

    async sendTransaction(
        instruction: InstructionReturn,
        feePayer: AsyncSigner,
        connection: ConnectionOrRbh,
        trxSender: TransactionSender,
        options?: SendTransactionOptions
    ): Promise<any> {
        if (!this.connected) throw this.newError(new WalletNotConnectedError());

        const transaction = await buildAndSignTransaction(instruction, feePayer, connection);
        return await sendTransaction( transaction, trxSender );
    }

    private newError(error: WalletError): WalletError {
        this.onError(error);
        return error;
    }
}

export const walletStore = new WalletStore();

export async function initializeWallet(config: {
    wallets: Adapter[];
    defaultAutoConnect?: boolean;
    localStorageKey?: string;
    onError?: ErrorHandler;
}): Promise<void> {
    const { wallets, defaultAutoConnect = false, localStorageKey = 'walletAdapter', onError = (error: WalletError) => console.error(error) } = config;
    // console.log('Initializing wallet...', wallets);
    const walletsByName = wallets.reduce<Record<WalletName, Adapter>>((acc, wallet) => {
        acc[wallet.name] = wallet;
        return acc;
    }, {});


    const storedWallet = localStorage.getItem(localStorageKey) as WalletName | null;
    if (storedWallet) {
        const findWallet = walletsByName[storedWallet];
        await findWallet.connect();
        walletStore.setConnected(true);
    }

    const mappedWallets = wallets.map((adapter) => ({
        adapter,
        readyState: adapter.readyState,
    }));

    walletStore.updateConfig({
        wallets: mappedWallets,
        walletsByName,
        defaultAutoConnect,
        localStorageKey,
        // onError,
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
