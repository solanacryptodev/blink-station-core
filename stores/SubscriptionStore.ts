import 'reflect-metadata';
import { singleton } from "tsyringe";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { RootStore } from "@/stores/RootStore";
import {
    readSubscription,
    connectToMongo,
    createCollection,
    createSubscription,
    updateSubscription,
    travelerSubscription
} from '@/app/db-actions';
import { MembershipSubscription, MembershipSubscriptionWithoutId } from '@/lib/types';

@singleton()
export class SubscriptionStore {
    subscription: MembershipSubscription | null = null;
    rootStore: RootStore;
    hasPlayerProfile: boolean;
    hasAccount: boolean;
    hasFreeAccount: boolean;
    playerAcct: MembershipSubscription[];

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.hasPlayerProfile = false;
        this.hasFreeAccount = false;
        this.hasAccount = false;
        this.playerAcct = [];

        makeObservable(this, {
            hasPlayerProfile: observable,
            hasAccount: observable,
            hasFreeAccount: observable,
            playerAcct: observable,

            setSubscriptions: action.bound,
            addSubscription: action.bound,
            updateProfile: action.bound,
            // deleteSubscription: action.bound,
            setPlayerProfileStatus: action.bound,
            resetPlayerAccount: action.bound,
            setHasAccount: action.bound,
            setHasFreeAccount: action.bound,

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

    get playerAccount(): MembershipSubscription[] {
        return this.playerAcct
    }

    setPlayerProfileStatus(status: boolean): void {
        this.hasPlayerProfile = status;
    }

    setHasAccount(status: boolean): void {
        this.hasAccount = status;
    }

    setHasFreeAccount(status: boolean): void {
        this.hasFreeAccount = status;
    }

    resetPlayerAccount(): void {
        this.playerAcct = [];
    }

    async setSubscriptions(subscriptions: Partial<MembershipSubscription>) {
        const sub = await readSubscription(subscriptions.publicKey?.toString()!);
        const freeSub = await travelerSubscription(subscriptions.publicKey?.toString()!);
        if (sub) {
            this.setHasAccount(true);
            const subWithoutId: MembershipSubscription = {
                playerName: sub.playerName,
                publicKey: sub.publicKey,
                subscriptionRank: sub.subscriptionStatus,
                tokenCount: sub.tokenCount,
                createdAt: sub.createdAt,
                membershipStartDate: sub.membershipStartDate,
                membershipEndDate: sub.membershipEndDate,
                chatLogs: sub.chatLogs
            };
            runInAction(() => {
                this.playerAcct.push(subWithoutId);
            });
        }

        if (freeSub) {
            this.setHasFreeAccount(true);
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
        return subscribeToBS10;
    }

    async updateProfile(publicKey: string, update: Partial<MembershipSubscription>): Promise<number> {
        const updatedCount = await updateSubscription(publicKey, update);
        if (updatedCount > 0) {
            // Update the local state
            const index = this.playerAcct.findIndex(sub => sub.publicKey === publicKey);
            if (index !== -1) {
                runInAction(() => {
                    this.playerAcct[index] = { ...this.playerAcct[index], ...update };
                })
            }
        }
        return updatedCount;
    }

    // deleteSubscription(id: string) {
    //     this.subscription = this.subscription?.filter(sub => sub.id?.toString() !== id)!;
    // }
}
