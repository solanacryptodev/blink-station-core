import 'server-only';

import { Connection, PublicKey } from '@solana/web3.js';
import { GmClientService } from '@staratlas/factory';
import { assets } from '@/lib/metadata';
import { formatPriceForQuery } from "@/lib/utils";
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
export const PROGRAM_ID = new PublicKey('traderDnaR5w6Tcoi3NFm53i48FTDNbGjBSZwWXDRrg');
export const CONNECTION = new Connection(serverRuntimeConfig.HELIUS_RPC_URL);
export const gmClientService = new GmClientService();

export function isValidNftName(nftName: string): boolean {
    return assets.some(asset => asset.name.toLowerCase() === nftName.toLowerCase());
}

export function parseCombinedParams(param: string): { asset: string, orderId: string, price: string, quantity: string } {
    const [asset, orderId, rawPrice, quantity] = param.split('|');
    const price = formatPriceForQuery(rawPrice);
    return { asset, orderId, price, quantity };
}

export function validatedQueryParams(requestUrl: URL) {
    let playerPubKey = new PublicKey('5YMeDBj2C41Fr6paRWUdKc7dXua1DTbhhQwkaKuDdzty');
    let nftName: string = '';
    let label: string = '';

    try {
        if (requestUrl.searchParams.get("player")) {
            playerPubKey = new PublicKey(requestUrl.searchParams.get("player")!);
        }
    } catch (err) {
        new Error('Invalid player');
    }

    try {
        if (requestUrl.searchParams.get("nftName")) {
            nftName = requestUrl.searchParams.get("nftName") as string;
            console.log('requestURL: ', requestUrl.toJSON());
        }

        if (!isValidNftName(nftName)) {
            new Error('Invalid NFT name');
        }
    } catch (err) {
        throw "Invalid input query parameter: amount";
    }

    return {
        nftName,
        playerPubKey,
        label
    };
}
