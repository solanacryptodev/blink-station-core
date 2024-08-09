import { NextRequest, NextResponse } from "next/server";
import { KeyedAccountInfo, Keypair, PublicKey } from "@solana/web3.js";
import { AnchorProvider, Wallet } from "@coral-xyz/anchor";
import { PlayerProfileProgram, PlayerName } from "@staratlas/player-profile";
import { readAllFromRPC } from "@staratlas/data-source";
import { EMPTY_NODE_WALLET, CONNECTION, PLAYER_PROGRAM_ID } from '@/lib/constants';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        // console.log('request body...', body);

        const connection = CONNECTION;
        const seed = new Uint8Array(EMPTY_NODE_WALLET);
        const payer = Keypair.fromSecretKey(seed)
        // const payer = Keypair.generate();
        // console.log('connection...', connection.rpcEndpoint);
        // console.log('new keypair...', payer.publicKey.toString());

        // Create a NodeWallet instance instead of using new Wallet()
        const wallet: Wallet = {
            payer: payer,
            publicKey: payer.publicKey,
            signTransaction: async (transaction: any) => {
                transaction.partialSign(payer);
                return transaction;
            },
            signAllTransactions: async (transactions: any) => {
                transactions.forEach((transaction: any) => {
                    transaction.partialSign(payer);
                });
                return transactions;
            },
        };

        const provider = new AnchorProvider(
            connection,
            wallet as any,
            AnchorProvider.defaultOptions(),
        );

        // wallet address of the player
        const playerPubKey = new PublicKey(body);
        // console.log('player key...', playerPubKey);

        const [accountInfo] = await connection.getProgramAccounts(
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

        const keyedAccountInfo: KeyedAccountInfo = {
            accountId: accountInfo.pubkey,
            accountInfo: accountInfo.account,
        };
        // console.log('keyed account info...', keyedAccountInfo.accountId.toString());

        const playerProfileProgram = PlayerProfileProgram.buildProgram(
            PLAYER_PROGRAM_ID,
            provider,
        );

        const profiles = (await readAllFromRPC(
            connection,
            playerProfileProgram,
            PlayerName
        )).find((data) => data.type === 'ok' && data.data.data.profile.toString() === keyedAccountInfo.accountId.toString());

        const data: any[] = [];
        if (profiles && profiles.type === 'ok' && profiles.data.name) {
            data.push(profiles.data.name);
        }


        return NextResponse.json(data);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
