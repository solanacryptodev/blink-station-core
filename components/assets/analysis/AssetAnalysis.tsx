'use client'

import { useEffect, useState, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { StarRating } from "@/lib/types";
import { AssetPresenter } from "@/presenters/AssetPresenter";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { assets } from "@/lib/metadata";
import { formatQuantity } from "@/lib/utils";

export const AssetAnalysis = observer(({ asset }: { asset: string }) => {
    const assetPresenter = AssetPresenter.getInstance();
    const [selectedCurrency, setSelectedCurrency] = useState<'USDC' | 'ATLAS'>('ATLAS');
    const [atlasData, setAtlasData] = useState<Partial<StarRating>>({});
    const [usdcData, setUsdcData] = useState<Partial<StarRating> | null>(null);
    const [image, setImage] = useState('');
    const [isAtlasOnly, setIsAtlasOnly] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async (currency: 'ATLAS' | 'USDC') => {
        setIsLoading(true);
        setError(null);
        try {
            const updatePartialData = (partialData: Partial<StarRating>) => {
                console.log('Received data update:', partialData);
                if (currency === 'ATLAS') {
                    setAtlasData(prevData => ({ ...prevData, ...partialData }));
                } else {
                    setUsdcData(prevData => prevData ? { ...prevData, ...partialData } : partialData);
                }
                setIsLoading(false);
            };

            await assetPresenter.fetchAssetData(asset.toLowerCase(), currency, updatePartialData);
        } catch (err) {
            console.error('Error in fetchData:', err);
            setError(`Error fetching ${currency} data`);
            setIsLoading(false);
        }
    }, [asset, assetPresenter]);

    useEffect(() => {
        const foundAsset = assets.find((_asset) => _asset.name.toLowerCase() === asset.toLowerCase());
        if (foundAsset) {
            setIsAtlasOnly(!!foundAsset.atlasOnly);
            setImage(foundAsset.image || '');
        }

        // Only fetch ATLAS data initially
        fetchData('ATLAS');
    }, [asset, fetchData]);

    const handleCurrencyChange = (currency: 'USDC' | 'ATLAS') => {
        setSelectedCurrency(currency);
        if (currency === 'USDC' && usdcData === null) {
            fetchData('USDC');
        }
    };

    const currentData = selectedCurrency === 'ATLAS' ? atlasData : (usdcData || {});

    return (
        <div className="container flex-col mx-auto bg-gradient-to-r from-[#18434D] via-neutral-900 to-[#18434D] shadow-lg rounded-lg overflow-hidden p-4">
            <div className="flex flex-col items-center mb-4">
                <div className="flex space-x-2 mb-3">
                    <Button
                        disabled={isAtlasOnly}
                        onClick={() => handleCurrencyChange('USDC')}
                        variant={selectedCurrency === 'USDC' ? 'default' : 'outline'}
                    >
                        USDC
                    </Button>
                    <Button
                        onClick={() => handleCurrencyChange('ATLAS')}
                        variant={selectedCurrency === 'ATLAS' ? 'default' : 'outline'}
                    >
                        ATLAS
                    </Button>
                </div>
                <div className="text-2xl font-bold mb-1">{asset.toUpperCase()}</div>
            </div>

            {/* Asset Image */}
            <div className="flex items-center justify-center mb-4">
                {image ? (
                    <Image src={image} width={130} height={130} alt={`${asset} icon`} className='rounded-full' />
                ) : (
                    <Image src='/blinkIcon.jpg' width={90} height={90} alt='Blink Station X icon.' className='rounded-full'/>
                )}
            </div>

            {isLoading && Object.keys(currentData).length === 0 ? (
                <div>Loading {selectedCurrency} data...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <>
                    {/* Render data progressively */ }
                    <div className="flex text-xl text-yellow-700 font-bold justify-center">S.T.A.R. Rating</div>
                    { currentData.starRating !== undefined ? (
                        <div className="text-center mb-4">
                            <div className="text-yellow-700 text-xl">{ formatQuantity( currentData.starRating ) }</div>
                        </div>
                    ) : (
                        <div className="text-center mb-4">
                            <div className="bg-zinc-800 h-[5px] w-2 shadow-lg rounded-lg animate-pulse" />
                        </div>
                    )}

                    { ( currentData.totalBuyQuantity !== undefined || currentData.totalSellQuantity !== undefined ) && (
                        <div className="flex flex-row justify-between items-center mb-3">
                            <div className="flex flex-col items-start">
                                <div className="font-bold text-lg">Total Buy Orders by Quantity</div>
                                <div>{ formatQuantity( currentData.totalBuyQuantity! ) }</div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="font-bold text-lg">Total Sell Orders by Quantity</div>
                                <div>{ formatQuantity( currentData.totalSellQuantity! ) }</div>
                            </div>
                        </div>
                    ) }


                    { ( currentData.totalBuyPrice !== undefined || currentData.totalSellPrice !== undefined ) && (
                        <div className="flex flex-row justify-between items-center mb-3">
                            <div className="flex flex-col items-start">
                                <div className="font-bold text-lg">Total Buy Orders by Price</div>
                                <div>{ formatQuantity( currentData.totalBuyPrice! ) } { selectedCurrency }</div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="font-bold text-lg">Total Sell Orders by Price</div>
                                <div>{ formatQuantity( currentData.totalSellPrice! ) } { selectedCurrency }</div>
                            </div>
                        </div>
                    ) }

                    { ( currentData.volumeRating !== undefined || currentData.demandRating !== undefined ) && (
                        <div className="flex flex-row justify-between items-center mb-3">
                            <div className="flex flex-col items-start">
                                <div className="font-bold text-lg">Volume Rating</div>
                                <div>{ formatQuantity( currentData.volumeRating! ) }</div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="font-bold text-lg">Demand Rating</div>
                                <div>{ formatQuantity( currentData.demandRating! ) }</div>
                            </div>
                        </div>
                    ) }

                    { ( currentData.priceCompetitivenessRating !== undefined || currentData.classLiquidity !== undefined ) && (
                        <div className="flex flex-row justify-between items-center mb-3">
                            <div className="flex flex-col items-start">
                                <div className="font-bold text-lg">Price Competitiveness Rating</div>
                                <div>{ formatQuantity( currentData.priceCompetitivenessRating! ) }</div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="font-bold text-lg">Liquidity Rating</div>
                                <div>{ formatQuantity( currentData.classLiquidity! ) }</div>
                            </div>
                        </div>
                    ) }
                </>
            ) }

            {/* Chart section (placeholder) */ }
            <div className="flex flex-col w-full mb-4">
                <div className="text-center font-bold text-2xl">Chart</div>
                <div className="text-center text-lg">Coming Soon</div>
            </div>
        </div>
    );
});
