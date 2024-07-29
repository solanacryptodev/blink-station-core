const shdwStorageAcct = process.env.SHDW_STORAGE_ACCT!;

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
