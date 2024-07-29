'use client'

export const BlinkSkeleton = () => {
    return (
        <div
            className='container flex flex-col mx-auto bg-gradient-to-r from-amber-900 via-neutral-900 to-amber-900 shadow-lg rounded-lg overflow-hidden'>
            <div className='flex flex-col bg-amber-800 p-6 m-8 shadow-lg rounded-lg'>
                <div className='bg-zinc-800 h-[25px] w-full shadow-lg rounded-lg mb-4' />
            </div>
        </div>
    )
}
