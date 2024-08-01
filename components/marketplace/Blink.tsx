'use client';

import { observer } from "mobx-react-lite";
import { OrdersPresenter } from "@/presenters/OrdersPresenter";
import { FunctionComponent } from "react";

export const Blink: FunctionComponent<{ orderID: string }> = observer(({ orderID }: { orderID: string }) => {
    const ordersPresenter = OrdersPresenter.getInstance();
    ordersPresenter.buildBlinkUrl(orderID).then();

    return (
        <div className='container flex flex-col mx-auto bg-gradient-to-r from-amber-900 via-neutral-900 to-amber-900 shadow-lg rounded-lg overflow-hidden'>
            <div className='flex flex-col bg-amber-800 p-6 m-8 shadow-lg rounded-lg'>
                <div className='text-center text-xl mb-4 font-bold'>Blink URL</div>
                <div className='text-nowrap text-sm'>{ ordersPresenter.blinkURL }</div>
            </div>
        </div>
    )
});
