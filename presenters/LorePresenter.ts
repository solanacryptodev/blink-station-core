import { runInAction, observable, action, autorun, makeObservable, toJS } from 'mobx';
import { Lore } from '@/lib/lore/lore';
import { LoreMetadata } from '@/lib/metadata';
import { singleton } from 'tsyringe';

@singleton()
export class LorePresenter {
    private static instance: LorePresenter | null = null;
    lore: LoreMetadata[];
    loreName: string;
    loreAnalysis: string;
    isLoading: boolean;
    isFetchComplete: boolean;

    constructor() {
        this.lore = [];
        this.loreName = '';
        this.loreAnalysis = '';
        this.isLoading = false;
        this.isFetchComplete = false;

        makeObservable(this, {
            lore: observable,
            loreName: observable,
            loreAnalysis: observable,
            isLoading: observable,
            isFetchComplete: observable,

            setLore: action.bound,
            findLore: action.bound,
            findFactionLore: action.bound,
            findHistoryLore: action.bound
        })
    }

    componentDidMount() {
        autorun(() => {
            if ( this.lore.length === 0 ) {
                this.setLore();
                runInAction(() => {
                    this.isLoading = true;
                })
            } else {
                runInAction(() => {
                    this.isLoading = false;
                })
            }
            // console.log('lore component mounted...', toJS(this.lore));
        });
    }

    static getInstance(): LorePresenter {
        if (!LorePresenter.instance) {
            LorePresenter.instance = new LorePresenter();
        }
        return LorePresenter.instance;
    }

    setLore(): LoreMetadata[] {
        this.lore = Lore
        this.isFetchComplete = true;
        return this.lore;
    }

    findLore(lore: string): void {
        // console.log('lore data being passed in...', lore);
        const loreLowerCase = lore.toLowerCase();

        if (loreLowerCase.includes('faction')
            || loreLowerCase.includes('mud')
            || loreLowerCase.includes('ustur')
            || loreLowerCase.includes('oni')) {
            this.findFactionLore(lore);
        }

        if ( loreLowerCase.includes('history')
            || loreLowerCase.includes('war')
            || loreLowerCase.includes('iris')
            || loreLowerCase.includes('story')) {
            this.findHistoryLore(lore);
        }
    }

    findFactionLore(lore: string): void {
        const loreFactionData = this.lore.find((lore) => lore.metadata);

        if (lore.toLowerCase().includes('mud')) {
            this.loreAnalysis = loreFactionData?.metadata[0].factions[0].MUD[0].lore!;
            this.loreName = loreFactionData?.metadata[0].factions[0].MUD[0].name!;
        } else if (lore.toLowerCase().includes('ustur')) {
            this.loreAnalysis = loreFactionData?.metadata[0].factions[1].USTUR[0].lore!;
            this.loreName = loreFactionData?.metadata[0].factions[1].USTUR[0].name!;
        } else if (lore.toLowerCase().includes('oni')) {
            this.loreAnalysis = loreFactionData?.metadata[0].factions[2].ONI[0].lore!;
            this.loreName = loreFactionData?.metadata[0].factions[2].ONI[0].name!;
        }
    }

    findHistoryLore(lore: string): void {
        const loreHistoryData = this.lore.find((lore) => lore.metadata);
        const loreLowerCase = lore.toLowerCase();
        if (loreLowerCase.includes('history') || loreLowerCase.includes('iris')) {
            this.loreAnalysis = loreHistoryData?.metadata[0].history[0].Cataclysm!;
            this.loreName = loreHistoryData?.metadata[0].history[0].Name!;
        } else if (loreLowerCase.includes('war')) {
            this.loreAnalysis = loreHistoryData?.metadata[0].history[1].War!;
            this.loreName = loreHistoryData?.metadata[0].history[1].Name!;
        } else if (loreLowerCase.includes('exploration')) {
            this.loreAnalysis = loreHistoryData?.metadata[0].history[2].Exploration!;
            this.loreName = loreHistoryData?.metadata[0].history[2].Name!;
        } else if (loreLowerCase.includes('future')) {
            this.loreAnalysis = loreHistoryData?.metadata[0].history[3].Future!;
            this.loreName = loreHistoryData?.metadata[0].history[3].Name!;
        }
    }
}
