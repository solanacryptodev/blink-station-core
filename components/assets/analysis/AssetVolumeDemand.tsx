import React, { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";
import { AssetProps } from "@/lib/types";
import { formatQuantity } from "@/lib/utils";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { InfoIcon } from "@/components/ui/icons";

export const AssetVolumeDemand: FunctionComponent<AssetProps> = observer(({ currentData }: AssetProps) => {
    const isLoading = currentData?.volumeRating === undefined || currentData.demandRating === undefined;

    return (
        <>
            <ReactTooltip id="vol-demand" style={{ maxWidth: '400px', width: '100%', backgroundColor: 'black', opacity: 1}} />
            <div className="flex flex-row justify-between items-center mb-3">
                <div className="flex flex-col items-start">
                    <div className="flex flex-row font-bold text-lg mb-1 items-center">
                        <a
                            data-tooltip-id="vol-demand"
                            data-tooltip-delay-show={ 2 }
                            data-tooltip-content="A rating to represent the total number of exchanges for an asset relative to its class over a 24hr period. A rating of
                            100 is considered average trading volume relative to its class.
                            Calculated by: (Asset's Trading Volume) / (Average Trading Volume of Asset Class) * 100">
                            <InfoIcon className="bg-white mr-2 rounded-lg"/>
                        </a>
                        Volume Rating
                    </div>
                    { isLoading ? (
                        <div className="bg-zinc-800 h-6 w-24 rounded-md animate-pulse"/>
                    ) : (
                        <div>{ formatQuantity( currentData.volumeRating! ) }</div>
                    ) }
                </div>

                <div className="flex flex-col items-end">
                    <div className="flex flex-row font-bold text-lg mb-1 items-center">
                        Demand Rating
                        <a
                            data-tooltip-id="vol-demand"
                            data-tooltip-delay-show={ 2 }
                            data-tooltip-content="A rating to represent the ratio of total quantity in buy orders to total quantity in sell orders. A rating of 100 is
                            considered average demand.
                            Calculated by: (Total Buy Orders by Quantity) / (Total Sell Orders by Quantity) * 100">
                            <InfoIcon className="bg-white ml-2 rounded-lg"/>
                        </a>
                    </div>
                    { isLoading ? (
                        <div className="bg-zinc-800 h-6 w-24 rounded-md animate-pulse"/>
                    ) : (
                        <div>{ formatQuantity( currentData.demandRating! ) }</div>
                    ) }
                </div>
            </div>
        </>
    )
})
