'use client'

import { FunctionComponent, useState } from "react";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import * as React from "react";
import { Button } from "@/components/ui/button";

export const AssetAnalysis: FunctionComponent<{asset: string}> = observer(({asset}: {asset: string}) => {
    const [selectedCurrency, setSelectedCurrency] = useState<'USDC' | 'ATLAS'>('ATLAS');

    // Dummy data for demonstration
    const data = {
        USDC: {
            scarcityScore: 50,
            gdiScore: 22,
            totalBuyOrders: { amount: 14, quantity: 2 },
            totalSellOrders: { amount: 45, quantity: 10 },
            totalMined: 13270,
            totalBurned: 8345
        },
        ATLAS: {
            scarcityScore: 65,
            gdiScore: 30,
            totalBuyOrders: { amount: 0.5, quantity: 3 },
            totalSellOrders: { amount: 1.2, quantity: 8 },
            totalMined: 15000,
            totalBurned: 9000
        }
    };

    const currentData = data[selectedCurrency];

    return (
        <>
            <div className="container flex-col mx-auto bg-gradient-to-r from-[#18434D] via-neutral-900 to-[#18434D] shadow-lg rounded-lg overflow-hidden p-4">
                <div className="flex flex-col items-center mb-4">
                    <div className="text-2xl font-bold mb-3">{asset.toUpperCase()}</div>
                    <div className="flex space-x-2">
                        <Button
                            onClick={() => setSelectedCurrency('USDC')}
                            variant={selectedCurrency === 'USDC' ? 'default' : 'outline'}
                        >
                            USDC
                        </Button>
                        <Button
                            onClick={() => setSelectedCurrency('ATLAS')}
                            variant={selectedCurrency === 'ATLAS' ? 'default' : 'outline'}
                        >
                            ETH
                        </Button>
                    </div>
                </div>

                {/* TOP SECTION */}
                <div className="flex flex-row items-center justify-evenly mb-4">
                    {/* Scarcity Score */}
                    <div className="text-center">
                        <div className="flex text-xl text-yellow-700 font-bold">Scarcity Score</div>
                        <div className="text-yellow-700 text-xl">{currentData.scarcityScore}</div>
                    </div>

                    {/* Asset Image */}
                    <div className="flex items-center">
                        <Image src='/blinkIcon.jpg' width={80} height={80} alt='Blink Station X icon.' className='rounded-full' />
                    </div>

                    {/* GDI Score */}
                    <div className="text-center">
                        <div className="flex text-xl text-yellow-700 font-bold">GDI Score</div>
                        <div className="text-yellow-700 text-xl">{currentData.gdiScore}</div>
                    </div>
                </div>

                {/* MIDDLE SECTION */}
                <div className="mb-4">
                    {/* Total Buy/Sell Orders by Dollar Amount */}
                    <div className="flex flex-row justify-between items-center mb-3">
                        <div className="flex flex-col items-start">
                            <div className="font-bold text-lg">Total Buy Orders by Amount</div>
                            <div>{currentData.totalBuyOrders.amount} {selectedCurrency}</div>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="font-bold text-lg float-right">Total Sell Orders by Amount</div>
                            <div className="flex float-right">{currentData.totalSellOrders.amount} {selectedCurrency}</div>
                        </div>
                    </div>

                    {/* Total Buy/Sell Orders by Quantity */}
                    <div className="flex flex-row justify-between items-center mb-3">
                        <div className="flex flex-col items-start">
                            <div className="font-bold text-lg">Total Buy Orders by Quantity</div>
                            <div>{currentData.totalBuyOrders.quantity}</div>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="font-bold text-lg">Total Sell Orders by Quantity</div>
                            <div>{currentData.totalSellOrders.quantity}</div>
                        </div>
                    </div>

                    {/* Total Mined/Burned */}
                    <div className="flex flex-row justify-between items-center mb-3">
                        <div className="flex flex-col items-start">
                            <div className="font-bold text-lg">Total Mined</div>
                            <div>{currentData.totalMined}</div>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="font-bold text-lg">Total Burned</div>
                            <div>{currentData.totalBurned}</div>
                        </div>
                    </div>
                </div>

                {/* BOTTOM SECTION */}
                <div className="flex flex-col w-full mb-4">
                    <div className="text-center font-bold text-lg">Top Sellers</div>
                    {/* Get list of sellers and total amount sold and map through them here */}
                </div>
            </div>
        </>
    )
})
