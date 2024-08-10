import { buildConfig } from 'payload/config'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export default buildConfig({
    editor: lexicalEditor(),
    admin: {
        autoLogin: {
            email: 'solanacryptodev@protonmail.com',
            password: 'test',
            prefillOnly: true,
        },
    },
    db: mongooseAdapter({
        url: process.env.MONGOOSE_URI!,
    }),
    collections: []
})
