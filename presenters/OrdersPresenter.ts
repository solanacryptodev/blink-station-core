import { makeAutoObservable, runInAction, observable, action, autorun, toJS } from 'mobx';
import { ReturnedOrders } from "@/lib/types";
import { GmClientService } from "@staratlas/factory";
import { bnToNumber, formatOrderNumber, getNftMint, getNftName, getNftParam, removeDecimal } from "@/lib/utils";
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

        makeAutoObservable(this, {
            orders: observable,
            isLoading: observable,
            isFetchComplete: observable,
            error: observable,
            blinkURL: observable,

            fetchOrders: action.bound,
            buildBlinkUrl: action.bound
        });
    }

    static getInstance(): OrdersPresenter {
        if (!OrdersPresenter.instance) {
            OrdersPresenter.instance = new OrdersPresenter();
        }
        return OrdersPresenter.instance;
    }

    async fetchOrders(assetName: string, ownerKey: string): Promise<void> {
        this.isLoading = true;
        this.error = null;

        try {
            const gmClientService = new GmClientService();
            const nftMint = getNftMint(assetName) as PublicKey;
            const name = getNftName(assetName) as string;
            const paramName = getNftParam(assetName) as string;
            // console.log('asset name is... ', assetName);
            // console.log('nftMint: ', nftMint.toString());
            // console.log('name: ', name);

            const orders = await gmClientService.getOpenOrdersForAsset(CONNECTION, nftMint, PROGRAM_ID);
            const sellOrders = orders.filter(order => order.orderType === 'sell');
            const userOrders = sellOrders.filter(order => order.owner.toString() === ownerKey);
            // console.log('user orders unfiltered... ', userOrders);

            if (userOrders.length === 0) {
                this.error = 'No open orders found for this user in this market.';
                return;
            }

            const openOrders: ReturnedOrders[] = userOrders.map(order => ({
                assetName: name.toLowerCase(),
                assetParam: paramName,
                orderType: order.orderType,
                orderId: order.id.toString(),
                price: formatOrderNumber(new BN(order.price), order),
                quantity: order.orderQtyRemaining,
                owner: order.owner.toString(),
                currency: order.currencyMint === ATLAS ? 'ATLAS' : 'USDC'
            }));
            // console.log('openOrders: ', openOrders);

            runInAction(() => {
                this.orders.push(...openOrders);
                // console.log('this.orders... ', toJS((this.orders)));
                this.isFetchComplete = true;
                this.isLoading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = error as string;
                this.isLoading = false;
            });
        }
    }

    async buildBlinkUrl(orderID: string): Promise<string> {
        try {
            if ( this.orders.length === 0 ) {
                const gmClientService = new GmClientService();
                const getOrder = await gmClientService.getOpenOrder(CONNECTION, new PublicKey(orderID), PROGRAM_ID);
                const name = assets.filter((asset) => asset.mint === getOrder.orderMint);
                this.orders.push({
                    assetName: name[0].name.toLowerCase(),
                    assetParam: name[0].param,
                    orderType: getOrder.orderType,
                    orderId: getOrder.id.toString(),
                    price: bnToNumber(new BN(getOrder.price)),
                    quantity: getOrder.orderQtyRemaining,
                    owner: getOrder.owner.toString(),
                    currency: getOrder.currencyMint === ATLAS ? 'ATLAS' : 'USDC'
                });
            }

            const orders = this.orders.filter(order => order.orderId === orderID);
            // console.log('orders: ', orders);
            const removedDecimal = removeDecimal(orders[0].price as number);

            runInAction(() => {
                if (orders[0].currency === 'ATLAS') {
                    this.blinkURL = `https://blinkstationx.com/blink?asset=${orders[0].assetParam}|${orders[0].orderId}|${removedDecimal}|${orders[0].quantity}|${orders[0].currency?.toLowerCase()}/`;
                } else {
                    this.blinkURL = `https://blinkstationx.com/blink?asset=${orders[0].assetParam}|${orders[0].orderId}|${orders[0].price}|${orders[0].quantity}|${orders[0].currency?.toLowerCase()}/`;
                }
                // console.log('blinkURL: ', this.blinkURL);
            });

        } catch (error) {
            runInAction(() => {
                this.error = error as string;
                this.isLoading = false;
            });
        }

        return this.blinkURL;
    }
}
