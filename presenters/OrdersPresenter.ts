import { makeAutoObservable, runInAction, observable, action, autorun } from 'mobx';
import { ReturnedOrders } from "@/lib/types";
import { GmClientService } from "@staratlas/factory";
import { bnToNumber, getNftMint, getNftName } from "@/lib/utils";
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

    componentDidMount() {
        autorun(() => {
            console.log('componentDidMount... ');
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
            console.log('nftMint: ', nftMint.toString());
            console.log('name: ', name);

            const orders = await gmClientService.getOpenOrdersForAsset(CONNECTION, nftMint, PROGRAM_ID);
            const atlasSellOrders = orders.filter(order => order.orderType === 'sell' && order.currencyMint === ATLAS);
            const userOrders = atlasSellOrders.filter(order => order.owner.toString() === ownerKey);

            if (userOrders.length === 0) {
                this.error = 'No open orders found for this user in this market.';
                return;
            }

            const openOrders: ReturnedOrders[] = userOrders.map(order => ({
                assetName: name.toLowerCase(),
                orderType: order.orderType,
                orderId: order.id.toString(),
                price: bnToNumber(new BN(order.price)),
                quantity: order.orderQtyRemaining,
                owner: order.owner.toString()
            }));
            // console.log('openOrders: ', openOrders);

            runInAction(() => {
                this.orders.push(...openOrders);
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
                    orderType: getOrder.orderType,
                    orderId: getOrder.id.toString(),
                    price: bnToNumber(new BN(getOrder.price)),
                    quantity: getOrder.orderQtyRemaining,
                    owner: getOrder.owner.toString()
                });
            }

            const orders = this.orders.filter(order => order.orderId === orderID);
            // console.log('orders: ', orders);

            runInAction(() => {
                this.blinkURL = `https://blinkstationx.com/blink?asset=${orders[0].assetName}|${orders[0].orderId}|${orders[0].price}|${orders[0].quantity}`;
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
