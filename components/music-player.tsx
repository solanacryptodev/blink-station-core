import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useState } from "react";
import { useAudioPlayer } from "react-use-audio-player";
import Image from "next/image";
import * as React from "react";
import { SubscriptionPresenter } from "@/presenters/SubscriptionPresenter";

export const MusicPlayer = observer(() => {
    const subscriptionPresenter = SubscriptionPresenter.getInstance();
    const playlist = useMemo(() => [
        { name: 'Glass - Futurescapes', src: `https://shdw-drive.genesysgo.net/${process.env.NEXT_PUBLIC_SHDW!}/Glass%20-%20Futurescapes.mp3` },
        { name: 'Apt 904 - Futurescapes', src: `https://shdw-drive.genesysgo.net/${process.env.NEXT_PUBLIC_SHDW!}/Apt%20904%20-%20Futurescapes.mp3` },
        { name: 'Nova - Futurescapes', src: `https://shdw-drive.genesysgo.net/${process.env.NEXT_PUBLIC_SHDW!}/Nova%20-%20Futurescapes.mp3` },
    ], []);
    const [songIndex, setSongIndex] = useState(0);
    const { load, paused, togglePlayPause, setVolume, stop } = useAudioPlayer();

    useEffect(() => {
        const isLastSong = songIndex === playlist.length - 1;

        load(playlist[songIndex]?.src, {
            autoplay: true,
            initialVolume: 0.3,
            onend: () => {
                if (isLastSong) {
                    stop();
                } else {
                    setSongIndex(songIndex + 1);
                }
            }
        });
        setVolume(0.3);
    }, [songIndex, load, playlist, setVolume, stop]);

    return (
        <>
            <div className="flex flex-row justify-center items-center">

                <div className="mr-4">
                    <button
                        className={`rounded ${subscriptionPresenter.account.length === 0 ? 'bg-red-500' : 'bg-amber-400'} p-1`}
                        onClick={() => togglePlayPause()}>{ paused ?
                            <Image src='/playIcon.png' width={30} height={30} alt='pause button.' className='rounded-full cursor-pointer' /> :
                            <Image src='/pauseIcon.png' width={30} height={30} alt='play button' className='rounded-full cursor-pointer' />
                    }</button>
                </div>

                <div className="flex justify-center">
                    Now Playing: { playlist[songIndex]?.name }
                </div>
            </div>
        </>
    )
})
