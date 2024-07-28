export const OpenOrdersSkeleton = () => {
    return (
        <div className='container flex-col mx-auto bg-blue-950 shadow-lg rounded-lg overflow-hidden'>
            <div className='flex flex-col bg-blue-900 p-6 m-8 shadow-lg rounded-lg'>
                <div className='flex h-[15px] text-center text-xl mb-4 bg-zinc-800'></div>

                <div>
                    <div className='flex flex-row bg-zinc-800 h-[25px] mb-2 w-full shadow-lg rounded-lg'></div>
                    <div className='flex flex-row bg-zinc-800 h-[25px] mb-2 w-full shadow-lg rounded-lg'></div>
                    <div className='flex flex-row bg-zinc-800 h-[25px] mb-2 w-full shadow-lg rounded-lg'></div>
                    <div className='flex flex-row bg-zinc-800 h-[25px] mb-2 w-full shadow-lg rounded-lg'></div>
                    </div>
                </div>
        </div>
    )
}
