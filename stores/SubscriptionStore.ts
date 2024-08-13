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
import { MembershipSubscription } from '@/lib/types';

@singleton()
export class SubscriptionStore {
    subscription: MembershipSubscription | null = null;
    rootStore: RootStore;
    hasPlayerProfile: boolean;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.hasPlayerProfile = false;

        makeObservable(this, {
            hasPlayerProfile: observable,

            setSubscriptions: action.bound,
            addSubscription: action.bound,
            // updateSubscription: action.bound,
            // deleteSubscription: action.bound,
            setPlayerProfileStatus: action.bound,

            getPlayerProfileStatus: computed,
            getActiveSubscriptions: computed
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

    setPlayerProfileStatus(status: boolean) {
        this.hasPlayerProfile = status;
    }

    async setSubscriptions(subscriptions: Partial<MembershipSubscription>) {
        const sub = await readSubscription(subscriptions.publicKey?.toString()!);
        console.log('Subscription:', sub);
        return sub;
    }

    async addSubscription(subscription: MembershipSubscription) {
        const subscribeToBS10 = await createSubscription(subscription);
        console.log('Subscription created:', subscribeToBS10);
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
