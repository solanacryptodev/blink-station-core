import { Connection } from "@solana/web3.js";
import { readAllFromRPC } from "@staratlas/data-source";
import { PlayerProfileIDLProgram, PlayerName } from '@staratlas/player-profile';

/* May move some logic from the API route to here */
export const playerProfileData = async (connection: Connection, playerProfileProgram: PlayerProfileIDLProgram): Promise<PlayerName[]> => {
    const profiles = (await readAllFromRPC(connection, playerProfileProgram, PlayerName)).map(
        (playerProfiles) => playerProfiles.type === 'ok' && playerProfiles.data
    );

    let data: PlayerName[] = [];
    for (const profileData of profiles) {
        if (profileData) {
            data.push(profileData);
        }
    }

    return data;
}
