'use client'

'use client'

import { observer } from "mobx-react-lite";
import { OrdersPresenter } from "@/presenters/OrdersPresenter";
import { Error } from '@/components/error';
import { OpenOrders, ReturnedOrders } from "@/lib/types";
import { FunctionComponent, useEffect, useState, useId } from "react";
import { useAIState } from "ai/rsc";

export const Orders: FunctionComponent<{ userAsset: OpenOrders[] }> = observer(({ userAsset }: { userAsset: OpenOrders[] }) => {
    const ordersPresenter = OrdersPresenter.getInstance();
    const id = useId();

    const [orders, setOrders] = useState<ReturnedOrders[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [aiState, setAIState] = useAIState()

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const fetchedOrders = await ordersPresenter.fetchOrders(userAsset[0].assetName.toLowerCase(), userAsset[0].ownerKey);
                setOrders(fetchedOrders!);
            } catch (err) {
                setError('No order found for this user in this market.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [userAsset, ordersPresenter]);

    useEffect(() => {
        if (!isLoading && orders.length > 0) {
            const ordersString = JSON.stringify(orders, null, 2);
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
    }, [isLoading, orders])

    return (
        <>
            <div className='container flex-col mx-auto bg-gradient-to-r from-[#18434D] via-neutral-900 to-[#18434D] shadow-lg rounded-lg overflow-hidden'>
                {orders.length > 0 && orders.map((order) => (
                    <div key={ order.orderId } className='flex flex-col opacity-100 bg-[#152B33] p-6 m-8 shadow-lg rounded-lg'>
                        <div className='text-center text-lg mb-4 font-bold'>{ order.assetName.toUpperCase() }</div>
                        <div>
                            <div className='flex flex-row h-[25px] mb-2 w-full text-nowrap'>
                                <div className='mr-2'>Owner:</div>
                                <div>{ order.owner }</div>
                            </div>
                            <div className='flex flex-row h-[25px] mb-2 w-full text-nowrap'>
                                <div className='mr-2'>Order ID:</div>
                                <div>{ order.orderId }</div>
                            </div>
                            <div className='flex flex-row h-[25px] mb-2 w-full'>
                                <div className='mr-2'>Price:</div>
                                <div>{ order.price } { order.currency }</div>
                            </div>
                            <div className='flex flex-row h-[25px] mb-2 w-full'>
                                <div className='mr-2'>Quantity Remaining:</div>
                                <div>{ order.quantity }</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {orders.length === 0 && error && (
                <Error error={error} />
            )}
        </>
    )
});
