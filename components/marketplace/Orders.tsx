'use client'

import { observer } from "mobx-react-lite";
import { OrdersPresenter } from "@/presenters/OrdersPresenter";
import { OpenOrders } from "@/lib/types";
import { FunctionComponent } from "react";

export const Orders: FunctionComponent<{ userAsset: OpenOrders[] }> = observer(async ({ userAsset }: { userAsset: OpenOrders[] }) => {
    // create a new orders presenter instance if one doesn't exist, or return the existing one
    const ordersPresenter = OrdersPresenter.getInstance();

    if ( !ordersPresenter.isLoading && !ordersPresenter.isFetchComplete ){
        await ordersPresenter.fetchOrders(userAsset[0].assetName.toLowerCase(), userAsset[0].ownerKey);
    }

    return (
        <div className='container flex-col mx-auto bg-blue-950 shadow-lg rounded-lg overflow-hidden'>
            {ordersPresenter.orders.map((order) => (
                <div key={ order.orderId } className='flex flex-col bg-blue-900 p-6 m-8 shadow-lg rounded-lg'>
                    <div className='text-center text-xl mb-4'>{ order.assetName }</div>

                    <div>
                        <div className='flex flex-row h-[25px] mb-2 w-full'>
                            <div className='mr-2'>Owner:</div>
                            <div>{ order.owner }</div>
                        </div>

                        <div className='flex flex-row h-[25px] mb-2 w-full'>
                            <div className='mr-2'>Order ID:</div>
                            <div>{ order.orderId }</div>
                        </div>

                        <div className='flex flex-row h-[25px] mb-2 w-full'>
                            <div className='mr-2'>Price:</div>
                            <div>{ order.price } ATLAS</div>
                        </div>

                        <div className='flex flex-row h-[25px] mb-2 w-full'>
                            <div className='mr-2'>Quantity Remaining:</div>
                            <div>{ order.quantity }</div>
                        </div>
                    </div>
                </div>


            ) ) }
        </div>
    )
} )
