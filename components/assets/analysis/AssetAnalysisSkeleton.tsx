'use client'

export const AssetAnalysisSkeleton = () => {
    return (
        <>
            <div className="container flex-col mx-auto bg-gradient-to-r from-[#18434D] via-neutral-900 to-[#18434D] shadow-lg rounded-lg overflow-hidden">
                {/* TOP SECTION */ }
                <div className="flex flex-row items-center justify-evenly">
                    {/* Scarcity Score */ }
                    <div className="bg-zinc-800 h-[25px] w-full shadow-lg rounded-lg my-4 animate-pulse"></div>
                    {/* Asset Image */ }
                    <div className="bg-zinc-800 h-[25px] w-full shadow-lg rounded-lg my-4 animate-pulse"></div>
                    {/* GDI Score */ }
                    <div className="bg-zinc-800 h-[25px] w-full shadow-lg rounded-lg my-4 animate-pulse"></div>
                </div>
                {/* MIDDLE SECTION */ }
                <div>
                    {/* Total Buy/Sell Orders by Dollar Amount */ }
                    <div className="flex flex-row justify-between">
                        {/* Buy Orders */ }
                        <div className="bg-zinc-800 h-[25px] w-full shadow-lg rounded-lg my-4 animate-pulse"></div>
                        {/* Sell Orders */ }
                        <div className="bg-zinc-800 h-[25px] w-full shadow-lg rounded-lg my-4 animate-pulse"></div>
                    </div>

                    {/* Total Buy/Sell Orders by Quantity */ }
                    <div className="flex flex-row justify-between">
                        {/* Buy Orders */ }
                        <div className="bg-zinc-800 h-[25px] w-full shadow-lg rounded-lg my-4 animate-pulse"></div>
                        {/* Sell Orders */ }
                        <div className="bg-zinc-800 h-[25px] w-full shadow-lg rounded-lg my-4 animate-pulse"></div>
                    </div>

                    {/* Total Mined/Burned */ }
                    <div className="flex flex-row justify-between">
                        {/* Total Mined */ }
                        <div className="bg-zinc-800 h-[25px] w-full shadow-lg rounded-lg my-4 animate-pulse"></div>
                        {/* Total Burned */ }
                        <div className="bg-zinc-800 h-[25px] w-full shadow-lg rounded-lg my-4 animate-pulse"></div>
                    </div>
                </div>

                {/* BOTTOM SECTION */ }
                <div className="flex flex-col">
                    <div className="justify-center">Top Sellers</div>
                    {/* Get list of sellers and total amount sold and map through them here */ }
                </div>
            </div>
        </>
    )
}
