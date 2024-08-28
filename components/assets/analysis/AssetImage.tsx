import Image from "next/image";
import { AssetProps } from "@/lib/types";
import { observer } from "mobx-react-lite";
import { FunctionComponent } from "react";


export const AssetImage: FunctionComponent<AssetProps> = observer(({ image, asset }: AssetProps) => {

    return (
        <div className="flex items-center justify-center mb-4">
            { image ? (
                <Image src={ image } width={ 130 } height={ 130 } alt={ `${ asset } icon` } className='rounded-full' />
            ) : (
                <Image src='/blinkIcon.jpg' width={ 90 } height={ 90 } alt='Blink Station X icon.' className='rounded-full' />
            )}
        </div>
    )
})
