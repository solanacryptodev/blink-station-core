import React, { FunctionComponent } from 'react';
import { observer } from "mobx-react-lite";
import { formatQuantity } from "@/lib/utils";
import { AssetProps } from '@/lib/types';

export const StarRatingData: FunctionComponent<AssetProps> = observer(({ currentData }: AssetProps) => {
    return (
        <div className="flex flex-col items-center mb-3">
            <div className="text-xl text-yellow-700 font-bold mb-2">S.T.A.R. Rating</div>
            {currentData?.starRating !== undefined ? (
                <div className="text-yellow-700 text-xl">
                    {formatQuantity(currentData.starRating)}
                </div>
            ) : (
                <div className="bg-zinc-800 h-6 w-24 rounded-md animate-pulse" />
            )}
        </div>
    );
});
