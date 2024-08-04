'use client'

export const OpenOrdersSkeleton = () => {
    return (
        <div className='container flex-col mx-auto from-[#18434D] via-neutral-900 to-[#18434D] shadow-lg rounded-lg overflow-hidden'>
            <div className='flex flex-col bg-[#152B33] p-6 m-8 shadow-lg rounded-lg'>
                <div className='flex h-[15px] text-center text-xl mb-4 bg-zinc-800 shadow-lg rounded-lg animate-pulse'></div>

                <div>
                    <div className='flex flex-row bg-zinc-800 h-[25px] mb-2 w-full shadow-lg rounded-lg animate-pulse'></div>
                    <div className='flex flex-row bg-zinc-800 h-[25px] mb-2 w-full shadow-lg rounded-lg animate-pulse'></div>
                    <div className='flex flex-row bg-zinc-800 h-[25px] mb-2 w-full shadow-lg rounded-lg animate-pulse'></div>
                    <div className='flex flex-row bg-zinc-800 h-[25px] mb-2 w-full shadow-lg rounded-lg animate-pulse'></div>
                    </div>
                </div>
        </div>
    )
}
