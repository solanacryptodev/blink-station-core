'use client'

import { FunctionComponent, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/lib/types";
import { AssetPresenter } from "@/presenters/AssetPresenter";
import { formatQuantity } from "@/lib/utils";

export const AssetAnalysis: FunctionComponent<{asset: string}> = observer(({asset}: {asset: string}) => {
    const assetPresenter = AssetPresenter.getInstance();
    const [selectedCurrency, setSelectedCurrency] = useState<'USDC' | 'ATLAS'>('ATLAS');
    const [item, setItem] = useState<StarRating[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const fetchedOrders = await assetPresenter.fetchAssetData(asset.toLowerCase(), selectedCurrency);
                setItem(fetchedOrders!);
            } catch (err) {
                setError('No order found for this user in this market.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [asset, assetPresenter, selectedCurrency]);

    const data = {
        USDC: {
            starRating: 22,
            totalBuyOrders: { amount: item[0]?.totalBuyPrice, quantity: formatQuantity(item[0]?.totalBuyQuantity!)},
            totalSellOrders: { amount: item[0]?.totalSellPrice, quantity: formatQuantity(item[0]?.totalSellQuantity!)},
            volumeRating: 13270,
            demandRating: 8345,
            liquidityRating: 45,
            priceCompetitivenessRating: 60
        },
        ATLAS: {
            starRating: 30,
            totalBuyOrders: { amount: item[0]?.totalBuyPrice, quantity: formatQuantity(item[0]?.totalBuyQuantity!)},
            totalSellOrders: { amount: item[0]?.totalSellPrice, quantity: formatQuantity(item[0]?.totalSellQuantity!)},
            volumeRating: 15000,
            demandRating: 9000,
            liquidityRating: 45,
            priceCompetitivenessRating: 60
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
                            ATLAS
                        </Button>
                    </div>
                </div>

                {/* TOP SECTION */}
                <div className="flex flex-col items-center mb-4">
                    {/* Scarcity Score */}
                    <div className="text-center">
                        <div className="flex text-xl text-yellow-700 font-bold">S.T.A.R. Rating</div>
                    </div>

                    {/* Asset Image */}
                    <div className="flex items-center">
                        <Image src='/blinkIcon.jpg' width={80} height={80} alt='Blink Station X icon.' className='rounded-full' />
                    </div>

                    {/* GDI Score */}
                    <div className="text-center">
                        <div className="text-yellow-700 text-xl">{currentData.starRating}</div>
                    </div>
                </div>

                {/* MIDDLE SECTION */}
                <div className="mb-4">
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

                    {/* Total Buy/Sell Orders by Dollar Amount */}
                    <div className="flex flex-row justify-between items-center mb-3">
                        <div className="flex flex-col items-start">
                            <div className="font-bold text-lg">Total Buy Orders by Price</div>
                            <div>{currentData.totalBuyOrders.amount} {selectedCurrency}</div>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="font-bold text-lg float-right">Total Sell Orders by Price</div>
                            <div className="flex float-right">{currentData.totalSellOrders.amount} {selectedCurrency}</div>
                        </div>
                    </div>

                    {/* Total Buy/Sell Value */}
                    <div className="flex flex-row justify-between items-center mb-3">
                        <div className="flex flex-col items-start">
                            <div className="font-bold text-lg">Total Buy Order Value</div>
                            <div>{Number(currentData.totalBuyOrders.quantity) * currentData.totalBuyOrders.amount!} {selectedCurrency}</div>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="font-bold text-lg">Total Sell Order Value</div>
                            <div>{Number(currentData.totalSellOrders.quantity) * currentData.totalSellOrders.amount!} {selectedCurrency}</div>
                        </div>
                    </div>

                    {/* Volume and Demand Rating */}
                    <div className="flex flex-row justify-between items-center mb-3">
                        <div className="flex flex-col items-start">
                            <div className="font-bold text-lg">Volume Rating</div>
                            <div>{currentData.volumeRating}</div>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="font-bold text-lg">Demand Rating</div>
                            <div>{currentData.demandRating}</div>
                        </div>
                    </div>

                    {/* Liquidity Rating and Price Competitiveness Rating */}
                    <div className="flex flex-row justify-between items-center mb-3">
                        <div className="flex flex-col items-start">
                            <div className="font-bold text-lg">Price Competitiveness Rating</div>
                            <div>{currentData.priceCompetitivenessRating}</div>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="font-bold text-lg">Liquidity Rating</div>
                            <div>{currentData.liquidityRating}</div>
                        </div>
                    </div>
                </div>

                {/* BOTTOM SECTION */}
                <div className="flex flex-col w-full mb-4">
                    <div className="text-center font-bold text-2xl">Chart</div>
                   <div className="text-center text-lg">Coming Soon</div>
                </div>
            </div>
        </>
    )
})
