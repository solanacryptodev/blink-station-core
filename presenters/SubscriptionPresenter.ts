import 'reflect-metadata';
import { singleton } from 'tsyringe';
import { RootStore } from '@/stores/RootStore';
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { MembershipSubscription, TabProps } from "@/lib/types";

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

    activateSubscriptionModal(display: boolean): void {
        this.subscriptionModal = display;
    }

    playerProfileStatus(): boolean {
        return this.rootStore.subscriptionStore.getPlayerProfileStatus;
    }

    subscriptionTabs(): TabProps {
        return {
            tabOne: 'Free',
            tabTwo: 'Specialist',
            tabThree: 'Captain',
            tabFour: 'Commander'
        }
    }

    async playerSubscriptionStatus(): Promise<void> {
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
