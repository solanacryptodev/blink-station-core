'use client'

import * as React from "react";

export const AssetAnalysisSkeleton = () => {
    return (
        <>
            <div className="container flex-col mx-auto bg-gradient-to-r from-[#18434D] via-neutral-900 to-[#18434D] shadow-lg rounded-lg overflow-hidden p-4">
                <div className="flex flex-col items-center mb-4">
                    <div className="flex space-x-2 mb-3 bg-zinc-800 h-[5px] shadow-lg rounded-lg animate-pulse"></div>
                    <div className="bg-zinc-800 h-[5px] w-full shadow-lg rounded-lg animate-pulse mb-1"></div>
                </div>

                {/* TOP SECTION */ }
                <div className="flex flex-col items-center mb-4">
                    {/* Asset Image */ }
                    <div className="flex items-center bg-zinc-800 h-[25px] w-full shadow-lg rounded-lg my-4 animate-pulse"></div>

                    {/* Scarcity Score */ }
                    <div className="text-center">
                        <div className="flex text-xl text-yellow-700 font-bold">S.T.A.R. Rating</div>
                    </div>

                    {/* GDI Score */}
                    <div className="text-center">
                        <div className="text-yellow-700 text-xl bg-zinc-800 h-[25px] shadow-lg rounded-lg my-4 animate-pulse'"></div>
                    </div>
                </div>

                {/* MIDDLE SECTION */}
                <div className="mb-4">
                    {/* Total Buy/Sell Orders by Quantity */}
                    <div className="flex flex-row justify-between items-center mb-3">
                        <div className="flex flex-col items-start">
                            <div className="font-bold text-lg">Total Buy Orders by Quantity</div>
                            <div className='bg-zinc-800 h-[25px] shadow-lg rounded-lg my-4 animate-pulse'></div>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="font-bold text-lg">Total Sell Orders by Quantity</div>
                            <div className='bg-zinc-800 h-[25px] shadow-lg rounded-lg my-4 animate-pulse'></div>
                        </div>
                    </div>

                    {/* Total Buy/Sell Orders by Dollar Amount */}
                    <div className="flex flex-row justify-between items-center mb-3">
                        <div className="flex flex-col items-start">
                            <div className="font-bold text-lg">Total Buy Orders by Price</div>
                            <div className='bg-zinc-800 h-[25px] shadow-lg rounded-lg my-4 animate-pulse'></div>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="font-bold text-lg float-right">Total Sell Orders by Price</div>
                            <div className="flex float-right bg-zinc-800 h-[25px] shadow-lg rounded-lg my-4 animate-pulse'"></div>
                        </div>
                    </div>

                    {/* Volume and Demand Rating */}
                    <div className="flex flex-row justify-between items-center mb-3">
                        <div className="flex flex-col items-start">
                            <div className="font-bold text-lg">Volume Rating</div>
                            <div className='bg-zinc-800 h-[25px] shadow-lg rounded-lg my-4 animate-pulse'></div>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="font-bold text-lg">Demand Rating</div>
                            <div className='bg-zinc-800 h-[25px] shadow-lg rounded-lg my-4 animate-pulse'></div>
                        </div>
                    </div>

                    {/* Liquidity Rating and Price Competitiveness Rating */}
                    <div className="flex flex-row justify-between items-center mb-3">
                        <div className="flex flex-col items-start">
                            <div className="font-bold text-lg">Price Competitiveness Rating</div>
                            <div className="bg-zinc-800 h-[25px] shadow-lg rounded-lg my-4 animate-pulse"></div>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="font-bold text-lg">Liquidity Rating</div>
                            <div className="bg-zinc-800 h-[25px] shadow-lg rounded-lg my-4 animate-pulse"></div>
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
}
