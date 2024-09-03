import Image from "next/image";
import { HomeButton } from '@/components/ui/home-button'

const PhotoGrid = ({ photos, id } : {photos: string[], id: string}) => {
    return (
        <div className="group overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[50rem] self-center">
            <div className="flex flex-col gap-4 p-4 w-full mx-auto max-w-3xl opacity-100 bg-gradient-to-r from-[#AB833D] via-neutral-900 to-[#AB833D] self-center shadow-lg rounded-lg">
                <div className="flex gap-4">
                    <Image src={ photos[ 0 ] } alt="Photo 1" width={ 200 } height={ 200 }
                           className="w-1/2 aspect-square object-cover"/>
                    <Image src={ photos[ 1 ] } alt="Photo 2" width={ 200 } height={ 200 }
                           className="w-1/2 aspect-square object-cover"/>
                </div>

                <div className="self-center items-center justify-center">
                    <HomeButton href={ `/chat/${ id }` } className="text-center text-white">Enter Blink Station
                        10</HomeButton>
                </div>

                <div className="flex gap-4">
                    <Image src={ photos[ 2 ] } alt="Photo 3" width={ 200 } height={ 200 }
                           className="w-1/2 aspect-square object-cover"/>
                    <Image src={ photos[ 3 ] } alt="Photo 4" width={ 200 } height={ 200 }
                           className="w-1/2 aspect-square object-cover"/>
                </div>
            </div>
        </div>
    );
};

export default PhotoGrid;
