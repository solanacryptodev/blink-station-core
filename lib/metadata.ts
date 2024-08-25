import { ExamplePrompts } from "@/lib/types";

const shdwStorageAcct = process.env.NEXT_PUBLIC_SHDW!;

export interface AtlassonProfile {
    name: string
    description: string
}

export interface LoreMetadata {
    name: string;
    description: string;
    metadata: [
        {
            factions: [
                {
                    MUD: [
                        {
                            name: string,
                            lore: string
                        }
                    ]
                },
                {
                    USTUR: [
                        {
                            name: string,
                            lore: string
                        }
                    ]
                },
                {
                    ONI: [
                        {
                            name: string,
                            lore: string
                        }
                    ]
                },
                {
                    JORVIK: [
                        {
                            name: string,
                            lore: string
                        }
                    ]
                },
                {
                    ECOS: [
                        {
                            name: string,
                            lore: string
                        }
                    ]
                },
                {
                    TUFA: [
                        {
                            name: string,
                            lore: string
                        }
                    ]
                },
                {
                    PHOTOLI: [
                        {
                            name: string,
                            lore: string
                        }
                    ]
                }
            ];
            history: [
                {
                    Name: string
                    Cataclysm: string
                },
                {
                    Name: string
                    War: string
                },
                {
                    Name: string
                    Exploration: string
                },
                {
                    Name: string
                    Future: string
                }
            ],
            locations: [
                {
                    Outpost39: [
                        {
                            Name: string
                            Description: string
                        }
                    ]
                },
            ]
        }
    ];
}

export interface AssetMetadata {
    name: string;
    param: string;
    image: string;
    mint: string;
    class?: string;
    atlasOnly?: boolean;
}

export const exampleMessages: ExamplePrompts[] = [
    {
        heading: 'Generate a blink',
        subheading: 'for the Fimbul Lowbie.',
        message: `Generate a blink for the Fimbul Lowbie.`
    },
    {
        heading: 'Could you provide an',
        subheading: 'asset analysis for Carbon',
        message: 'Could you provide an asset analysis for Carbon?'
    },
    {
        heading: 'Tell me about the history of',
        subheading: 'the Galia Expanse.',
        message: `Tell me about the history of the Galia Expanse.`
    },
    {
        heading: 'How many hostile sectors',
        subheading: `and allied sectors are there?`,
        message: `How many hostile sectors and allied sectors are there?`
    }
]

