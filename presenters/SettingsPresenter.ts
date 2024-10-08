import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { RootStore } from "@/stores/RootStore";
import { toast } from "sonner";

export class SettingsPresenter {
    private static instance: SettingsPresenter;
    private rootStore: RootStore;
    settingsModal: boolean;
    currentKey: string;

    constructor() {
        this.rootStore = RootStore.getInstance();
        this.settingsModal = false;
        this.currentKey = '';

        makeObservable(this, {
            settingsModal: observable,
            currentKey: observable,

            activateSettingsModal: action.bound,
            setApiKey: action.bound,
            saveApiKey: action.bound,

            account: computed,
            modal: computed,
            wallet: computed,
            isApiKeySet: computed
        })
    }

    public static getInstance(): SettingsPresenter {
        if (!SettingsPresenter.instance) {
            SettingsPresenter.instance = new SettingsPresenter()
        }
        return SettingsPresenter.instance
    }

    get account(): boolean {
        return this.rootStore.subscriptionStore.hasAccount;
    }

    get wallet(): string {
        return this.rootStore.walletStore.wallet?.publicKey?.toString()!;
    }

    get modal(): boolean {
        return this.settingsModal;
    }

    get isApiKeySet(): string {
        return this.rootStore.subscriptionStore.playerAcct[0].key!
    }

    activateSettingsModal( display: boolean ): void {
        this.settingsModal = display;
    }

    setApiKey( apiKey: string ): void {
        // console.log('Setting API key:', apiKey);
        this.currentKey = apiKey;
    }

    async saveApiKey(): Promise<void> {
        const dataStored = await this.rootStore.subscriptionStore.setApiKey(this.wallet, this.currentKey)
        if (dataStored !== 0) {
            toast.success('Your key has been saved.');
            runInAction(() => {
                this.currentKey = ''
            })
        }
    }
}
