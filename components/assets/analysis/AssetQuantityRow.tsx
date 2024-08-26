import { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";
import { AssetProps } from "@/lib/types";
import { formatQuantity } from "@/lib/utils";

export const AssetQuantityRow: FunctionComponent<AssetProps> = observer(({ currentData }: AssetProps) => {
    const isLoading = currentData?.totalBuyQuantity === undefined || currentData?.totalSellQuantity === undefined;

    return (
        <div className="flex flex-row justify-between items-center mb-3">
            <div className="flex flex-col items-start">
                <div className="font-bold text-lg mb-1">Total Buy Orders by Quantity</div>
                { isLoading ? (
                    <div className="bg-zinc-800 h-6 w-24 rounded-md animate-pulse"/>
                ) : (
                    <div>{ formatQuantity( currentData.totalBuyQuantity! )}</div>
                )}
            </div>

            <div className="flex flex-col items-end">
                <div className="font-bold text-lg mb-1">Total Sell Orders by Quantity</div>
                { isLoading ? (
                    <div className="bg-zinc-800 h-6 w-24 rounded-md animate-pulse"/>
                ) : (
                    <div>{ formatQuantity( currentData.totalSellQuantity! )}</div>
                )}
            </div>
        </div>
    )
})
