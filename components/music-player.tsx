import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useState } from "react";
import { useAudioPlayer } from "react-use-audio-player";

export const MusicPlayer = observer(() => {
    const playlist = useMemo(() => [
        { name: 'Glass - Futurescapes', src: `https://shdw-drive.genesysgo.net/${process.env.NEXT_PUBLIC_SHDW!}/Glass%20-%20Futurescapes.mp3` },
        { name: 'Apt 904 - Futurescapes', src: `https://shdw-drive.genesysgo.net/${process.env.NEXT_PUBLIC_SHDW!}/Apt%20904%20-%20Futurescapes.mp3` },
        { name: 'Nova - Futurescapes', src: `https://shdw-drive.genesysgo.net/${process.env.NEXT_PUBLIC_SHDW!}/Nova%20-%20Futurescapes.mp3` },
    ], []);
    const [songIndex, setSongIndex] = useState(0);
    const { load, paused, togglePlayPause, setVolume } = useAudioPlayer();

    useEffect(() => {
        load(playlist[songIndex].src, {
            autoplay: true,
            initialVolume: 0.3,
            onend: () => setSongIndex(songIndex + 1)
        });
        setVolume(0.3);
    }, [songIndex, load, playlist, setVolume]);

    return (
        <>
            <div className="flex flex-row justify-center items-center">

                <div className="mr-4">
                    <button className="rounded bg-[#194555] p-1" onClick={() => togglePlayPause()}>{ paused ? 'Play' : 'Pause' }</button>
                </div>

                <div className="flex justify-center">
                    Now Playing: { playlist[ songIndex ]?.name }
                </div>
            </div>
        </>
    )
} )
