import { Connection, PublicKey } from "@solana/web3.js";
const newConnection = process.env.NEXT_PUBLIC_HELIUS_RPC_URL as string;

export const ATLAS: string = 'ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx';
export const ATLAS_MINT = new PublicKey(ATLAS);
export const USDC_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
export const PROGRAM_ID = new PublicKey('traderDnaR5w6Tcoi3NFm53i48FTDNbGjBSZwWXDRrg');
export const CONNECTION = new Connection(newConnection);
export const PLAYER_PROGRAM_ID = new PublicKey('pprofELXjL5Kck7Jn5hCpwAL82DpTkSYBENzahVtbc9');
export const EMPTY_NODE_WALLET= process.env.NEXT_PUBLIC_NODE!.split(',').map(Number);
