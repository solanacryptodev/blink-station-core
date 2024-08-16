import 'reflect-metadata';
import { makeAutoObservable } from 'mobx';
import { RootStore } from "@/stores/RootStore";
import { singleton } from "tsyringe";

interface Track {
    url: string;
    name: string;
}

@singleton()
export class MusicStore {
    songs: Track[] = [
        { url: '/song1.mp3', name: 'Nova - Futurescapes' },
        { url: '/song2.mp3', name: 'Dusk - Futurescapes' },
        { url: '/song3.mp3', name: 'Song 3' },
    ];
    currentSongIndex: number = 0;
    isPlaying: boolean = false;
    audio: HTMLAudioElement | null = null;
    currentTime: number = 0;
    duration: number = 0;
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    initializeAudio(): void {
        console.log()
        // if (typeof window !== 'undefined') {
        //     this.audio = new Audio(this.songs[this.currentSongIndex].url);
        //     this.audio.addEventListener('timeupdate', this.handleTimeUpdate);
        //     this.audio.addEventListener('loadedmetadata', this.handleLoadedMetadata);
        //     this.audio.addEventListener('ended', this.handleEnded);
        // }
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

    handleEnded = () => {
        this.nextSong();
    }

    play() {
        if (this.audio) {
            this.audio.play();
            this.isPlaying = true;
        }
    }

    pause() {
        if (this.audio) {
            this.audio.pause();
            this.isPlaying = false;
        }
    }

    nextSong() {
        if (this.currentSongIndex < this.songs.length - 1) {
            this.currentSongIndex++;
            this.loadSong();
        }
    }

    previousSong() {
        if (this.currentSongIndex > 0) {
            this.currentSongIndex--;
            this.loadSong();
        }
    }

    loadSong() {
        if (this.audio) {
            this.audio.src = this.songs[this.currentSongIndex].url;
            this.currentTime = 0;
            this.duration = 0;
            if (this.isPlaying) {
                this.audio.play();
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
