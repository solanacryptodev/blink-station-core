import { action, computed, makeObservable, observable } from "mobx";
import { RootStore } from "@/stores/RootStore";

export class SettingsPresenter {
    private static instance: SettingsPresenter;
    private rootStore: RootStore;
    settingsModal: boolean;

    constructor() {
        this.rootStore = RootStore.getInstance();
        this.settingsModal = false;

        makeObservable(this, {
            settingsModal: observable,

            activateSettingsModal: action.bound,

            account: computed,
            modal: computed
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

    get modal(): boolean {
        return this.settingsModal;
    }

    activateSettingsModal( display: boolean ): void {
        this.settingsModal = display;
    }
}
