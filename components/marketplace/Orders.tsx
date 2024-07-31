'use client'

import { observer } from "mobx-react-lite";
import { OrdersPresenter } from "@/presenters/OrdersPresenter";
import { Error } from '@/components/error';
import { OpenOrders } from "@/lib/types";
import { FunctionComponent, useEffect, useId } from "react";
import { useAIState } from "ai/rsc";
import { nanoid } from "nanoid";

export const Orders: FunctionComponent<{ userAsset: OpenOrders[] }> = observer( ({ userAsset }: { userAsset: OpenOrders[] }) => {
    // create a new orders presenter instance if one doesn't exist, or return the existing one
    const ordersPresenter = OrdersPresenter.getInstance();
    const id = useId();

    // get the AI state and update it
    const [aiState, setAIState] = useAIState()
    // console.log('current ai state... ', aiState)

    if ( !ordersPresenter.isLoading && !ordersPresenter.isFetchComplete ){
        ordersPresenter.fetchOrders(userAsset[0].assetName.toLowerCase(), userAsset[0].ownerKey).then();
    }

    useEffect(() => {
        if (ordersPresenter.isFetchComplete && !ordersPresenter.isLoading) {
            const ordersString = JSON.stringify(ordersPresenter.orders, null, 2);
            const message = {
                id,
                role: 'system' as const,
                content: `[Player has generated these open orders based on ${userAsset[0].assetName} and ${userAsset[0].ownerKey}]: ${ordersString}`
            }

            if (aiState.messages[aiState.messages.length - 1]?.id === id) {
                setAIState({
                    ...aiState,
                    messages: [...aiState.messages.slice(0, -1), message]
                })
            } else {
                setAIState({
                    ...aiState,
                    messages: [...aiState.messages, message]
                })
            }
        }
    }, [ordersPresenter.isFetchComplete, ordersPresenter.isLoading])
    // console.log('new ai state... ', aiState)

    return (
        <>
            <div className='container flex-col mx-auto bg-gradient-to-r from-blue-900 via-neutral-900 to-blue-900 shadow-lg rounded-lg overflow-hidden'>
                {ordersPresenter.orders.length > 0 && ordersPresenter.orders.map((order) => (
                    <div key={ order.orderId } className='flex flex-col bg-blue-900 p-6 m-8 shadow-lg rounded-lg'>
                        <div className='text-center text-lg mb-4 font-bold'>{ order.assetName.toUpperCase() }</div>

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


                ))}
            </div>

            {ordersPresenter.orders.length === 0 && ordersPresenter.error?.length! > 0 && (
                <Error error={ordersPresenter.error!} />
            )}
        </>
    )
} )
