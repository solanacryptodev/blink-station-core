import {
    LoreMetadata,
    LoreData,
    FactionLore,
    HistoryLore,
    LocationLore,
    SpeciesLore,
    GovernmentLore
} from "@/lib/lore-metadata";
import { makeObservable } from "mobx";
import { singleton } from "tsyringe";

@singleton()
export class LorePresenter {
    private static instance: LorePresenter | null = null;
    private readonly loreData: LoreMetadata[];

    constructor(loreData: LoreMetadata[]) {
        this.loreData = loreData;
        makeObservable(this, {});
    }

    static getInstance(loreData: LoreMetadata[]): LorePresenter {
        if (!LorePresenter.instance) {
            LorePresenter.instance = new LorePresenter(loreData);
        }
        return LorePresenter.instance;
    }

    async findLore(query: string): Promise<LoreData[]> {
        const lowerQuery = query.toLowerCase();
        // console.log('Query:', lowerQuery);
        const results: LoreData[] = [];

        for (const lore of this.loreData) {
            for (const metadataItem of lore.metadata) {
                results.push(...this.searchFactions(lowerQuery, metadataItem.factions));
                results.push(...this.searchHistory(lowerQuery, metadataItem.history));
                results.push(...this.searchLocations(lowerQuery, metadataItem.locations));
                results.push(...this.searchSpecies(lowerQuery, metadataItem.species));
                results.push(...this.searchGovernment(lowerQuery, metadataItem.government));
            }
        }

        return results;
    }

    private searchFactions(query: string, factions: FactionLore[]): LoreData[] {
        const results: LoreData[] = [];
        for (const faction of factions) {
            for (const [factionName, factionData] of Object.entries(faction)) {
                if (query.includes(factionName.toLowerCase())) {
                    results.push({
                        loreName: factionData[0].name,
                        loreAnalysis: factionData[0].lore
                    });
                }
            }
        }
        return results;
    }

    private searchLocations(query: string, locations: LocationLore[]): LoreData[] {
        const results: LoreData[] = [];
        for (const location of locations) {
            for (const [locationName, locationData] of Object.entries(location)) {
                if (query.includes(locationName.toLowerCase())) {
                    results.push({
                        loreName: locationData[0].locationName,
                        loreAnalysis: locationData[0].locationLore,
                        loreExtras: locationData[0].locationType
                    });
                }
            }
        }
        return results;
    }

    private searchSpecies(query: string, species: SpeciesLore[]): LoreData[] {
        const results: LoreData[] = [];
        for (const specie of species) {
            for (const [speciesName, speciesData] of Object.entries(specie)) {
                if (query.includes(speciesName.toLowerCase())) {
                    results.push({
                        loreName: speciesData[0].speciesName,
                        loreAnalysis: speciesData[0].speciesLore,
                    });
                }
            }
        }
        return results;
    }

    private searchGovernment(query: string, governments: GovernmentLore[]): LoreData[] {
        const results: LoreData[] = [];
        for (const government of governments) {
            for (const [governmentName, governmentData] of Object.entries(government)) {
                if (query.includes(governmentName.toLowerCase())) {
                    results.push({
                        loreName: governmentData[0].governmentName,
                        loreAnalysis: governmentData[0].governmentLore,
                    });
                }
            }
        }
        return results;
    }

    private searchHistory(query: string, history: HistoryLore[]): LoreData[] {
        const results: LoreData[] = [];
        for (const historyItem of history) {
            const itemKey = Object.keys(historyItem).find(key => key !== 'Name') as keyof HistoryLore;
            if (query.includes(itemKey.toLowerCase()) || this.matchesHistoryKeywords(query, itemKey)) {
                results.push({
                    loreName: historyItem.Name,
                    loreAnalysis: historyItem[itemKey] as string
                });
            }
        }
        return results;
    }

    private matchesHistoryKeywords(query: string, itemName: string): boolean {
        const keywordMap: { [key: string]: string[] } = {
            'Cataclysm': ['history', 'iris', 'story', 'galia', 'expanse'],
            'War': ['war'],
            'Exploration': ['exploration'],
            'Future': ['future']
        };
        return keywordMap[itemName]?.some(keyword => query.includes(keyword)) || false;
    }
}
