'use server'

import { SHA256, AES, enc } from 'crypto-js';
import { formatDate } from "@/lib/utils";
import { updateSubscription } from '@/app/db-actions';

function encryptApiKey(apiKey: string, publicKey: string): string {
    const encryptionKey = SHA256(publicKey).toString();
    return AES.encrypt(apiKey, encryptionKey).toString();
}

export async function decryptApiKey(encryptedApiKey: string, publicKey: string): Promise<string> {
    try {
        const decryptionKey = SHA256(publicKey).toString();
        const decrypted = AES.decrypt(encryptedApiKey, decryptionKey);
        const result = decrypted.toString(enc.Utf8);

        if (!result) {
            throw new Error('Decryption failed');
        }

        return result;
    } catch (error) {
        console.error('Decryption error:', error);
        throw new Error('Failed to decrypt API key');
    }
}

export async function storeEncryptedApiKey(publicKey: string, apiKey: string): Promise<number> {
    try {
        const encryptedApiKey = encryptApiKey(apiKey, publicKey);
        const result = await updateSubscription(publicKey, {
            key: encryptedApiKey,
            lastSeenOn: formatDate(new Date())
        });
        console.log('Subscription updated successfully');
        return result;
    } catch (error) {
        console.error('Error storing encrypted API key:', error);
        throw error;
    }
}
