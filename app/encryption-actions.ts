'use server'

import { SHA256, AES, enc } from 'crypto-js';
import { formatDate } from "@/lib/utils";
import { updateSubscription } from '@/app/db-actions';

function encryptApiKey(apiKey: string, publicKey: string): string {
    // Use the public key as the encryption key
    const encryptionKey = SHA256(publicKey).toString();

    // Encrypt the API key
    return AES.encrypt( apiKey, encryptionKey ).toString();
}

export async function decryptApiKey(encryptedApiKey: string, publicKey: string): Promise<string> {
    // Use the public key as the decryption key
    const decryptionKey = SHA256(publicKey).toString();

    // Decrypt the API key
    const decrypted = AES.decrypt(encryptedApiKey, decryptionKey);

    return decrypted.toString(enc.Utf8);
}

export async function storeEncryptedApiKey(publicKey: string, apiKey: string): Promise<number> {
    const encryptedApiKey = encryptApiKey(apiKey, publicKey);
    let result = 0;

    // Store in database
    try {
        result = await updateSubscription(publicKey, {
            key: encryptedApiKey,
            lastSeenOn: formatDate(new Date())
        });
        console.log('result');
        return result;
    } catch ( error ) {
        console.log('database error:', error);
    }

    return result;
}
