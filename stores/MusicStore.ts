import 'reflect-metadata';
import { action, computed, makeObservable, observable } from 'mobx';
import { RootStore } from "@/stores/RootStore";
import { singleton } from "tsyringe";
import { Track } from '@/lib/types'

@singleton()
export class MusicStore {
    songs: Track[];
    currentSongIndex: number;
    isPlaying: boolean;
    autoplay: boolean;
    audio: HTMLAudioElement | null;
    currentTime: number;
    duration: number;
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.currentSongIndex = 0;
        this.currentTime = 0;
        this.duration = 0;
        this.isPlaying = false;
        this.autoplay = true;
        this.audio = null;
        this.songs = this.songs = [
            { url: `https://shdw-drive.genesysgo.net/${process.env.NEXT_PUBLIC_SHDW!}/Glass%20-%20Futurescapes.mp3`, name: 'Glass - Futurescapes' },
            { url: `https://shdw-drive.genesysgo.net/${process.env.NEXT_PUBLIC_SHDW!}/Apt%20904%20-%20Futurescapes.mp3`, name: 'Apt 904 - Futurescapes' },
            { url: `https://shdw-drive.genesysgo.net/${process.env.NEXT_PUBLIC_SHDW!}/Nova%20-%20Futurescapes.mp3`, name: 'Nova - Futurescapes' },
        ];

        makeObservable(this, {
            songs: observable,
            currentSongIndex: observable,
            currentTime: observable,
            isPlaying: observable,
            duration: observable,
            audio: observable,
            autoplay: observable,

            previousSong: action.bound,
            nextSong: action.bound,
            loadSong: action.bound,
            setProgress: action.bound,
            play: action.bound,
            pause: action.bound,
            handleTimeUpdate: action.bound,
            handleLoadedMetadata: action.bound,
            initializeAudio: action.bound,

            currentSong: computed,
            progress: computed
        });
    }

    initializeAudio(): void {
        console.log('Music Store Initialized', window);
            this.audio = new Audio(this.songs[this.currentSongIndex].url);
            this.audio.id = 'audio';
            this.audio.addEventListener('loadstart', this.loadSong);
            this.audio.addEventListener('timeupdate', this.handleTimeUpdate);
            this.audio.addEventListener('loadedmetadata', this.handleLoadedMetadata);
            this.audio.addEventListener('ended', this.handleEnded);
            this.audio.volume = 0.5;
    }

    handleTimeUpdate = () => {
        if (this.audio) {
            this.currentTime = this.audio.currentTime;
        }
    }

    handleLoadedMetadata = () => {
        if (this.audio) {
            this.duration = this.audio.duration;
        }
    }

    handleEnded = async (): Promise<void> => {
        await this.nextSong();
    }

    play() {
        console.log('audio...', this.audio);
        if (this.audio) {
            this.audio.play().then(
                () => {
                    this.isPlaying = true;
                },
                (error) => {
                    console.error('Failed to play audio:', error);
                }
            );
        }
    }

    pause() {
        if (this.audio) {
            this.audio.pause();
            this.isPlaying = false;
        }
    }

    async nextSong(): Promise<void> {
        if (this.currentSongIndex < this.songs.length - 1) {
            this.currentSongIndex++;
            await this.loadSong();
        }
    }

    async previousSong(): Promise<void> {
        if (this.currentSongIndex > 0) {
            this.currentSongIndex--;
            await this.loadSong();
        }
    }

    async loadSong(): Promise<void> {
        if (this.audio) {
            this.audio.src = this.songs[this.currentSongIndex].url;
            this.currentTime = 0;
            this.duration = 0;
            if (this.isPlaying) {
                await this.audio.play();
            }
        }
    }

    setProgress(value: number) {
        if (this.audio) {
            this.audio.currentTime = value;
        }
    }

    get currentSong() {
        return this.songs[this.currentSongIndex];
    }

    get progress() {
        return this.duration > 0 ? (this.currentTime / this.duration) * 100 : 0;
    }
}
