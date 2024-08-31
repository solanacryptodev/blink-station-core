import { makeObservable } from 'mobx';
import { Lore } from '@/lib/lore/lore';
import { LoreData } from '@/lib/metadata';
import { singleton } from 'tsyringe';

@singleton()
export class LorePresenter {
    private static instance: LorePresenter | null = null;

    constructor() {

        makeObservable(this, {});
    }

    static getInstance(): LorePresenter {
        if (!LorePresenter.instance) {
            LorePresenter.instance = new LorePresenter();
        }
        return LorePresenter.instance;
    }

    async findLore(lore: string): Promise<LoreData[]>{
        // console.log('lore...', lore);
        const loreLowerCase = lore.toLowerCase();
        let loreData: LoreData = { loreName: '', loreAnalysis: '' };

        if (loreLowerCase.includes('faction')
            || loreLowerCase.includes('mud')
            || loreLowerCase.includes('ustur')
            || loreLowerCase.includes('oni')) {
            loreData = this.findFactionLore(lore);
        }

        if ( loreLowerCase.includes('history')
            || loreLowerCase.includes('war')
            || loreLowerCase.includes('iris')
            || loreLowerCase.includes('story')) {
            loreData = this.findHistoryLore(lore);
        }

        // console.log('lore data...', loreData);
        return [
            {
                loreName: loreData.loreName,
                loreAnalysis: loreData.loreAnalysis
            }
        ];
    }

    findFactionLore(lore: string): LoreData {
        const loreFactionData = Lore.find((lore) => lore.metadata);
        let factionLoreData: LoreData = { loreName: '', loreAnalysis: '' };

        if (lore.toLowerCase().includes('mud')) {
            factionLoreData.loreAnalysis = loreFactionData?.metadata[0].factions[0].MUD[0].lore!;
            factionLoreData.loreName = loreFactionData?.metadata[0].factions[0].MUD[0].name!;
        } else if (lore.toLowerCase().includes('ustur')) {
            factionLoreData.loreAnalysis = loreFactionData?.metadata[0].factions[1].USTUR[0].lore!;
            factionLoreData.loreName = loreFactionData?.metadata[0].factions[1].USTUR[0].name!;
        } else if (lore.toLowerCase().includes('oni')) {
            factionLoreData.loreAnalysis = loreFactionData?.metadata[0].factions[2].ONI[0].lore!;
            factionLoreData.loreName = loreFactionData?.metadata[0].factions[2].ONI[0].name!;
        }

        console.log('faction lore data...', factionLoreData);
        return {
            loreName: factionLoreData.loreName,
            loreAnalysis: factionLoreData.loreAnalysis
        };
    }

    findHistoryLore(lore: string): LoreData {
        const loreHistoryData = Lore.find((lore) => lore.metadata);
        const loreLowerCase = lore.toLowerCase();
        let historyLoreData: LoreData = { loreName: '', loreAnalysis: '' };

        if (loreLowerCase.includes('history') || loreLowerCase.includes('iris')) {
            historyLoreData.loreAnalysis = loreHistoryData?.metadata[0].history[0].Cataclysm!;
            historyLoreData.loreName = loreHistoryData?.metadata[0].history[0].Name!;
        } else if (loreLowerCase.includes('war')) {
            historyLoreData.loreAnalysis = loreHistoryData?.metadata[0].history[1].War!;
            historyLoreData.loreName = loreHistoryData?.metadata[0].history[1].Name!;
        } else if (loreLowerCase.includes('exploration')) {
            historyLoreData.loreAnalysis = loreHistoryData?.metadata[0].history[2].Exploration!;
            historyLoreData.loreName = loreHistoryData?.metadata[0].history[2].Name!;
        } else if (loreLowerCase.includes('future')) {
            historyLoreData.loreAnalysis = loreHistoryData?.metadata[0].history[3].Future!;
            historyLoreData.loreName = loreHistoryData?.metadata[0].history[3].Name!;
        }

        // console.log('history lore data...', historyLoreData);
        return {
            loreName: historyLoreData.loreName,
            loreAnalysis: historyLoreData.loreAnalysis
        };
    }
}
