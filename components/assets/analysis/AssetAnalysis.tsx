'use client'

import { useEffect, useState, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { StarRating } from "@/lib/types";
import { AssetPresenter } from "@/presenters/AssetPresenter";
import { Button } from "@/components/ui/button";
import { assets } from "@/lib/metadata";
import { AssetImage } from '@/components/assets/analysis/AssetImage';
import { StarRatingData } from '@/components/assets/analysis/StarRating';
import { AssetQuantityRow } from '@/components/assets/analysis/AssetQuantityRow';
import { AssetPriceRow } from '@/components/assets/analysis/AssetPriceRow';
import { AssetVolumeDemand } from '@/components/assets/analysis/AssetVolumeDemand';
import { AssetCompetitivenessLiquidity } from '@/components/assets/analysis/AssetCompetitivenessLiquidity';

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
            <AssetImage asset={asset} image={image} />

            {isLoading && Object.keys(currentData).length === 0 ? (
                <div className="text-center">Loading {selectedCurrency} data...</div>
            ) : error ? (
                <div className="text-center">{error}</div>
            ) : (
                <>
                    {/* Render data progressively */ }
                    <StarRatingData currentData={currentData} />
                    <AssetQuantityRow currentData={currentData} />
                    <AssetPriceRow currentData={currentData} currency={selectedCurrency} />
                    <AssetVolumeDemand currentData={currentData} />
                    <AssetCompetitivenessLiquidity currentData={currentData} />
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
