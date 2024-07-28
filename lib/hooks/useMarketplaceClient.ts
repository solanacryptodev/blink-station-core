import { useState, useCallback } from 'react';
import { PublicKey } from '@solana/web3.js';
import { GmClientService } from '@staratlas/factory';
import { CONNECTION, PROGRAM_ID, ATLAS } from '@/lib/constants';
import { getNftMint, bnToNumber, getNftName } from "@/lib/utils";
import { BN } from "@coral-xyz/anchor";
import { ReturnedOrders } from "@/lib/types";

export const useMarketplaceClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const findOpenOrdersByAsset = useCallback(async (asset: string, userPubkey: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const gmClientService = new GmClientService();
            const nftMint = getNftMint(asset) as PublicKey;
            const name = getNftName(asset) as string;
            console.log('nftMint: ', nftMint.toString());

            const orders = await gmClientService.getOpenOrdersForAsset(CONNECTION, nftMint, PROGRAM_ID);
            const atlasSellOrders = orders.filter(order => order.orderType === 'sell' && order.currencyMint === ATLAS);

            const openOrders: ReturnedOrders[] = atlasSellOrders.map(order => ({
                assetName: name,
                orderType: order.orderType,
                orderId: order.id.toString(),
                price: bnToNumber(new BN(order.price)),
                quantity: order.orderQtyRemaining,
                owner: order.owner.toString()
            }));

            console.log('openOrders: ', openOrders);
            return openOrders;
        } catch (error) {
            console.error('An error emerged...', error);
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
            return [];
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        findOpenOrdersByAsset,
        isLoading,
        error
    };
};
