import { clsx, type ClassValue } from 'clsx'
import { customAlphabet } from 'nanoid'
import { twMerge } from 'tailwind-merge'
import { PublicKey } from "@solana/web3.js";
import { assets } from "@/lib/metadata";
import { BN } from "@coral-xyz/anchor";

export function getNftMint(assetQuery: string): PublicKey | null {
  const asset = assets.find(asset => asset.param.toLowerCase() === assetQuery.toLowerCase())
  const mint = asset?.mint
  return mint ? new PublicKey(mint) : null;
}

export function getNftName(name: string): string | null {
  const asset = assets.find(asset => asset.param.toLowerCase() === name.toLowerCase())
  const mint = asset?.name
  return mint ? mint : null;
}

// Utility function to convert BN to a readable number
export const bnToNumber = (bn: BN): number => {
  const decimals = 8;
  const divisor = new BN(10).pow(new BN(decimals));
  const wholePart = bn.div(divisor);
  const fractionalPart = bn.mod(divisor);

  const fractionalStr = fractionalPart.toString().padStart(decimals, '0');
  const result = parseFloat(wholePart.toString() + '.' + fractionalStr);

  // Round to 6 decimal places for display
  return Number(result.toFixed(6));
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
) // 7-character random string

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init)

  if (!res.ok) {
    const json = await res.json()
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number
      }
      error.status = res.status
      throw error
    } else {
      throw new Error('An unexpected error occurred')
    }
  }

  return res.json()
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

export const formatNumber = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)

export const runAsyncFnWithoutBlocking = (
  fn: (...args: any) => Promise<any>
) => {
  fn()
}

export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))

export const getStringFromBuffer = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')

export enum ResultCode {
  InvalidCredentials = 'INVALID_CREDENTIALS',
  InvalidSubmission = 'INVALID_SUBMISSION',
  UserAlreadyExists = 'USER_ALREADY_EXISTS',
  UnknownError = 'UNKNOWN_ERROR',
  UserCreated = 'USER_CREATED',
  UserLoggedIn = 'USER_LOGGED_IN'
}

export const getMessageFromCode = (resultCode: string) => {
  switch (resultCode) {
    case ResultCode.InvalidCredentials:
      return 'Invalid credentials!'
    case ResultCode.InvalidSubmission:
      return 'Invalid submission, please try again!'
    case ResultCode.UserAlreadyExists:
      return 'User already exists, please log in!'
    case ResultCode.UserCreated:
      return 'User created, welcome!'
    case ResultCode.UnknownError:
      return 'Something went wrong, please try again!'
    case ResultCode.UserLoggedIn:
      return 'Logged in!'
  }
}

export const formatPriceForQuery = (price: string): string => {
  if (price.startsWith('0')) {
    // Find the first non-zero digit
    const firstNonZero = price.split('').findIndex(char => char !== '0');
    if (firstNonZero === -1) {
      // If all zeros, return "0.0"
      return "0.0";
    }
    // Insert the decimal point after the first zero
    return '0.' + price.slice(1);
  }
  return price;
};
