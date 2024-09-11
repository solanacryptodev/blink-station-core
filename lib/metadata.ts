import { ExamplePrompts } from "@/lib/types";

const shdwStorageAcct = process.env.NEXT_PUBLIC_SHDW!;

export interface AtlassonProfile {
    name: string
    description: string
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
        heading: 'What is the story',
        subheading: `behind the Cataclysm?`,
        message: `What is the story behind the Cataclysm?`
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
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/busanmaidenheart.png`,
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
        image: `https://shdw-drive.genesysgo.net/${ shdwStorageAcct }/pearcef4.png`,
        mint: '9MvZS3TVfv4DZL9W2pT12po384aBHf7wi89KXQ9Z7uwW',
        class: 'medium',
        atlasOnly: false
    },
    {
        name: 'Pearce C9',
        param: 'pearcec9',
        image: `https://shdw-drive.genesysgo.net/${ shdwStorageAcct }/pearcec9.png`,
        mint: '5f1jUARhtSypVA4uTpgpLp76WYGdB2dGr8zMbh4WjYRf',
        class: 'capital',
        atlasOnly: false
    },
    {
        name: 'Pearce D9',
        param: 'pearced9',
        image: `https://shdw-drive.genesysgo.net/${ shdwStorageAcct }/pearced9.png`,
        mint: 'H3cgBXWpUiNsYjUWS7cNR5Bmehh7k5CgpJccc5wSfRbJ',
        class: 'capital',
        atlasOnly: false
    },
    {
        name: 'Pearce C11',
        param: 'pearcec11',
        image: `https://shdw-drive.genesysgo.net/${ shdwStorageAcct }/pearcec11.png`,
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
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/rainbowom.png`,
        mint: 'HzBx8PP86pyPrrboTHqPYWhxnEB5vXDHDBP8femWfPTS',
        class: 'medium',
        atlasOnly: false
    },
    {
        name: 'Rainbow Arc',
        param: 'rainbowarc',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/rainbowarc.png`,
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
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/bitboat.png`,
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
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/CalicoLogo.png`,
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
        image:  `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/calicoevac.png`,
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
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/calicoguardian.png`,
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
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/greenader.png`,
        mint: 'FpwV1Da6BZJnYPr1JSLUm14UwBmZHA7J5WLY4TXgbde8',
        class: 'large',
        atlasOnly: false
    },
    {
        name: 'Fimbul ECOS Bombarella',
        param: 'fimbulecosbombarella',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/bombarella.png`,
        mint: '7M6RHgPiHXiZAin5ManH63cLYGt3miQ54KaGynUQoERS',
        class: 'capital',
        atlasOnly: false
    },
    {
        name: 'Fimbul ECOS Treearrow',
        param: 'fimbulecostreearrow',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/treearrow.png`,
        mint: 'HqPN13pLUVJRiuGSsKjfWZvGKAagK98PshuKu51bnG4E',
        class: 'commander',
        atlasOnly: false
    },
    {
        name: 'Fimbul Sledbarge',
        param: 'fimbulsledbarge',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/FimbulLogo.png`,
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
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/FimbulLogo.png`,
        mint: 'BBUTCn3jcXKjFYuuYtY8MNo8bDg9VsZaKwaSYnRr2Qse',
        class: 'large',
        atlasOnly: false
    },
    {
        name: 'Fimbul BYOS Packlite',
        param: 'fimbulbyospacklite',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/packlite.png`,
        mint: '7V9C2XUQgCb31n7hGKqKGu4ENcvqXhJLJzU77CAQtXhw',
        class: 'medium',
        atlasOnly: false
    },
    {
        name: 'Fimbul BYOS Ranger',
        param: 'fimbulbyosranger',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/FimbulLogo.png`,
        mint: 'RNGRjeGyFeyFT4k5aTJXKZukVx3GbG215fcSQJxg64G',
        class: 'medium',
        atlasOnly: false
    },
    {
        name: 'Fimbul BYOS Tankship',
        param: 'fimbulbyostankship',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/tankship.png`,
        mint: '4ns3shP4WunCtJbr2HFu31RjjxSJxDymEFcBZxiHr11s',
        class: 'commander',
        atlasOnly: false
    },
    {
        name: 'Fimbul Mamba',
        param: 'fimbulmamba',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/mamba.png`,
        mint: '6Zj61HuX1E7SCUCf9WsKXw1jdJCobAwK4RSjZvbv35tM',
        class: 'medium',
        atlasOnly: false
    },
    {
        name: 'Fimbul Mamba EX',
        param: 'fimbulmambaex',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/FimbulLogo.png`,
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
        atlasOnly: false,
        isResource: false
    },
    {
        name: 'Ogrika Tursic',
        param: 'ogrikatursic',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/tursic.png`,
        mint: 'J8Q6jYsrhhaeczyPBo9xzVyy4GpfCnJwj14LJn2HnuKp',
        class: 'medium',
        atlasOnly: false,
        isResource: false
    },
    {
        name: 'Ogrika Thripid',
        param: 'ogrikathripid',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/thripid.png`,
        mint: 'CWxNX9sTexuqvQefqskhP9f6AP5C8hq2VNkicRseqAT5',
        class: 'large',
        atlasOnly: false,
        isResource: false
    },
    {
        name: 'Ogrika Sunpaa',
        param: 'ogrikasunpaa',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/sunpaa.png`,
        mint: '4b4mhSySBcryzBPamw8v4xeneFRA6xTUA4JA99w6vqey',
        class: 'large',
        atlasOnly: false,
        isResource: false
    },
    {
        name: 'Ogrika Jod Asteris',
        param: 'ogrikajodasteris',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/jodasteris.png`,
        mint: 'HJBmBYyGR8z1oajAM4jiK46uobuxeJoKDYpFwzWHBvhb',
        class: 'capital',
        atlasOnly: false,
        isResource: false
    },
    {
        name: 'VZUS solos',
        param: 'vzussolos',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/vzussolos.png`,
        mint: 'HjFijcGWKgfDwGpFX2rqFwEU9jtEgFuRQAJe1ERXFsA3',
        class: 'xx-small',
        atlasOnly: false,
        isResource: false
    },
    {
        name: 'VZUS ambwe',
        param: 'vzusambwe',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/ambwe.png`,
        mint: 'H2jHqvXA2oxSpEp6dKkpK7WeszQEdFW5n25mNfrJFAc1',
        class: 'small',
        atlasOnly: false,
        isResource: false
    },
    {
        name: 'VZUS opod',
        param: 'vzusopod',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/opod.png`,
        mint: '9czEqEZ4EkRt7N3HWDcw9qqwys3xRRjGdbn8Jhk8Khwj',
        class: 'medium',
        atlasOnly: false,
        isResource: false
    },
    {
        name: 'VZUS ballad',
        param: 'vzusballad',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/ballad.png`,
        mint: 'FFkPvwLDYuKDW9eAAr5UNfuX3U9PcTGeSk7gqNX7EpNc',
        class: 'capital',
        atlasOnly: false,
        isResource: false
    },
    {
        name: 'Ammunition',
        param: 'ammunition',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/ammunition.png`,
        mint: 'ammoK8AkX2wnebQb35cDAZtTkvsXQbi82cGeTnUvvfK',
        class: 'consumables',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Fuel',
        param: 'fuel',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/FUEL.png`,
        mint: 'fueL3hBZjLLLJHiFH9cqZoozTG3XQZ53diwFPwbzNim',
        class: 'consumables',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Food',
        param: 'food',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/FOOD.png`,
        mint: 'foodQJAztMzX1DKpLaiounNe2BDMds5RNuPC6jsNrDG',
        class: 'consumables',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Toolkit',
        param: 'toolkit',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/TOOL.png`,
        mint: 'tooLsNYLiVqzg8o4m3L2Uetbn62mvMWRqkog6PQeYKL',
        class: 'consumables',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Carbon',
        param: 'carbon',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'CARBWKWvxEuMcq3MqCxYfi7UoFVpL9c4rsQS99tw6i4X',
        class: 'raw material',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Arco',
        param: 'arco',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'ARCoQ9dndpg6wE2rRexzfwgJR3NoWWhpcww3xQcQLukg',
        class: 'raw material',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Biomass',
        param: 'biomass',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'MASS9GqtJz6ABisAxcUn3FeR4phMqH1XfG6LPKJePog',
        class: 'raw material',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Copper Ore',
        param: 'copperore',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'CUore1tNkiubxSwDEtLc3Ybs1xfWLs8uGjyydUYZ25xc',
        class: 'raw material',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Diamond',
        param: 'diamond',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'DMNDKqygEN3WXKVrAD4ofkYBc4CKNRhFUbXP4VK7a944',
        class: 'raw material',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Hydrogen',
        param: 'hydrogen',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'HYDR4EPHJcDPcaLYUcNCtrXUdt1PnaN4MvE655pevBYp',
        class: 'raw material',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Iron Ore',
        param: 'ironore',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'FeorejFjRRAfusN9Fg3WjEZ1dRCf74o6xwT5vDt3R34J',
        class: 'raw material',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Lumanite',
        param: 'lumanite',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'LUMACqD5LaKjs1AeuJYToybasTXoYQ7YkxJEc4jowNj',
        class: 'raw material',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Nitrogen',
        param: 'nitrogen',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'Nitro6idW5JCb2ysUPGUAvVqv3HmUR7NVH7NdybGJ4L',
        class: 'raw material',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Rochinol',
        param: 'rochinol',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'RCH1Zhg4zcSSQK8rw2s6rDMVsgBEWa4kiv1oLFndrN5',
        class: 'raw material',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Silica',
        param: 'silica',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'SiLiCA4xKGkyymB5XteUVmUeLqE4JGQTyWBpKFESLgh',
        class: 'raw material',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Titanium Ore',
        param: 'titaniumore',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'tiorehR1rLfeATZ96YoByUkvNFsBfUUSQWgSH2mizXL',
        class: 'raw material',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Steel',
        param: 'steel',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'STEELXLJ8nfJy3P4aNuGxyNRbWPohqHSwxY75NsJRGG',
        class: 'compound material',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Aerogel',
        param: 'aerogel',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'aeroBCMu6AX6bCLYd1VQtigqZh8NGSjn54H1YSczHeJ',
        class: 'compound material',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Crystal Lattice',
        param: 'crystallattice',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'CRYSNnUd7cZvVfrEVtVNKmXiCPYdZ1S5pM5qG2FDVZHF',
        class: 'compound material',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Copper Wire',
        param: 'copperwire',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'cwirGHLB2heKjCeTy4Mbp4M443fU4V7vy2JouvYbZna',
        class: 'compound material',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Copper',
        param: 'copper',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'CPPRam7wKuBkYzN5zCffgNU17RKaeMEns4ZD83BqBVNR',
        class: 'compound material',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Electronics',
        param: 'electronics',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'ELECrjC8m9GxCqcm4XCNpFvkS8fHStAvymS6MJbe3XLZ',
        class: 'compound material',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Graphene',
        param: 'graphene',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'GRAPHKGoKtXtdPBx17h6fWopdT5tLjfAP8cDJ1SvvDn4',
        class: 'compound material',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Hydrocarbon',
        param: 'hydrocarbon',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'HYCBuSWCJ5ZEyANexU94y1BaBPtAX2kzBgGD2vES2t6M',
        class: 'compound material',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Iron',
        param: 'iron',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'ironxrUhTEaBiR9Pgp6hy4qWx6V2FirDoXhsFP25GFP',
        class: 'compound material',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Magnet',
        param: 'magnet',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'MAGNMDeDJLvGAnriBvzWruZHfXNwWHhxnoNF75AQYM5',
        class: 'compound material',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Polymer',
        param: 'polymer',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'PoLYs2hbRt5iDibrkPT9e6xWuhSS45yZji5ChgJBvcB',
        class: 'compound material',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Titanium',
        param: 'titanium',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'TTNM1SMkM7VKtyPW6CNBZ4cg3An3zzQ8NVLS2HpMaWL',
        class: 'compound material',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Energy Substrate',
        param: 'energysubstrate',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'SUBSVX9LYiPrzHeg2bZrqFSDSKkrQkiCesr6SjtdHaX',
        class: 'component',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Electromagnet',
        param: 'electromagnet',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'EMAGoQSP89CJV5focVjrpEuE4CeqJ4k1DouQW7gUu7yX',
        class: 'component',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Framework',
        param: 'framework',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'FMWKb7YJA5upZHbu5FjVRRoxdDw2FYFAu284VqUGF9C2',
        class: 'component',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Field Stabilizer',
        param: 'fieldstabilizer',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'FiELD9fGaCgiNMfzQKKZD78wxwnBHTwjiiJfsieb6VGb',
        class: 'component',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Particle Accelerator',
        param: 'particleaccelerator',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'PTCLSWbwZ3mqZqHAporphY2ofio8acsastaHfoP87Dc',
        class: 'component',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Power Source',
        param: 'powersource',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'PoWRYJnw3YDSyXgNtN3mQ3TKUMoUSsLAbvE8Ejade3u',
        class: 'component',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Radiation Absorber',
        param: 'radiationabsorber',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'RABSXX6RcqJ1L5qsGY64j91pmbQVbsYRQuw1mmxhxFe',
        class: 'component',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Strange Emitter',
        param: 'strangeemitter',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'EMiTWSLgjDVkBbLFaMcGU6QqFWzX9JX6kqs1UtUjsmJA',
        class: 'component',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Super Conductor',
        param: 'superconductor',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'CoNDDRCNxXAMGscCdejioDzb6XKxSzonbWb36wzSgp5T',
        class: 'component',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Survey Data Unit',
        param: 'superconductor',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/resources_default.png`,
        mint: 'SDUsgfSZaDhhZ76U3ZgvtFiXsfnHbf2VrzYxjBZ5YbM',
        class: 'data',
        atlasOnly: true,
        isResource: true
    },
    {
        name: 'Gold 5 Card Pack',
        param: 'gold5cardpack',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/BS10CrewImage.png`,
        mint: 'CPG5JB1Z83TsYYCaVJLLpWVcoBBAnQ2T2nzmR9tbi3WU',
        class: 'crew pack',
        atlasOnly: false,
        isResource: false
    },
    {
        name: 'Gold 1 Card Pack',
        param: 'gold1cardpack',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/BS10CrewImage.png`,
        mint: 'CPG1B4jv6D2cZRkfXWawxSrE9SvhxdiDT1yKP4cNmHSe',
        class: 'crew pack',
        atlasOnly: false,
        isResource: false
    },
    {
        name: 'Presale 10 Card Pack',
        param: 'presale10cardpack',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/BS10CrewImage.png`,
        mint: 'CRWPXjZw73dMW3pG7UMhVWDrfk5NnzMCMuWj6hVLMCYm',
        class: 'crew pack',
        atlasOnly: false,
        isResource: false
    },
    {
        name: 'Platinum 1 Card Pack',
        param: 'platinum1cardpack',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/BS10CrewImage.png`,
        mint: 'CPP1iv66iqZYeGEYuGAmjTbRJMbNazCWu8r2Ln5TUsc5',
        class: 'crew pack',
        atlasOnly: false,
        isResource: false
    },
    {
        name: 'Platinum 5 Card Pack',
        param: 'platinum5cardpack',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/BS10CrewImage.png`,
        mint: 'CPP5rhCt7tvjco6vbVMawzg4WHmr3Thr67y7PcBcbfSz',
        class: 'crew pack',
        atlasOnly: false,
        isResource: false
    },
    {
        name: 'Silver 1 Card Pack',
        param: 'silver1cardpack',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/BS10CrewImage.png`,
        mint: 'CPS1gTEio7PqnAmDmWuCfiTBbtDRRsA8cwdQe3TqgGsf',
        class: 'crew pack',
        atlasOnly: false,
        isResource: false
    },
    {
        name: 'Silver 5 Card Pack',
        param: 'silver5cardpack',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/BS10CrewImage.png`,
        mint: 'CPS5deX4R2BkA1X4SRrk5V2LqmT7CXwNdnC5syrpAmDK',
        class: 'crew pack',
        atlasOnly: false,
        isResource: false
    },
    {
        name: 'Anna Tolle',
        param: 'annatolle',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/BS10CrewImage.png`,
        mint: 'HzeBiGCyGESHS3d5ndQmvz7q7Nz8Py6PV5xFjRL4cQGk',
        class: 'crew card',
        atlasOnly: false,
        isResource: false
    },
    {
        name: 'Berpek Ula Eko',
        param: 'berpekulaeko',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/BS10CrewImage.png`,
        mint: 'BErpeKhadb2H6kN8QJs977XfipH4wiVC6fdVfjW6vKRs',
        class: 'crew card',
        atlasOnly: false,
        isResource: false
    },
    {
        name: 'Gagli.doer',
        param: 'gaglidoer',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/BS10CrewImage.png`,
        mint: 'GagLi67riLvTvr6wSSrFw5AZbdVTfUPGjJ1VdBDTcZ5L',
        class: 'crew card',
        atlasOnly: false,
        isResource: false
    },
    {
        name: 'Sammy Banx',
        param: 'sammybanx',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/BS10CrewImage.png`,
        mint: 'BswdGxfurGpSKPPhHUP6d9uzdY3bAG8o3CJnFUQLanzw',
        class: 'crew card',
        atlasOnly: false,
        isResource: false
    },
    {
        name: 'Sigmund Nok',
        param: 'sigmundnok',
        image: `https://shdw-drive.genesysgo.net/${shdwStorageAcct}/BS10CrewImage.png`,
        mint: 'siGnokzWQqFQMoc1k6sEg5NeWnfnEU3Ypxb2LLnM9Sm',
        class: 'crew card',
        atlasOnly: false,
        isResource: false
    },
]
