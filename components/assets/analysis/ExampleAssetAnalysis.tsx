import { observer } from "mobx-react-lite";
import { FunctionComponent, useState } from "react";
import { StarRating } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { AssetImage } from "@/components/assets/analysis/AssetImage";
import { StarRatingData } from "@/components/assets/analysis/StarRating";
import { AssetQuantityRow } from "@/components/assets/analysis/AssetQuantityRow";
import { AssetPriceRow } from "@/components/assets/analysis/AssetPriceRow";
import { AssetVolumeDemand } from "@/components/assets/analysis/AssetVolumeDemand";
import { AssetCompetitivenessLiquidity } from "@/components/assets/analysis/AssetCompetitivenessLiquidity";
import { ExampleDataProps } from '@/lib/types'
import { assets } from "@/lib/metadata";

export const ExampleAssetAnalysis: FunctionComponent<{ data: ExampleDataProps }> = observer(({ data } : { data: ExampleDataProps }) => {
    const [selectedCurrency, setSelectedCurrency] = useState<'USDC' | 'ATLAS'>('ATLAS');

    const asset = assets.find((asset) => asset.name.toLowerCase() === data.assetName.toLowerCase()!);
    const handleCurrencyChange = (currency: 'USDC' | 'ATLAS') => {
        setSelectedCurrency(currency);
    };

    return (
        <div className="flex flex-col bg-[#A68E77] p-2 rounded-lg">
            <div className="text-center font-bold text-md">This is an example of an asset analysis. Upgrade via Settings to unlock.</div>
            <div className="container flex-col mx-auto bg-gradient-to-r from-[#18434D] via-neutral-900 to-[#18434D] shadow-lg rounded-lg overflow-hidden p-4">
                <div className="flex flex-col items-center mb-4">
                    <div className="flex space-x-2 mb-3">
                        <Button
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
                    <div className="text-2xl font-bold mb-1">{ data.assetName.toUpperCase() }</div>
                </div>

                {/* Asset Image */ }
                <AssetImage asset={ data.assetName } image={ asset?.image }/>

                {/* Render data progressively */ }
                <StarRatingData currentData={ data.exampleData }/>
                <AssetQuantityRow currentData={ data.exampleData }/>
                <AssetPriceRow currentData={ data.exampleData } currency={ selectedCurrency }/>
                <AssetVolumeDemand currentData={ data.exampleData }/>
                <AssetCompetitivenessLiquidity currentData={ data.exampleData }/>


                {/* Chart section (placeholder) */ }
                <div className="flex flex-col w-full mb-4">
                    <div className="text-center font-bold text-2xl">Chart</div>
                    <div className="text-center text-lg">Coming Soon</div>
                </div>
            </div>
        </div>
    )
} )
