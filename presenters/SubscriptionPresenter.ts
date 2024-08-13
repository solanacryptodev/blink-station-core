import 'reflect-metadata';
import { singleton } from 'tsyringe';
import { RootStore } from '@/stores/RootStore';
import { action, makeObservable, observable } from "mobx";

@singleton()
export class SubscriptionPresenter {
    private rootStore: RootStore;
    private static instance: SubscriptionPresenter | null = null;
    displaySubscriptionView: boolean;
    displayValidationView: boolean;
    subscriptionModal: boolean;

    constructor() {
        this.rootStore = RootStore.getInstance();
        this.displaySubscriptionView = false;
        this.displayValidationView = false;
        this.subscriptionModal = false;

        makeObservable(this, {
            displaySubscriptionView: observable,
            displayValidationView: observable,
            subscriptionModal: observable,

            activateSubscriptionModal: action.bound
        })
    }

    static getInstance(): SubscriptionPresenter {
        if (!SubscriptionPresenter.instance) {
            SubscriptionPresenter.instance = new SubscriptionPresenter();
        }
        return SubscriptionPresenter.instance;
    }

    activateSubscriptionModal(display: boolean) {
        this.subscriptionModal = display;
    }

    playerProfileStatus() {
        return this.rootStore.subscriptionStore.getPlayerProfileStatus;
    }

}
