import { ExamplePrompts } from "@/lib/types";

const shdwStorageAcct = process.env.NEXT_PUBLIC_SHDW!;

export interface AtlassonProfile {
    name: string
    description: string
}

export interface LoreData {
    loreName: string;
    loreAnalysis: string;
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
    isResource?: boolean;
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
        name: 'Armstrong IMP',
        param: 'armstrongimp',
        image: ``,
        mint: 'GmVKV9W3qZcERxk7hjqwRDcn9Kgtz3XDi7KfFLdGqyaW',
        class: 'capital',
        atlasOnly: false
    },
    {
        name: 'Armstrong IMP Tap',
        param: 'armstrongimptap',
        image: ``,
        mint: 'ARNZXUQoBKx3JCX3UJB4aitSnvcjMMphN9YVDFy1PdKq',
        class: 'medium',
        atlasOnly: false
    },
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
        name: 'Busan Maiden Heart',
        param: 'busanmaidenheart',
        image: ``,
        mint: '6HzZJwrcuBBmrE7SLDfxheZGAD3NYJ531C9JsNesL9BP',
        class: 'capital',
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
        name: 'Pearce F4',
        param: 'pearcef4',
        image: ``,
        mint: '9MvZS3TVfv4DZL9W2pT12po384aBHf7wi89KXQ9Z7uwW',
        class: 'medium',
        atlasOnly: false
    },
    {
        name: 'Pearce C9',
        param: 'pearcec9',
        image: ``,
        mint: '5f1jUARhtSypVA4uTpgpLp76WYGdB2dGr8zMbh4WjYRf',
        class: 'capital',
        atlasOnly: false
    },
    {
        name: 'Pearce D9',
        param: 'pearced9',
        image: ``,
        mint: 'H3cgBXWpUiNsYjUWS7cNR5Bmehh7k5CgpJccc5wSfRbJ',
        class: 'capital',
        atlasOnly: false
    },
    {
        name: 'Pearce C11',
        param: 'pearcec11',
        image: ``,
        mint: '9ifQ16N5DdUFoejCwsgR73ihUwadAe3srCo9HhQe2zL2',
        class: 'commander',
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
        name: 'Rainbow Om',
        param: 'rainbowom',
        image: ``,
        mint: 'HzBx8PP86pyPrrboTHqPYWhxnEB5vXDHDBP8femWfPTS',
        class: 'medium',
        atlasOnly: false
    },
    {
        name: 'Rainbow Arc',
        param: 'rainbowarc',
        image: ``,
        mint: 'EbLBLN44BVLjifLNBbchXFr8QjEkAGYENKuNEaDuyVPL',
        class: 'large',
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
        name: 'Opal Bitboat',
        param: 'opalbitboat',
        image: ``,
        mint: '8pPDsMNcz4m8jaajFMFXHGcvaeVeiQhcenvSD6a4XNyq',
        class: 'large',
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
        name: 'Calico Evac',
        param: 'calicoevac',
        image:  ``,
        mint: '4txpjHspP4usEsQTr3AcrpyHVjN4fi3d4taM6cmKJnd1',
        class: 'medium',
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
        name: 'Calico Guardian',
        param: 'calicoguardian',
        image: ``,
        mint: 'DdpXnnYsyUQgJby8TDHbmPwkKyGF4U6bXwCXTQZsrfKP',
        class: 'capital',
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
        name: 'Fimbul ECOS Greenader',
        param: 'fimbulecosgreenader',
        image: ``,
        mint: 'FpwV1Da6BZJnYPr1JSLUm14UwBmZHA7J5WLY4TXgbde8',
        class: 'large',
        atlasOnly: false
    },
    {
        name: 'Fimbul ECOS Bombarella',
        param: 'fimbulecosbombarella',
        image: ``,
        mint: '7M6RHgPiHXiZAin5ManH63cLYGt3miQ54KaGynUQoERS',
        class: 'capital',
        atlasOnly: false
    },
    {
        name: 'Fimbul ECOS Treearrow',
        param: 'fimbulecostreearrow',
        image: ``,
        mint: 'HqPN13pLUVJRiuGSsKjfWZvGKAagK98PshuKu51bnG4E',
        class: 'commander',
        atlasOnly: false
    },
    {
        name: 'Fimbul Sledbarge',
        param: 'fimbulsledbarge',
        image: ``,
        mint: 'SLEDkN916vvcpucY9Vn7tAzNXRcxsq71kkXzaj1cxoX',
        class: 'capital',
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
        name: 'Fimbul BYOS Butch',
        param: 'fimbulbyosbutch',
        image: ``,
        mint: 'BBUTCn3jcXKjFYuuYtY8MNo8bDg9VsZaKwaSYnRr2Qse',
        class: 'large',
        atlasOnly: false
    },
    {
        name: 'Fimbul BYOS Packlite',
        param: 'fimbulbyospacklite',
        image: ``,
        mint: '7V9C2XUQgCb31n7hGKqKGu4ENcvqXhJLJzU77CAQtXhw',
        class: 'medium',
        atlasOnly: false
    },
    {
        name: 'Fimbul BYOS Ranger',
        param: 'fimbulbyosranger',
        image: ``,
        mint: 'RNGRjeGyFeyFT4k5aTJXKZukVx3GbG215fcSQJxg64G',
        class: 'medium',
        atlasOnly: false
    },
    {
        name: 'Fimbul BYOS Tankship',
        param: 'fimbulbyostankship',
        image: ``,
        mint: '4ns3shP4WunCtJbr2HFu31RjjxSJxDymEFcBZxiHr11s',
        class: 'commander',
        atlasOnly: false
    },
    {
        name: 'Fimbul Mamba',
        param: 'fimbulmamba',
        image: ``,
        mint: '6Zj61HuX1E7SCUCf9WsKXw1jdJCobAwK4RSjZvbv35tM',
        class: 'medium',
        atlasOnly: false
    },
    {
        name: 'Fimbul Mamba EX',
        param: 'fimbulmambaex',
        image: ``,
        mint: 'MEXfyQHowwqoTHsN6yjfeXVaxZxALUFJAHuzY8gFiUu',
        class: 'medium',
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
        name: 'Ogrika Tursic',
        param: 'ogrikatursic',
        image: ``,
        mint: 'J8Q6jYsrhhaeczyPBo9xzVyy4GpfCnJwj14LJn2HnuKp',
        class: 'medium',
        atlasOnly: false
    },
    {
        name: 'Ogrika Thripid',
        param: 'ogrikathripid',
        image: ``,
        mint: 'CWxNX9sTexuqvQefqskhP9f6AP5C8hq2VNkicRseqAT5',
        class: 'large',
        atlasOnly: false
    },
    {
        name: 'Ogrika Sunpaa',
        param: 'ogrikasunpaa',
        image: ``,
        mint: '4b4mhSySBcryzBPamw8v4xeneFRA6xTUA4JA99w6vqey',
        class: 'large',
        atlasOnly: false
    },
    {
        name: 'Ogrika Jod Asteris',
        param: 'ogrikajodasteris',
        image: ``,
        mint: 'HJBmBYyGR8z1oajAM4jiK46uobuxeJoKDYpFwzWHBvhb',
        class: 'capital',
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
        name: 'VZUS opod',
        param: 'vzusopod',
        image: ``,
        mint: '9czEqEZ4EkRt7N3HWDcw9qqwys3xRRjGdbn8Jhk8Khwj',
        class: 'medium',
        atlasOnly: false
    },
    {
        name: 'VZUS ballad',
        param: 'vzusballad',
        image: ``,
        mint: 'FFkPvwLDYuKDW9eAAr5UNfuX3U9PcTGeSk7gqNX7EpNc',
        class: 'capital',
        atlasOnly: false
    },
    {
        name: 'Ammunition',
        param: 'ammunition',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/ammunition.png`,
        mint: 'ammoK8AkX2wnebQb35cDAZtTkvsXQbi82cGeTnUvvfK',
        class: 'consumable',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Carbon',
        param: 'carbon',
        image: '',
        mint: 'CARBWKWvxEuMcq3MqCxYfi7UoFVpL9c4rsQS99tw6i4X',
        class: 'raw material',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Steel',
        param: 'steel',
        image: '',
        mint: 'STEELXLJ8nfJy3P4aNuGxyNRbWPohqHSwxY75NsJRGG',
        class: 'compound material',
        atlasOnly: true,
        isResource: true
    }
]
