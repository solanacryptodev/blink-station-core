export interface LoreData {
    loreName: string;
    loreAnalysis: string;
}

export interface LoreMetadata {
    name: string;
    description: string;
    metadata: [
        {
            factions: FactionLore[];
            history: HistoryLore[];
            locations: LocationLore[];
        }
    ];
}

type FactionName = 'MUD' | 'USTUR' | 'ONI' | 'JORVIK' | 'ECOS' | 'TUFA' | 'PHOTOLI';

interface FactionData {
    name: string;
    lore: string;
}

export type FactionLore = {
    [K in FactionName]: [FactionData];
};

export type HistoryLore = {
    Name: string;
} & ({
    Cataclysm: string;
} | {
    War: string;
} | {
    Exploration: string;
} | {
    Future: string;
});

interface LocationData {
    Name: string;
    Description: string;
}

export type LocationLore = {
    [locationName: string]: [LocationData];
};
