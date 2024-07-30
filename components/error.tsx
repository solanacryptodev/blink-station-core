import { FunctionComponent } from "react";
import { nanoid } from "nanoid";

export const Error: FunctionComponent<{ error: string }> = ({ error }) => {
    return (
        <div className='container flex-col mx-auto bg-gradient-to-r from-red-800 via-neutral-800 to-red-800 shadow-lg rounded-lg overflow-hidden'>
            <div key={ nanoid() } className='flex flex-col bg-red-700 p-6 m-8 shadow-lg rounded-lg'>
                { error }
            </div>
        </div>
    )
}
