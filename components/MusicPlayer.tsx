import React, { useState } from 'react'
import { observer } from "mobx-react-lite";

const playlist = [
    { name: 'Glass - Futurescapes', src: `https://shdw-drive.genesysgo.net/${process.env.NEXT_PUBLIC_SHDW!}/Glass%20-%20Futurescapes.mp3` },
    { name: 'Apt 904 - Futurescapes', src: `https://shdw-drive.genesysgo.net/${process.env.NEXT_PUBLIC_SHDW!}/Apt%20904%20-%20Futurescapes.mp3` },
    { name: 'Nova - Futurescapes', src: `https://shdw-drive.genesysgo.net/${process.env.NEXT_PUBLIC_SHDW!}/Nova%20-%20Futurescapes.mp3` },
]

export const MusicPlayer = observer(() => {
    const [currentMusicIndex, setCurrentMusicIndex] = useState(0);

    const handleClickPrevious = (): void => {
        setCurrentMusicIndex((prevIndex) =>
            prevIndex === 0 ? playlist.length - 1 : prevIndex - 1
        );
    };

    const handleClickNext = (): void => {
        setCurrentMusicIndex((prevIndex) =>
            prevIndex < playlist.length - 1 ? prevIndex + 1 : 0
        );
    };

    return (
        <div className="flex flex-col">
            <div className="flex">
                { playlist[currentMusicIndex].name }
            </div>
            <div className="flex w-full">

            </div>
        </div>
    )
})
