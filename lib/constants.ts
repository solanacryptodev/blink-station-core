import { Connection, PublicKey } from "@solana/web3.js";
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();
const newConnection = process.env.NEXT_PUBLIC_HELIUS_RPC_URL as string;

export const ATLAS: string = 'ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx';
export const PROGRAM_ID = new PublicKey('traderDnaR5w6Tcoi3NFm53i48FTDNbGjBSZwWXDRrg');
export const CONNECTION = new Connection(newConnection);
