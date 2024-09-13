export interface LoreData {
    loreName: string;
    loreAnalysis: string;
    loreExtras?: string;
}

export interface LoreMetadata {
    name: string;
    description: string;
    metadata: [
        {
            factions: FactionLore[];
            history: HistoryLore[];
            locations: LocationLore[];
            // species: SpeciesLore[];
            // government: Government[];
            // ships: Ships[];
            // characters: Characters[];
        }
    ];
}

type FactionName = 'MUD' | 'USTUR' | 'ONI' | 'JORVIK' | 'ECOS' | 'TUFA' | 'PHOTOLI';
type LocationName = 'OUTPOST' | 'TENEBRA' | 'EVISCO' | 'MNI';
type SpeciesName = 'USTUR' | 'MIERESE' | 'PUNAAB' | 'PHOTOLI' | 'SOGMIAN';
type Government = 'FEDERATION' | 'ECONOMIC';
type Ships = 'MANUFACTURER' | 'CONFIGURATION';
type Characters = 'HUGH' | 'SAAND';

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
    locationType: string;
    locationName: string;
    locationLore: string;
}

export type LocationLore = {
    [K in LocationName]: [LocationData];
};

interface SpeciesData {
    speciesName: string;
    speciesLore: string;
}

export type SpeciesLore = {
    [K in SpeciesName]: [SpeciesData];
};

interface GovernmentData {
    governmentName: string;
    governmentLore: string;
}

export type GovernmentLore = {
    [K in Government]: [GovernmentData];
};
