import React, { FunctionComponent, useEffect } from 'react'
import { observer } from "mobx-react-lite";
import { SettingsPresenter } from "@/presenters/SettingsPresenter";
import { useAmplitude } from "@/lib/hooks/use-amplitude";

export const FooterText: FunctionComponent = observer(() => {
    const settingsPresenter = SettingsPresenter.getInstance();
    const { trackEvent } = useAmplitude();

  // useEffect(() => {
  //   settingsPresenter.play();
  // }, [settingsPresenter]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

    return (
      <>
        <div className="hidden sm:block">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <button
                    onClick={() => settingsPresenter.previousSong().then() }
                    disabled={ settingsPresenter.currentSongIndex === 0 }
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                    onClick={() => settingsPresenter.isPlaying ? settingsPresenter.pause() : settingsPresenter.play().then() }
                    className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  { settingsPresenter.isPlaying ? 'Pause' : 'Play' }
                </button>
                <button
                    onClick={() => settingsPresenter.nextSong().then() }
                    disabled={ settingsPresenter.currentSongIndex === settingsPresenter.songs?.length - 1 }
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold">{ settingsPresenter.currentSong?.name }</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">{ formatTime( settingsPresenter.currentTime ) }</span>
              <input
                  type="range"
                  min={ 0 }
                  max={ settingsPresenter.duration }
                  value={ settingsPresenter.currentTime }
                  onChange={ ( e ) => settingsPresenter.setProgress( Number( e.target.value ) ) }
                  className="flex-1"
              />
              <span className="text-sm">{ formatTime( settingsPresenter.duration ) }</span>
            </div>
          </div>
        </div>
      </>
    )
} )
