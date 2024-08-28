import React, { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";
import { AssetProps } from "@/lib/types";
import { formatQuantity } from "@/lib/utils";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { InfoIcon } from "@/components/ui/icons";

export const AssetPriceRow: FunctionComponent<AssetProps> = observer(({ currentData, currency }: AssetProps) => {
    const isLoading = currentData?.totalBuyPrice === undefined || currentData?.totalSellPrice === undefined;

    return (
        <>
            <ReactTooltip id="price" opacity={1} style={{ maxWidth: '400px', width: '100%', backgroundColor: 'black'}} />
            <div className="flex flex-row justify-between items-center mb-3">
                <div className="flex flex-col items-start">
                    <div className="flex flex-row font-bold text-lg mb-1 items-center">
                        <a
                            data-tooltip-id="price"
                            data-tooltip-delay-show={ 2 }
                            data-tooltip-content="The pooled liquid value of demanded assets. Calculated by multiplying the
                            quantity remaining and price of each order and adding them together. The total cost to supply a market.">
                            <InfoIcon className="bg-white mr-2 rounded-lg"/>
                        </a>
                        Total Buy Orders by Price
                    </div>
                    { isLoading ? (
                        <div className="bg-zinc-800 h-6 w-24 rounded-md animate-pulse"/>
                    ) : (
                        <div>{ formatQuantity( currentData.totalBuyPrice! ) } { currency }</div>
                    ) }
                </div>

                <div className="flex flex-col items-end">
                    <div className="flex flex-row font-bold text-lg mb-1 items-center">
                        Total Sell Orders by Price
                        <a
                            data-tooltip-id="price"
                            data-tooltip-delay-show={ 2 }
                            data-tooltip-content="The pooled value of supplied assets. Calculated by multiplying the
                            quantity remaining and price of each order and adding them together. The total cost to buy out a market.">
                            <InfoIcon className="bg-white ml-2 rounded-lg"/>
                        </a>
                    </div>
                    { isLoading ? (
                        <div className="bg-zinc-800 h-6 w-24 rounded-md animate-pulse"/>
                    ) : (
                        <div>{ formatQuantity( currentData.totalSellPrice! ) } { currency }</div>
                    ) }
                </div>
            </div>
        </>
    )
} )
