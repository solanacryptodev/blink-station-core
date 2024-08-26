import { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";
import { AssetProps } from "@/lib/types";
import { formatQuantity } from "@/lib/utils";

export const AssetPriceRow: FunctionComponent<AssetProps> = observer(({ currentData, currency }: AssetProps) => {
    const isLoading = currentData?.totalBuyPrice === undefined || currentData?.totalSellPrice === undefined;

    return (
        <div className="flex flex-row justify-between items-center mb-3">
            <div className="flex flex-col items-start">
                <div className="font-bold text-lg mb-1">Total Buy Orders by Price</div>
                { isLoading ? (
                    <div className="bg-zinc-800 h-6 w-24 rounded-md animate-pulse"/>
                ) : (
                    <div>{ formatQuantity( currentData.totalBuyPrice! )} {currency}</div>
                )}
            </div>

            <div className="flex flex-col items-end">
                <div className="font-bold text-lg mb-1">Total Sell Orders by Price</div>
                { isLoading ? (
                    <div className="bg-zinc-800 h-6 w-24 rounded-md animate-pulse"/>
                ) : (
                    <div>{ formatQuantity( currentData.totalSellPrice! )} {currency}</div>
                )}
            </div>
        </div>
    )
})
