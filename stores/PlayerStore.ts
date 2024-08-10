import { singleton } from "tsyringe";
import { action, computed, makeObservable, observable } from "mobx";
import { RootStore } from "@/stores/RootStore";
import { AnchorProvider } from "@coral-xyz/anchor";
import { CONNECTION, PLAYER_PROGRAM_ID } from "@/lib/constants";
import { KeyedAccountInfo, PublicKey } from "@solana/web3.js";
import { PlayerName, PlayerProfileProgram } from "@staratlas/player-profile";
import { readAllFromRPC } from "@staratlas/data-source";

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
            loadPlayerName: action.bound,

            cachedPlayerNames: computed
        })
    }

    setPlayerName(name: string) {
        this.playerName = name;
    }

    get cachedPlayerNames(): PlayerName[] {
        return this.storedNames;
    }

    async loadPlayerName(): Promise<void> {
        const provider = new AnchorProvider(
            CONNECTION,
            {} as any,
            AnchorProvider.defaultOptions(),
        );

        // wallet address of the player
        const playerPubKey = new PublicKey(this.rootStore.walletStore.wallet?.publicKey?.toString()!);
        // console.log('player key...', playerPubKey);

        const [accountInfo] = await CONNECTION.getProgramAccounts(
            PLAYER_PROGRAM_ID,
            {
                filters: [
                    {
                        memcmp: {
                            offset: 30, // PlayerProfile.MIN_DATA_SIZE + 2
                            bytes: playerPubKey.toBase58(),
                        },
                    },
                ],
            },
        );
        // console.log('account info...', accountInfo);

        const playerProfileProgram = PlayerProfileProgram.buildProgram(
            PLAYER_PROGRAM_ID,
            provider,
        );

        const profiles = (await readAllFromRPC(
            CONNECTION,
            playerProfileProgram,
            PlayerName
        )).find((data) => data.type === 'ok' && data.data.data.profile.toString() === accountInfo.pubkey.toString());

        if (profiles && profiles.type === 'ok' && profiles.data.name) {
            this.setPlayerName(profiles.data.name);
        }
    }
}
