import React, { FunctionComponent } from 'react';
import { observer } from "mobx-react-lite";
import { formatQuantity } from "@/lib/utils";
import { AssetProps } from '@/lib/types';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { InfoIcon } from '@/components/ui/icons'

export const StarRatingData: FunctionComponent<AssetProps> = observer(({ currentData }: AssetProps) => {
    return (
        <>
            <ReactTooltip id="star-rating" style={{ maxWidth: '400px', width: '100%', backgroundColor: 'black', opacity: 1, cursor: 'pointer' }} />
            <div className="flex flex-col items-center mb-3">
                <div className="flex flex-row text-xl text-yellow-700 font-bold mb-2 items-center">
                    <a
                        data-tooltip-id="star-rating"
                        data-tooltip-delay-show={2}
                        data-tooltip-content="The S.T.A.R. rating represents a holistic assessment of a Star Atlas asset's market performance and desirability.
                        It combines the weighted ratings from liquidity, volume, demand, and price competitiveness into a single score. A S.T.A.R. rating of 100
                        is considered average performance and desirability." >
                        <InfoIcon className="bg-yellow-700 mr-2 rounded-lg" />
                    </a>
                    S.T.A.R. Rating
                </div>
                { currentData?.starRating !== undefined ? (
                    <div className="text-yellow-700 text-xl">
                        {formatQuantity(currentData.starRating)}
                    </div>
                ) : (
                    <div className="bg-zinc-800 h-6 w-24 rounded-md animate-pulse" />
                )}
            </div>
        </>
    );
});
