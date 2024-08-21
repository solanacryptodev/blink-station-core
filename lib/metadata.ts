const shdwStorageAcct = process.env.SHDW_STORAGE_ACCT!;

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
}

export const assets: AssetMetadata[] = [
    {
        name: 'Armstrong IMP Tip',
        param: 'armstrongimptip',
        image: ``,
        mint: 'DTbNmLWfu1pm4AuXRKYTApnDNfxMz73VET7nW5wizG5t',
        class: 'small'
    },
    {
        name: 'Busan Thrill of Life',
        param: 'busanthrilloflife',
        image: ``,
        mint: 'FTk1E5UoWkiZEUttCWSYYaVokxWNNp3yJ42HbNDCAkdt',
        class: 'small'
    },
    {
        name: 'Pearce X4',
        param: 'pearcex4',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/pearceX4.png`,
        mint: '2iMhgB4pbdKvwJHVyitpvX5z1NBNypFonUgaSAt9dtDt',
        class: 'xx-small'
    },
    {
        name: 'Pearce X5',
        param: 'pearcex5',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/pearcex5.png`,
        mint: '267DbhCypYzvTqv72ZG5UKHeFu56qXFsuoz3rw832eC5',
        class: 'x-small'
    },
    {
        name: 'Pearce R8',
        param: 'pearcer8',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/pearcer8.png`,
        mint: '2bCgKTo11QayWBy6QryHZMqZL2ZgWd5LEAZKiTGQi4g7',
        class: 'large'
    },
    {
        name: 'Pearce X6',
        param: 'pearcex6',
        image: ``,
        mint: '8RveLFEyteyL1vbCKPQJxjf3JT1ACyrzs46TXbJStrHG',
        class: 'small'
    },
    {
        name: 'Pearce R6',
        param: 'pearcer6',
        image: ``,
        mint: 'Fys8J53cquYsg5zYfeZStVGNwM9FopFw8QFkiE9CCR1J',
        class: 'small'
    },
    {
        name: 'Rainbow Chi',
        param: 'rainbowchi',
        image: ``,
        mint: 'DsJHgpnNovjJ981QJJnqMggexAekNawbSavfV1QuTpis',
        class: 'small'
    },
    {
        name: 'Tufa Feist',
        param: 'tufafeist',
        image: ``,
        mint: 'HsdbLvZrEgN2ZhsrZs5ag4F2FNFCHjjuXPfbVAhkeJBZ',
        class: 'small'
    },
    {
        name: 'Opal Jet',
        param: 'opaljet',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/opaljet.png`,
        mint: 'Ev3xUhc1Leqi4qR2E5VoG9pcxCvHHmnAaSRVPg485xAT',
        class: 'xx-small'
    },
    {
        name: 'Opal Jetjet',
        param: 'opaljetjet',
        image: ``,
        mint: '9ABNesWj7NVdkDgko7UjVaDp5pTh8a6wfXHLWz3bZM6W',
        class: 'x-small'
    },
    {
        name: 'Opal Rayfam',
        param: 'opalrayfam',
        image: ``,
        mint: 'RaYfM1RLfxQJWF8RZravTshKj1aHaWBNXF94VWToY9n',
        class: 'small'
    },
    {
        name: 'Calico Medtech',
        param: 'calicomedtech',
        image: ``,
        mint: '4gR3ChfdQxR4BTbgeWSdf6b8kD8Ysu6WBAQqtJ9oLgbF',
        class: 'small'
    },
    {
        name: 'Calico Shipit',
        param: 'calicoshipit',
        image: ``,
        mint: 'SHiPitEZcCoyXEKqw9ovCdYeNzck9uVbb1KCcsHaGhc',
        class: 'small'
    },
    {
        name: 'Calico Scud',
        param: 'calicoscud',
        image: ``,
        mint: 'F3HitKsp52UPqBMEWSeTFqrGgnfYbS9DMrJCz9dM3w6D',
        class: 'x-small'
    },
    {
        name: 'Calico ATS Enforcer',
        param: 'calicoatsenforcer',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/calicoatsenforcer.png`,
        mint: '2XYd22LSFGxN7kWgoEeaXVZqgrsPeQLHLEgNhnS12Mny',
        class: 'medium'
    },
    {
        name: 'Calico Maxhog',
        param: 'calicomaxhog',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/calicomaxhog%20(1).png`,
        mint: 'GxpbUDxYYvxiUejHcAMzeV2rzdHf6KZZvT86ACrpFgXa',
        class: 'x-small'
    },
    {
        name: 'Fimbul Lowbie',
        param: 'fimbullowbie',
        image: ``,
        mint: '7Xs3yt9eJPuEexZrKSGVbQMXHwWUKHGeDZnM4ZksZmyS',
        class: 'x-small'
    },
    {
        name: 'Fimbul Airbike',
        param: 'fimbulairbike',
        image: ``,
        mint: 'Fw8PqtznYtg4swMk7Yjj89Tsj23u5CJLfW5Bk8ro4G1s',
        class: 'xx-small'
    },
    {
        name: 'Fimbul ECOS Unibomba',
        param: 'fimbulecosunibomba',
        image: ``,
        mint: '9zrgra3XQkZPt8XNs4fowbqmj7B8bBx76aEmsKSnm9BW',
        class: 'xx-small'
    },
    {
        name: 'Fimbul BYOS Earp',
        param: 'fimbulyosearp',
        image: ``,
        mint: '6SqLuwHNRC1qjo9KATLKJLszFHMWyYaNxDXraCEUtfdR',
    },
    {
        name: 'Ogrika Ruch',
        param: 'ogrikaruch',
        image: ``,
        mint: 'RUCHH4AcvodBcndmcT17KUBbd5ee5LQtmpsfvBVNnPH',
        class: 'xx-small'
    },
    {
        name: 'Ogrika Niruch',
        param: 'ogrikaniruch',
        image: ``,
        mint: '7SUoWHWWJCxCe5g9XqZkCRufGHXRV8nauuz69HPjuewr',
        class: 'x-small'
    },
    {
        name: 'Ogrika Mik',
        param: 'ogrikamik',
        image: ``,
        mint: 'FMHHwUB6amLWYhWxtiZHC2g5azy9usPTLMq46N3HEgFU',
        class: 'small'
    },
    {
        name: 'VZUS solos',
        param: 'vzussolos',
        image: ``,
        mint: 'HjFijcGWKgfDwGpFX2rqFwEU9jtEgFuRQAJe1ERXFsA3',
        class: 'xx-small'
    },
    {
        name: 'VZUS ambwe',
        param: 'vzusambwe',
        image: ``,
        mint: 'H2jHqvXA2oxSpEp6dKkpK7WeszQEdFW5n25mNfrJFAc1',
        class: 'small'
    },
    {
        name: 'Ammunition',
        param: 'ammunition',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/ammunition.png`,
        mint: 'ammoK8AkX2wnebQb35cDAZtTkvsXQbi82cGeTnUvvfK',
        class: 'consumable'
    },
    {
        name: 'Carbon',
        param: 'carbon',
        image: '',
        mint: 'CARBWKWvxEuMcq3MqCxYfi7UoFVpL9c4rsQS99tw6i4X',
        class: 'raw material'
    },
    {
        name: 'Steel',
        param: 'steel',
        image: '',
        mint: 'STEELXLJ8nfJy3P4aNuGxyNRbWPohqHSwxY75NsJRGG',
        class: 'compound material'
    }
]