export const assets: AssetMetadata[] = [
    {
        name: 'Armstrong IMP Tip',
        param: 'armstrongimptip',
        image: ``,
        mint: 'DTbNmLWfu1pm4AuXRKYTApnDNfxMz73VET7nW5wizG5t',
        class: 'small',
        atlasOnly: false
    },
    {
        name: 'Busan Thrill of Life',
        param: 'busanthrilloflife',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/thrilloflife.png`,
        mint: 'FTk1E5UoWkiZEUttCWSYYaVokxWNNp3yJ42HbNDCAkdt',
        class: 'small',
        atlasOnly: false
    },
    {
        name: 'Pearce X4',
        param: 'pearcex4',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/pearceX4.png`,
        mint: '2iMhgB4pbdKvwJHVyitpvX5z1NBNypFonUgaSAt9dtDt',
        class: 'xx-small',
        atlasOnly: false
    },
    {
        name: 'Pearce X5',
        param: 'pearcex5',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/pearcex5.png`,
        mint: '267DbhCypYzvTqv72ZG5UKHeFu56qXFsuoz3rw832eC5',
        class: 'x-small',
        atlasOnly: false
    },
    {
        name: 'Pearce R8',
        param: 'pearcer8',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/pearcer8.png`,
        mint: '2bCgKTo11QayWBy6QryHZMqZL2ZgWd5LEAZKiTGQi4g7',
        class: 'large',
        atlasOnly: false
    },
    {
        name: 'Pearce X6',
        param: 'pearcex6',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/pearcex6.png`,
        mint: '8RveLFEyteyL1vbCKPQJxjf3JT1ACyrzs46TXbJStrHG',
        class: 'small',
        atlasOnly: false
    },
    {
        name: 'Pearce R6',
        param: 'pearcer6',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/pearcer6.png`,
        mint: 'Fys8J53cquYsg5zYfeZStVGNwM9FopFw8QFkiE9CCR1J',
        class: 'small',
        atlasOnly: false
    },
    {
        name: 'Rainbow Chi',
        param: 'rainbowchi',
        image: `https://shdw-drive.genesysgo.net/${ shdwStorageAcct }/chi.png`,
        mint: 'DsJHgpnNovjJ981QJJnqMggexAekNawbSavfV1QuTpis',
        class: 'small',
        atlasOnly: false
    },
    {
        name: 'Tufa Feist',
        param: 'tufafeist',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/tufafeist.png`,
        mint: 'HsdbLvZrEgN2ZhsrZs5ag4F2FNFCHjjuXPfbVAhkeJBZ',
        class: 'small',
        atlasOnly: false
    },
    {
        name: 'Opal Jet',
        param: 'opaljet',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/opaljet.png`,
        mint: 'Ev3xUhc1Leqi4qR2E5VoG9pcxCvHHmnAaSRVPg485xAT',
        class: 'xx-small',
        atlasOnly: false
    },
    {
        name: 'Opal Jetjet',
        param: 'opaljetjet',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/opaljetjet.png`,
        mint: '9ABNesWj7NVdkDgko7UjVaDp5pTh8a6wfXHLWz3bZM6W',
        class: 'x-small',
        atlasOnly: false
    },
    {
        name: 'Opal Rayfam',
        param: 'opalrayfam',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/OpalLogo.png`,
        mint: 'RaYfM1RLfxQJWF8RZravTshKj1aHaWBNXF94VWToY9n',
        class: 'small',
        atlasOnly: false
    },
    {
        name: 'Calico Medtech',
        param: 'calicomedtech',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/Medtech.png`,
        mint: '4gR3ChfdQxR4BTbgeWSdf6b8kD8Ysu6WBAQqtJ9oLgbF',
        class: 'small',
        atlasOnly: false
    },
    {
        name: 'Calico Shipit',
        param: 'calicoshipit',
        image: ``,
        mint: 'SHiPitEZcCoyXEKqw9ovCdYeNzck9uVbb1KCcsHaGhc',
        class: 'small',
        atlasOnly: false
    },
    {
        name: 'Calico Scud',
        param: 'calicoscud',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/calicoscud.png`,
        mint: 'F3HitKsp52UPqBMEWSeTFqrGgnfYbS9DMrJCz9dM3w6D',
        class: 'x-small',
        atlasOnly: false
    },
    {
        name: 'Calico ATS Enforcer',
        param: 'calicoatsenforcer',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/calicoatsenforcer.png`,
        mint: '2XYd22LSFGxN7kWgoEeaXVZqgrsPeQLHLEgNhnS12Mny',
        class: 'medium',
        atlasOnly: false
    },
    {
        name: 'Calico Compakt Hero',
        param: 'calicocompakthero',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/calicocompakthero.png`,
        mint: 'AkNbg12E9PatjkiAWJ3tAbM479gtcoA1gi6Joa925WKi',
        class: 'medium',
        atlasOnly: false
    },
    {
        name: 'Calico Maxhog',
        param: 'calicomaxhog',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/calicomaxhog%20(1).png`,
        mint: 'GxpbUDxYYvxiUejHcAMzeV2rzdHf6KZZvT86ACrpFgXa',
        class: 'x-small',
        atlasOnly: false
    },
    {
        name: 'Fimbul Lowbie',
        param: 'fimbullowbie',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/fimbullowbie.png`,
        mint: '7Xs3yt9eJPuEexZrKSGVbQMXHwWUKHGeDZnM4ZksZmyS',
        class: 'x-small',
        atlasOnly: false
    },
    {
        name: 'Fimbul Airbike',
        param: 'fimbulairbike',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/fimbulairbike.png`,
        mint: 'Fw8PqtznYtg4swMk7Yjj89Tsj23u5CJLfW5Bk8ro4G1s',
        class: 'xx-small',
        atlasOnly: false
    },
    {
        name: 'Fimbul ECOS Unibomba',
        param: 'fimbulecosunibomba',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/unibomba.png`,
        mint: '9zrgra3XQkZPt8XNs4fowbqmj7B8bBx76aEmsKSnm9BW',
        class: 'xx-small',
        atlasOnly: false
    },
    {
        name: 'Fimbul BYOS Earp',
        param: 'fimbulyosearp',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/earp.png`,
        mint: '6SqLuwHNRC1qjo9KATLKJLszFHMWyYaNxDXraCEUtfdR',
        class: 'small',
        atlasOnly: false
    },
    {
        name: 'Ogrika Ruch',
        param: 'ogrikaruch',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/OgrikaLogo.png`,
        mint: 'RUCHH4AcvodBcndmcT17KUBbd5ee5LQtmpsfvBVNnPH',
        class: 'xx-small',
        atlasOnly: false
    },
    {
        name: 'Ogrika Niruch',
        param: 'ogrikaniruch',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/OgrikaLogo.png`,
        mint: '7SUoWHWWJCxCe5g9XqZkCRufGHXRV8nauuz69HPjuewr',
        class: 'x-small',
        atlasOnly: false
    },
    {
        name: 'Ogrika Mik',
        param: 'ogrikamik',
        image: `https://shdw-drive.genesysgo.net/${ shdwStorageAcct }/mik.png`,
        mint: 'FMHHwUB6amLWYhWxtiZHC2g5azy9usPTLMq46N3HEgFU',
        class: 'small',
        atlasOnly: false
    },
    {
        name: 'VZUS solos',
        param: 'vzussolos',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/vzussolos.png`,
        mint: 'HjFijcGWKgfDwGpFX2rqFwEU9jtEgFuRQAJe1ERXFsA3',
        class: 'xx-small',
        atlasOnly: false
    },
    {
        name: 'VZUS ambwe',
        param: 'vzusambwe',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/ambwe.png`,
        mint: 'H2jHqvXA2oxSpEp6dKkpK7WeszQEdFW5n25mNfrJFAc1',
        class: 'small',
        atlasOnly: false
    },
    {
        name: 'Ammunition',
        param: 'ammunition',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/ammunition.png`,
        mint: 'ammoK8AkX2wnebQb35cDAZtTkvsXQbi82cGeTnUvvfK',
        class: 'consumable',
        atlasOnly: true
    },
    {
        name: 'Carbon',
        param: 'carbon',
        image: '',
        mint: 'CARBWKWvxEuMcq3MqCxYfi7UoFVpL9c4rsQS99tw6i4X',
        class: 'raw material',
        atlasOnly: true
    },
    {
        name: 'Steel',
        param: 'steel',
        image: '',
        mint: 'STEELXLJ8nfJy3P4aNuGxyNRbWPohqHSwxY75NsJRGG',
        class: 'compound material',
        atlasOnly: true
    }
]
