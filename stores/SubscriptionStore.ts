import 'reflect-metadata';
import { singleton } from "tsyringe";
import { action, makeObservable, observable } from "mobx";
import { RootStore } from "@/stores/RootStore";

@singleton()
export class SubscriptionStore {
    rootStore: RootStore;
    hasJoined: boolean;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.hasJoined = false;

        makeObservable(this, {
            hasJoined: observable,

            validateHasJoined: action.bound

        })
    }

    validateHasJoined() {
        // check the database
        this.hasJoined = true;
    }
}
