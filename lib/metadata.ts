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
}

export const assets: AssetMetadata[] = [
    {
        name: 'Pearce X4',
        param: 'pearcex4',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/pearceX4.png`,
        mint: '2iMhgB4pbdKvwJHVyitpvX5z1NBNypFonUgaSAt9dtDt',
    },
    {
        name: 'Pearce X5',
        param: 'pearcex5',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/pearcex5.png`,
        mint: '267DbhCypYzvTqv72ZG5UKHeFu56qXFsuoz3rw832eC5'
    },
    {
        name: 'Pearce R8',
        param: 'pearcer8',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/pearcer8.png`,
        mint: '2bCgKTo11QayWBy6QryHZMqZL2ZgWd5LEAZKiTGQi4g7'
    },
    {
        name: 'Opal Jet',
        param: 'opaljet',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/opaljet.png`,
        mint: 'Ev3xUhc1Leqi4qR2E5VoG9pcxCvHHmnAaSRVPg485xAT'
    },
    {
        name: 'Opal Jetjet',
        param: 'opaljetjet',
        image: ``,
        mint: '9ABNesWj7NVdkDgko7UjVaDp5pTh8a6wfXHLWz3bZM6W'
    },
    {
        name: 'Calico Scud',
        param: 'calicoscud',
        image: ``,
        mint: 'F3HitKsp52UPqBMEWSeTFqrGgnfYbS9DMrJCz9dM3w6D'
    },
    {
        name: 'Calico ATS Enforcer',
        param: 'calicoatsenforcer',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/calicoatsenforcer.png`,
        mint: '2XYd22LSFGxN7kWgoEeaXVZqgrsPeQLHLEgNhnS12Mny'
    },
    {
        name: 'Calico Maxhog',
        param: 'calicomaxhog',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/calicomaxhog%20(1).png`,
        mint: 'GxpbUDxYYvxiUejHcAMzeV2rzdHf6KZZvT86ACrpFgXa',
    },
    {
        name: 'Fimbul Lowbie',
        param: 'fimbullowbie',
        image: ``,
        mint: '7Xs3yt9eJPuEexZrKSGVbQMXHwWUKHGeDZnM4ZksZmyS',
    },
    {
        name: 'Fimbul Airbike',
        param: 'fimbulairbike',
        image: ``,
        mint: 'Fw8PqtznYtg4swMk7Yjj89Tsj23u5CJLfW5Bk8ro4G1s',
    },
    {
        name: 'Fimbul ECOS Unibomba',
        param: 'fimbulecosunibomba',
        image: ``,
        mint: '9zrgra3XQkZPt8XNs4fowbqmj7B8bBx76aEmsKSnm9BW',
    },
    {
        name: 'Ogrika Ruch',
        param: 'ogrikaruch',
        image: ``,
        mint: 'RUCHH4AcvodBcndmcT17KUBbd5ee5LQtmpsfvBVNnPH',
    },
    {
        name: 'Ogrika Niruch',
        param: 'ogrikaniruch',
        image: ``,
        mint: '7SUoWHWWJCxCe5g9XqZkCRufGHXRV8nauuz69HPjuewr',
    },
    {
        name: 'VZUS solos',
        param: 'vzussolos',
        image: ``,
        mint: 'HjFijcGWKgfDwGpFX2rqFwEU9jtEgFuRQAJe1ERXFsA3',
    },
    {
        name: 'Ammunition',
        param: 'ammunition',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/ammunition.png`,
        mint: 'ammoK8AkX2wnebQb35cDAZtTkvsXQbi82cGeTnUvvfK'
    },
    {
        name: 'Carbon',
        param: 'carbon',
        image: '',
        mint: 'CARBWKWvxEuMcq3MqCxYfi7UoFVpL9c4rsQS99tw6i4X'
    },
    {
        name: 'Steel',
        param: 'steel',
        image: '',
        mint: ''
    }
]
