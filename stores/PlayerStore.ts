import { singleton } from "tsyringe";
import { action, computed, makeObservable, observable } from "mobx";
import { RootStore } from "@/stores/RootStore";
import { PlayerName } from "@staratlas/player-profile";

@singleton()
export class PlayerStore {
    rootStore: RootStore;
    playerName: string | null = null;
    storedNames: PlayerName[];

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.playerName = null;
        this.storedNames = [];

        makeObservable(this, {
            playerName: observable,
            storedNames: observable,

            setPlayerName: action.bound,

            cachedPlayerNames: computed
        })
    }

    setPlayerName(name: string | null) {
        this.playerName = name;
    }

    get cachedPlayerNames(): PlayerName[] {
        return this.storedNames;
    }
}
