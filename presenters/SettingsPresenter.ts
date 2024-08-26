import { action, computed, makeObservable, observable } from "mobx";
import { RootStore } from "@/stores/RootStore";
import { Track } from "@/lib/types";

export class SettingsPresenter {
    private static instance: SettingsPresenter;
    private rootStore: RootStore;
    settingsModal: boolean;

    constructor() {
        this.rootStore = RootStore.getInstance();
        this.settingsModal = false;

        makeObservable(this, {
            settingsModal: observable,

            activateSettingsModal: action.bound,

            account: computed,
            modal: computed,
            isPlaying: computed,
            currentSongIndex: computed,
            currentSong: computed,
            songs: computed,
            currentTime: computed,
            duration: computed,
            audio: computed
        })
    }

    public static getInstance(): SettingsPresenter {
        if (!SettingsPresenter.instance) {
            SettingsPresenter.instance = new SettingsPresenter()
        }
        return SettingsPresenter.instance
    }

    get account(): boolean {
        return this.rootStore.subscriptionStore.hasAccount;
    }

    get modal(): boolean {
        return this.settingsModal;
    }

    get currentSongIndex(): number {
        return this.rootStore.musicStore.currentSongIndex;
    }

    get isPlaying(): boolean {
        return this.rootStore.musicStore.isPlaying;
    }

    get songs(): Track[] {
        return this.rootStore.musicStore.songs;
    }

    get currentSong(): Track {
        return this.songs[this.currentSongIndex];
    }

    get currentTime(): number {
        return this.rootStore.musicStore.currentTime;
    }

    get duration(): number {
        return this.rootStore.musicStore.duration;
    }

    get audio(): HTMLAudioElement {
        return this.rootStore.musicStore.audio!;
    }

    activateSettingsModal( display: boolean ): void {
        this.settingsModal = display;
    }

    setProgress(value: number): void {
        this.rootStore.musicStore.setProgress(value);
    }

    initialize(): void {
        this.rootStore.musicStore.initializeAudio();
    }

    async previousSong(): Promise<void> {
        await this.rootStore.musicStore.previousSong();
    }

    pause(): void {
        this.rootStore.musicStore.pause();
    }

    play() {
        this.rootStore.musicStore.play();
    }

   async nextSong(): Promise<void> {
        await this.rootStore.musicStore.nextSong();
    }
}
