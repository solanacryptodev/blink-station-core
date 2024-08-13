import 'reflect-metadata';
import { singleton } from 'tsyringe';
import { RootStore } from '@/stores/RootStore';
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { MembershipSubscription } from "@/lib/types";

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

            activateSubscriptionModal: action.bound,

            player: computed
        })
    }

    static getInstance(): SubscriptionPresenter {
        if (!SubscriptionPresenter.instance) {
            SubscriptionPresenter.instance = new SubscriptionPresenter();
        }
        return SubscriptionPresenter.instance;
    }

    get player(): string {
        return this.rootStore.playerStore.playerName!;
    }

    activateSubscriptionModal(display: boolean) {
        this.subscriptionModal = display;
    }

    playerProfileStatus() {
        return this.rootStore.subscriptionStore.getPlayerProfileStatus;
    }

    async playerSubscriptionStatus() {
        const setupSub: MembershipSubscription = {
            id: undefined,
            playerName: '',
            publicKey: this.rootStore.walletStore.wallet?.publicKey?.toString()!,
            subscriptionStatus: 'wanderer'
        }
        const data = await this.rootStore.subscriptionStore.setSubscriptions(setupSub);

        if ( !data ) {
            runInAction(() => {
                this.displaySubscriptionView = true;
            })
        } else {
            runInAction(() => {
                this.displayValidationView = true;
            })
        }
    }

}
