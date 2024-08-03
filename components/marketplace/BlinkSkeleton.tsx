'use client'

export const BlinkSkeleton = () => {
    return (
        <div
            className='container flex flex-col mx-auto bg-gradient-to-r from-[#927C4E] via-neutral-900 to-[#927C4E] shadow-lg rounded-lg overflow-hidden'>
            <div className='flex flex-col bg-[#574a2e] p-6 m-8 shadow-lg rounded-lg'>
                <div className='bg-zinc-800 h-[25px] w-full shadow-lg rounded-lg mb-4 animate-pulse' />
            </div>
        </div>
    )
}
