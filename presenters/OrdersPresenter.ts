import { makeObservable, observable, action } from 'mobx';
import { ReturnedOrders } from "@/lib/types";
import { GmClientService } from "@staratlas/factory";
import { formatOrderNumber, formatQuantity, getNftMint, getNftName, removeDecimal } from "@/lib/utils";
import { PublicKey } from "@solana/web3.js";
import { ATLAS, CONNECTION, PROGRAM_ID } from "@/lib/constants";
import { BN } from "@coral-xyz/anchor";
import { assets } from "@/lib/metadata";
import { singleton } from 'tsyringe';

@singleton()
export class OrdersPresenter {
    private static instance: OrdersPresenter | null = null;
    orders: ReturnedOrders[];
    isLoading: boolean;
    isFetchComplete: boolean;
    error: string | null;
    blinkURL: string;

    constructor() {
        this.orders = [];
        this.isLoading = false;
        this.isFetchComplete = false;
        this.error = '';
        this.blinkURL = '';

        makeObservable(this, {
            orders: observable,
            isLoading: observable,
            isFetchComplete: observable,
            error: observable,
            blinkURL: observable,

            fetchOrders: action.bound,
            buildBlinkUrl: action.bound,
        });
    }

    static getInstance(): OrdersPresenter {
        if (!OrdersPresenter.instance) {
            OrdersPresenter.instance = new OrdersPresenter();
        }
        return OrdersPresenter.instance;
    }

    async fetchOrders(assetName: string, ownerKey: string): Promise<ReturnedOrders[]> {
        try {
            const gmClientService = new GmClientService();
            const nftMint = getNftMint(assetName) as PublicKey;
            const name = getNftName(assetName) as string;

            const orders = await gmClientService.getOpenOrdersForAsset(CONNECTION, nftMint, PROGRAM_ID);
            const playerSellOrders = orders.filter(order => order.orderType === 'sell');
            const playerOrders = playerSellOrders.filter(order => order.owner.toString() === ownerKey);

            if (playerOrders.length === 0) {
                throw new Error('No open orders found for this user in this market.');
            }
            console.log('playerOrders...', playerOrders);

            return playerOrders.map(order => ({
                assetName: name.toLowerCase(),
                orderType: order.orderType,
                orderId: order.id.toString(),
                price: formatOrderNumber(new BN(order.price), order),
                quantity: formatQuantity(order.orderQtyRemaining),
                owner: order.owner.toString(),
                currency: order.currencyMint === ATLAS ? 'ATLAS' : 'USDC'
            }));
        } catch (error) {
            throw error;
        }
    }

    async buildBlinkUrl(orderID: string): Promise<string> {
        let url = '';
        try {
            const gmClientService = new GmClientService();
            const order = await gmClientService.getOpenOrder(CONNECTION, new PublicKey(orderID), PROGRAM_ID);
            const mint = assets.filter((asset) => asset.mint === order.orderMint);
            const currency = order.currencyMint === ATLAS ? 'ATLAS' : 'USDC';
            const price = order.uiPrice;
            const usdcPrice = formatOrderNumber(order.price, order);
            // console.log('order... ', order);

           if (currency === 'ATLAS') {
               url = `https://blinkstationx.com/blink?asset=${mint[0].param}|${order.id}|${price}|${order.orderQtyRemaining}|${currency?.toLowerCase()}`;
            } else {
               url = `https://blinkstationx.com/blink?asset=${mint[0].param}|${order.id}|${usdcPrice}|${order.orderQtyRemaining}|${currency?.toLowerCase()}`;
           }

        } catch (error) {
            throw error
        }

        return url;
    }
}
