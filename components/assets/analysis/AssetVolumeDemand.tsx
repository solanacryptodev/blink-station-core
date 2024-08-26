import { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";
import { AssetProps } from "@/lib/types";
import { formatQuantity } from "@/lib/utils";

export const AssetVolumeDemand: FunctionComponent<AssetProps> = observer(({ currentData }: AssetProps) => {
    const isLoading = currentData?.volumeRating === undefined || currentData.demandRating === undefined;

    return (
        <div className="flex flex-row justify-between items-center mb-3">
            <div className="flex flex-col items-start">
                <div className="font-bold text-lg mb-1">Volume Rating</div>
                { isLoading ? (
                    <div className="bg-zinc-800 h-6 w-24 rounded-md animate-pulse"/>
                ) : (
                    <div>{ formatQuantity( currentData.volumeRating! )}</div>
                )}
            </div>

            <div className="flex flex-col items-end">
                <div className="font-bold text-lg mb-1">Demand Rating</div>
                { isLoading ? (
                    <div className="bg-zinc-800 h-6 w-24 rounded-md animate-pulse"/>
                ) : (
                    <div>{ formatQuantity( currentData.demandRating! )}</div>
                )}
            </div>
        </div>
    )
})
