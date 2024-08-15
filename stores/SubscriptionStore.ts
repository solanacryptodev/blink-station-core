import 'reflect-metadata';
import { singleton } from "tsyringe";
import { action, computed, makeObservable, observable } from "mobx";
import { RootStore } from "@/stores/RootStore";
import {
    readSubscription,
    connectToMongo,
    createCollection,
    createSubscription
} from '@/app/db-actions';
import { MembershipSubscription, MembershipSubscriptionWithoutId } from '@/lib/types';

@singleton()
export class SubscriptionStore {
    subscription: MembershipSubscription | null = null;
    rootStore: RootStore;
    hasPlayerProfile: boolean;
    hasAccount: boolean;
    playerAcct: MembershipSubscription[];

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.hasPlayerProfile = false;
        this.hasAccount = false;
        this.playerAcct = [];

        makeObservable(this, {
            hasPlayerProfile: observable,
            hasAccount: observable,
            playerAcct: observable,

            setSubscriptions: action.bound,
            addSubscription: action.bound,
            // updateSubscription: action.bound,
            // deleteSubscription: action.bound,
            setPlayerProfileStatus: action.bound,
            setHasAccount: action.bound,

            getPlayerProfileStatus: computed,
            getActiveSubscriptions: computed,
            playerAccount: computed
        })
    }

    async initializeDatabase() {
        await connectToMongo();
    }

    get getPlayerProfileStatus(): boolean {
        return this.hasPlayerProfile;
    }

    get getActiveSubscriptions(): MembershipSubscription {
        return this.subscription!;
    }

    get playerAccount() {
        return this.playerAcct
    }

    setPlayerProfileStatus(status: boolean) {
        this.hasPlayerProfile = status;
    }

    setHasAccount(status: boolean) {
        this.hasAccount = status;
    }

    async setSubscriptions(subscriptions: Partial<MembershipSubscription>) {
        const sub = await readSubscription(subscriptions.publicKey?.toString()!);
        console.log('Subscription:', sub);
        if (sub) {
            this.setHasAccount(true);
            // Convert MembershipSubscriptionDocument to MembershipSubscriptionWithoutId
            const subWithoutId: MembershipSubscription = {
                playerName: sub.playerName,
                publicKey: sub.publicKey,
                subscriptionStatus: sub.subscriptionStatus,
                tokenCount: sub.tokenCount,
                createdAt: sub.createdAt,
                updatedAt: sub.updatedAt,
                membershipStartDate: sub.membershipStartDate,
                membershipEndDate: sub.membershipEndDate
            };
            this.playerAcct.push(subWithoutId);
            console.log('Player account:', this.playerAcct);
        }
        return sub;
    }

    async addSubscription(subscription: MembershipSubscription): Promise<string> {
        const subscribeToBS10 = await createSubscription(subscription);
        if (subscribeToBS10) {
            await this.setSubscriptions({
                publicKey: this.rootStore.walletStore.wallet?.publicKey?.toString()!,
            })
        }
        // console.log('Subscription created:', subscribeToBS10);
        return subscribeToBS10;
    }

    // updateSubscription(id: string, updatedSubscription: Partial<MembershipSubscription>) {
    //     const index = this.subscription?.findIndex(sub => sub.id?.toString() === id);
    //     if (index !== -1) {
    //         this.subscription![index!] = { ...this.subscription![index!], ...updatedSubscription };
    //     }
    // }

    // deleteSubscription(id: string) {
    //     this.subscription = this.subscription?.filter(sub => sub.id?.toString() !== id)!;
    // }
}
