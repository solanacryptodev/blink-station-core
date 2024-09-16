'use client'

import { useEffect, useState, useCallback, FunctionComponent, useId } from "react";
import { observer } from "mobx-react-lite";
import { ExampleDataProps, StarRating } from "@/lib/types";
import { AssetPresenter } from "@/presenters/AssetPresenter";
import { SubscriptionPresenter } from "@/presenters/SubscriptionPresenter";
import { Button } from "@/components/ui/button";
import { assets } from "@/lib/metadata";
import { AssetImage } from '@/components/assets/analysis/AssetImage';
import { StarRatingData } from '@/components/assets/analysis/StarRating';
import { AssetQuantityRow } from '@/components/assets/analysis/AssetQuantityRow';
import { AssetPriceRow } from '@/components/assets/analysis/AssetPriceRow';
import { AssetVolumeDemand } from '@/components/assets/analysis/AssetVolumeDemand';
import { AssetCompetitivenessLiquidity } from '@/components/assets/analysis/AssetCompetitivenessLiquidity';
import { ExampleAssetAnalysis } from "@/components/assets/analysis/ExampleAssetAnalysis";
import { useAIState } from "ai/rsc";
import { PlayerPresenter } from "@/presenters/PlayerPresenter";

export const AssetAnalysis: FunctionComponent<{ asset: string }> = observer(({ asset }: { asset: string }) => {
    const assetPresenter = AssetPresenter.getInstance();
    const subscriptionPresenter = SubscriptionPresenter.getInstance();
    const playerPresenter = PlayerPresenter.getInstance();

    const [selectedCurrency, setSelectedCurrency] = useState<'USDC' | 'ATLAS'>('ATLAS');
    const [atlasData, setAtlasData] = useState<Partial<StarRating>>({});
    const [usdcData, setUsdcData] = useState<Partial<StarRating> | null>(null);
    const [image, setImage] = useState('');
    const [isAtlasOnly, setIsAtlasOnly] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const currentData = selectedCurrency === 'ATLAS' ? atlasData : (usdcData || {});
    const [aiState, setAIState] = useAIState();
    const id = useId();
    const playerName = JSON.stringify(playerPresenter.playerName, null, 2);
    const stationRank = JSON.stringify(playerPresenter.playerRank, null, 2);

    const fetchData = useCallback(async (currency: 'ATLAS' | 'USDC') => {
        setIsLoading(true);
        setError(null);
        try {
            const updatePartialData = (partialData: Partial<StarRating>) => {
                // console.log('Received data update:', partialData);
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
        if (subscriptionPresenter.freeAccount) {
            return;
        }

        const foundAsset = assets.find((_asset) => _asset.name.toLowerCase() === asset.toLowerCase());
        if (foundAsset) {
            setIsAtlasOnly(!!foundAsset.atlasOnly);
            setImage(foundAsset.image || '');
        }

        // Only fetch ATLAS data initially
        fetchData('ATLAS');
    }, [asset, fetchData]);

    useEffect(() => {
        let assetData = '';
        if (!error && !isLoading && ((selectedCurrency === 'ATLAS' && atlasData) || (selectedCurrency === 'USDC' && usdcData))) {
            assetData = JSON.stringify(selectedCurrency === 'ATLAS' ? atlasData : usdcData, null, 2);

            // console.log('Updating AI state with asset data:', assetData);
            const message = {
                id,
                role: 'system' as const,
                content: `[This player's Station Rank is ${stationRank} and their name is ${playerName}. They have generated an asset analysis for the 
                ${asset} asset in the ${selectedCurrency} market within the Galactic Marketplace. This returns data in either USDC or ATLAS and provides a 
                Star Atlas Asset (S.T.A.R.) rating. The rating is composed of 4 metrics, Volume Rating (VR), Demand Rating (DR), Liquidity Rating (LR), 
                and Price Competitiveness Rating (PCR). The VR is given the most weight of 0.4, the DR is 0.3, the LR is 0.2, and the PCR is 0.1. 
                The data contains this information: ${assetData}`
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
    }, [error, atlasData, usdcData, id, isLoading, setAIState, playerName, stationRank, selectedCurrency, asset]);

    const handleCurrencyChange = (currency: 'USDC' | 'ATLAS') => {
        if (subscriptionPresenter.freeAccount) {
            return;
        }
        setSelectedCurrency(currency);
        if (currency === 'USDC' && usdcData === null) {
            fetchData('USDC');
        }
    };

    // TODO: Add free account support in the future
    // if ( subscriptionPresenter.freeAccount ) {
    //     return <ExampleAssetAnalysis data={assetPresenter.mockData(asset)} />
    // }

    return (
        <>
            {!subscriptionPresenter.freeAccount && (
                <div className="container flex-col mx-auto bg-gradient-to-r from-[#18434D] via-neutral-900 to-[#18434D] shadow-lg rounded-lg overflow-hidden p-4">
                    <div className="flex flex-col items-center mb-4">
                        <div className="flex space-x-2 mb-3">
                            <Button
                                disabled={ isAtlasOnly }
                                onClick={ () => handleCurrencyChange( 'USDC' ) }
                                variant={ selectedCurrency === 'USDC' ? 'default' : 'outline' }
                            >
                                USDC
                            </Button>
                            <Button
                                onClick={ () => handleCurrencyChange( 'ATLAS' ) }
                                variant={ selectedCurrency === 'ATLAS' ? 'default' : 'outline' }
                            >
                                ATLAS
                            </Button>
                        </div>
                        <div className="text-2xl font-bold mb-1">{ asset.toUpperCase() }</div>
                    </div>

                    {/* Asset Image */ }
                    <AssetImage asset={ asset } image={ image }/>

                    { isLoading && Object.keys( currentData ).length === 0 ? (
                        <div className="text-center mb-2">Loading { selectedCurrency } data...</div>
                    ) : error ? (
                        <div className="text-center">{ error }</div>
                    ) : (
                        <>
                            {/* Render data progressively */ }
                            <StarRatingData currentData={ currentData }/>
                            <AssetQuantityRow currentData={ currentData }/>
                            <AssetPriceRow currentData={ currentData } currency={ selectedCurrency }/>
                            <AssetVolumeDemand currentData={ currentData }/>
                            <AssetCompetitivenessLiquidity currentData={ currentData }/>
                        </>
                    ) }

                    {/* Chart section (placeholder) */ }
                    <div className="flex flex-col w-full mb-4">
                        <div className="text-center font-bold text-2xl">Chart</div>
                        <div className="text-center text-lg">Coming Soon</div>
                    </div>
                </div>
            )}
        </>
    );
});
