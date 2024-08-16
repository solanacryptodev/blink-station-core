import { clsx, type ClassValue } from 'clsx'
import { customAlphabet } from 'nanoid'
import { twMerge } from 'tailwind-merge'
import { PublicKey } from "@solana/web3.js";
import { assets } from "@/lib/metadata";
import { BN } from "@coral-xyz/anchor";
import { Order } from "@staratlas/factory";
import { ATLAS } from "@/lib/constants";

export function formatTokenAmount(amount: number, decimals: number): bigint {
  return BigInt(Math.floor(amount * 10 ** decimals));
}

export function formatDate(date: Date): string {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

export function addDaysToDate(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function getNftMint(assetQuery: string): PublicKey | null {
  const asset = assets.find(asset => asset.name.toLowerCase() === assetQuery.toLowerCase())
  const mint = asset?.mint
  return mint ? new PublicKey(mint) : null;
}

export function getNftName(name: string): string | null {
  const asset = assets.find(asset => asset.name.toLowerCase() === name.toLowerCase())
  const mint = asset?.name
  return mint ? mint : null;
}

export function getNftParam(name: string): string | null {
  const asset = assets.find(asset => asset.name.toLowerCase() === name.toLowerCase())
  const param = asset?.param
  return param ? param : null;
}

// Utility function to add commas to a number with no zeroes
export function formatNumberWithCommas(num: number): string {
  // Convert the number to a string
  let numStr = num.toString();

  // Split the string into integer and decimal parts (if any)
  const parts = numStr.split('.');

  // Add commas to the integer part
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Join the integer and decimal parts (if any) and return
  return parts.join('.');
}


// Utility function to convert BN to a readable number with comma separators
export const bnToNumber = (bn: BN): string => {
  const decimals = 8;
  const divisor = new BN(10).pow(new BN(decimals));
  const wholePart = bn.div(divisor);
  const fractionalPart = bn.mod(divisor);

  const fractionalStr = fractionalPart.toString().padStart(decimals, '0');
  const result = parseFloat(wholePart.toString() + '.' + fractionalStr);

  // Round to 6 decimal places for display and format with comma separators
  return result.toFixed(6).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatOrderNumber = (bn: BN, currency: Order): string => {
  const foundCurrency = currency.currencyMint === ATLAS ? 'ATLAS' : 'USDC';
  let number: number;
  let formattedNumber: string;

  if (foundCurrency === 'ATLAS') {
    number = parseFloat(bnToNumber(bn));
  } else {
    number = parseFloat(currency.uiPrice.toFixed(2));
  }

  // Format the number with comma separators and proper decimal places
  formattedNumber = number.toLocaleString('en-US', {
    minimumFractionDigits: foundCurrency === 'USDC' ? 2 : 6,
    maximumFractionDigits: foundCurrency === 'USDC' ? 2 : 6
  });

  return `${formattedNumber}`;
}

export const formatQuantity = (quantity: number | string): string => {
  // Ensure the input is a number
  const numericQuantity = typeof quantity === 'string' ? parseInt(quantity, 10) : quantity;

  // Check if the parsed number is valid
  if (isNaN(numericQuantity)) {
    throw new Error('Invalid input: quantity must be a number or a numeric string');
  }

  // Format the number with comma separators and no decimal places
  return numericQuantity.toLocaleString('en-US', {
    maximumFractionDigits: 0,
    useGrouping: true
  });
};

export const removeDecimal = (num: number) => {
  // Convert the number to a string
  let numStr = num.toString();
  // If there's no decimal point, return the original string
  if (!numStr.includes('.')) {
    return numStr;
  }
  // Split the string into parts before and after the decimal
  let [integerPart, fractionalPart] = numStr.split('.');
  // If the integer part is just '0', remove it
  if (integerPart === '0') {
    return fractionalPart.padStart(numStr.length - 1, '0');
  }
  // Otherwise, combine the parts without the decimal point
  return integerPart + fractionalPart;
}

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
