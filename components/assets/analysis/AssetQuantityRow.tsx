import React, { FunctionComponent } from "react";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { observer } from "mobx-react-lite";
import { AssetProps } from "@/lib/types";
import { formatQuantity } from "@/lib/utils";
import { InfoIcon } from "@/components/ui/icons";

export const AssetQuantityRow: FunctionComponent<AssetProps> = observer(({ currentData }: AssetProps) => {
    const isLoading = currentData?.totalBuyQuantity === undefined || currentData?.totalSellQuantity === undefined;

    return (
        <>
            <ReactTooltip id="quantity" style={{ maxWidth: '400px', width: '100%', backgroundColor: 'black', opacity: 1}} />
            <div className="flex flex-row justify-between items-center mb-3">
                <div className="flex flex-col items-start">
                    <div className="flex flex-row font-bold text-lg mb-1 items-center">
                        <a
                            data-tooltip-id="quantity"
                            data-tooltip-delay-show={ 2 }
                            data-tooltip-content="The current total quantity of assets in demand. Calculated by totaling the buy side quantity column.">
                            <InfoIcon className="bg-white mr-2 rounded-lg"/>
                        </a>
                        Total Buy Orders by Quantity
                    </div>
                    { isLoading ? (
                        <div className="bg-zinc-800 h-6 w-24 rounded-md animate-pulse"/>
                    ) : (
                        <div>{ formatQuantity( currentData.totalBuyQuantity! ) }</div>
                    ) }
                </div>

                <div className="flex flex-col items-end">
                    <div className="flex flex-row font-bold text-lg mb-1 items-center">
                        Total Sell Orders by Quantity
                        <a
                            data-tooltip-id="quantity"
                            data-tooltip-delay-show={ 2 }
                            data-tooltip-content="The current total quantity of assets in supply. Calculated by totaling the sell side quantity column.">
                            <InfoIcon className="bg-white ml-2 rounded-lg"/>
                        </a>
                    </div>
                    { isLoading ? (
                        <div className="bg-zinc-800 h-6 w-24 rounded-md animate-pulse"/>
                    ) : (
                        <div>{ formatQuantity( currentData.totalSellQuantity! ) }</div>
                    ) }
                </div>
            </div>
        </>
    )
} )
