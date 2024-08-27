import React, { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";
import { AssetProps } from "@/lib/types";
import { formatQuantity } from "@/lib/utils";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { InfoIcon } from "@/components/ui/icons";

export const AssetCompetitivenessLiquidity: FunctionComponent<AssetProps> = observer(({ currentData }: AssetProps) => {
    const isLoading = currentData?.priceCompetitivenessRating === undefined || currentData?.classLiquidity === undefined;

    return (
       <>
           <ReactTooltip id="price-liquidity" style={{ maxWidth: '400px', width: '100%', backgroundColor: 'black', opacity: 1}} />
           <div className="flex flex-row justify-between items-center mb-3">
               <div className="flex flex-col items-start">
                   <div className="flex flex-row font-bold text-lg mb-1 items-center">
                       <a
                           data-tooltip-id="price-liquidity"
                           data-tooltip-delay-show={ 2 }
                           data-tooltip-content="A rating that represents a comparison of an assets current lowest price relative to the average selling price of the
                           same asset. A PRC rating of 50+ is considered a buyers market where prices are cheap.
                           Calculated by: ((Average Sell Price - Lowest Current Price) / Average Sell Price) * 100">
                           <InfoIcon className="bg-white mr-2 rounded-lg"/>
                       </a>
                       Price Competitiveness Rating
                   </div>
                   { isLoading ? (
                       <div className="bg-zinc-800 h-6 w-24 rounded-md animate-pulse"/>
                   ) : (
                       <div>{ formatQuantity( currentData.priceCompetitivenessRating! ) }</div>
                   ) }
               </div>

               <div className="flex flex-col items-end">
                   <div className="flex flex-row font-bold text-lg mb-1 items-center">
                       Liquidity Rating
                       <a
                           data-tooltip-id="price-liquidity"
                           data-tooltip-delay-show={ 2 }
                           data-tooltip-content="A rating that represents the Total Buy Order by Price liquidity relative to the average liquidity of its class. A rating
                           of 100 is considered average liquidity for an asset relative to its class. Calculated by:
                           (Asset's Total Liquidity) / (Average Liquidity of Asset Class) * 100">
                           <InfoIcon className="bg-white ml-2 rounded-lg"/>
                       </a>
                   </div>
                   { isLoading ? (
                       <div className="bg-zinc-800 h-6 w-24 rounded-md animate-pulse"/>
                   ) : (
                       <div>{ formatQuantity( currentData.classLiquidity! ) }</div>
                   ) }
               </div>
           </div>
       </>
    )
})
