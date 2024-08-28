'use server'

import { Flipside } from '@flipsidecrypto/sdk';
import * as fs from "node:fs";
import * as path from "node:path";
import { CONNECTION, gmClientService, PROGRAM_ID } from '@/lib/chat/blinks/actions';
import { PublicKey } from "@solana/web3.js";
import { formatAtlasNumber, formatUSDCPrice, parseFormattedNumber } from "@/lib/utils";
import { StarRating } from '@/lib/types'
import { BN } from "@coral-xyz/anchor";
import { mean, min, sum } from 'lodash'
import { Order } from "@staratlas/factory";
import { ATLAS } from "@/lib/constants";
import { assets } from "@/lib/metadata";

const uri = process.env.FLIPSIDE_API!;

const flipside = new Flipside(uri, 'https://api-v2.flipsidecrypto.xyz');

export async function totalAssetExchanges(mint: string, currency: string): Promise<number> {
    let results = 0
    console.log('exchange mint...', mint, 'exchange currency...', currency)

    try {
        const sql =
            `
            SELECT
                block_timestamp,
                tx_id,          
            FROM
                solana.core.fact_events                    
            WHERE
                program_id = 'traderDnaR5w6Tcoi3NFm53i48FTDNbGjBSZwWXDRrg'
                    AND succeeded = 'true'
                    AND block_timestamp >= '2024-08-15'                     
                    AND INNER_INSTRUCTION:instructions[4]:parsed:type = 'transferChecked'
                    AND INNER_INSTRUCTION:instructions[4]:parsed:info:mint = '${mint}'
                    AND INNER_INSTRUCTION:instructions[2]:parsed:info:mint = '${currency}'                
                    AND INNER_INSTRUCTION:instructions[0]:programId = 'BUDDYtQp7Di1xfojiCSVDksiYLQx511DPdj2nbtG9Yu5'
            ORDER BY
                block_timestamp DESC
            LIMIT 100
        `
            // Send the Query to Flipside's query engine and await the results
            const queryResultSet = await flipside.query.run({sql: sql});

            // Convert the result to a JSON string
            const resultJson = JSON.stringify(queryResultSet, null, 2);

            // Define the output file path
            const outputPath = path.join(process.cwd(), 'results.json');

            // Write the results to a file
            fs.writeFile(outputPath, resultJson, 'utf8', (err) => {
                if (err) {
                    console.error('Error writing results to file:', err);
                    throw err;
                }
            });

            console.log(`Query results have been written to ${outputPath}`);

            results = queryResultSet.records?.length!;
            // console.log('Number of results:', results);

            return results;
    } catch (error) {
        console.error('Error executing query or writing results:', error);
        throw error;
    }
}

export async function totalBuyAndSellQuantities(mint: string, currency: string): Promise<StarRating> {
    const orders = await retrieveOrders(mint);
    const MINIMUM_VALID_PRICE = new BN(10).mul(new BN(10).pow(new BN(8))); // 10 ATLAS in lamports
    const MINIMUM_VALID_RESOURCE_PRICE = new BN(1).mul(new BN(10).pow(new BN(3))); // 0.00001 ATLAS in lamports
    const resourcesFound = assets.find((asset) => asset.mint === mint && asset.isResource === true)!;
    let filteredBuys: number[] = [];

    if ( currency === ATLAS && !resourcesFound) {
        filteredBuys = orders
            .filter(order =>
                order.orderType === 'buy' &&
                order.currencyMint === currency &&
                order.price.gte(MINIMUM_VALID_PRICE)
            )
            .map(order => Number(order.orderQtyRemaining));
    } else if (currency === ATLAS && resourcesFound) {
        filteredBuys = orders
            .filter(order =>
                order.orderType === 'buy' &&
                order.currencyMint === currency &&
                order.price.gte(MINIMUM_VALID_RESOURCE_PRICE)
            )
            .map(order => Number(order.orderQtyRemaining));
    } else {
        filteredBuys = orders
            .filter(order =>
                order.orderType === 'buy' &&
                order.currencyMint === currency
            )
            .map(order => Number(order.orderQtyRemaining));
    }
    // console.log('filteredBuys...', filteredBuys);

    const filteredSells = orders
        .filter(order =>
            order.orderType === 'sell' &&
            order.currencyMint === currency
        )
        .map(order => Number(order.orderQtyRemaining));

    // console.log(`Filtered out ${orders.filter(order => order.orderType === 'buy').length - filteredBuys.length} unrealistic buy orders`);

    return {
        totalBuyQuantity: sum(filteredBuys),
        totalSellQuantity: sum(filteredSells)
    }
}

export async function totalBuyAndSellPrices(mint: string, currency: string): Promise<StarRating> {
    let formattedBuyPrices: (number | string)[] = [];
    let formattedSellPrices: (number | string)[] = [];

    try {
        const orders = await retrieveOrders(mint);

        const filteredBuys = orders.filter(order => order.orderType === 'buy' && order.currencyMint === currency);
        const filteredSells = orders.filter(order => order.orderType === 'sell' && order.currencyMint === currency);

        formattedBuyPrices = filteredBuys
            .filter(order => order.price != null && order.orderQtyRemaining != null)
            .map(order => {
                const price = new BN(order.price).mul(new BN(order.orderQtyRemaining));
                return currency === ATLAS ? formatAtlasNumber(price) : formatUSDCPrice(price);
            });

        formattedSellPrices = filteredSells
            .filter(order => order.price != null && order.orderQtyRemaining != null)
            .map(order => {
                const price = new BN(order.price).mul(new BN(order.orderQtyRemaining));
                return currency === ATLAS ? formatAtlasNumber(price) : formatUSDCPrice(price);
            });

        const totalBuyPrice = sum(formattedBuyPrices.map(price => typeof price === 'string' ? parseFormattedNumber(price) : price));
        const totalSellPrice = sum(formattedSellPrices.map(price => typeof price === 'string' ? parseFormattedNumber(price) : price));

        // console.log(`Total buy price: ${totalBuyPrice}, Total sell price: ${totalSellPrice}`);

        return {
            totalBuyPrice,
            totalSellPrice
        };
    } catch (error) {
        console.error('Error in totalBuyAndSellPrices:', error);
        throw error;
    }
}

export async function lowestCurrentPrice(mint: string, currency: string): Promise<StarRating> {
    const orders = await retrieveOrders(mint);

    const filteredSells = orders.filter(order => order.orderType === 'sell' && order.currencyMint === currency)
    const formattedSellPrices = filteredSells
        .filter(order => order.price)
        .map(order => formatAtlasNumber(new BN(order.price)))
    // console.log('formattedSellPrices...', formattedSellPrices);

    const sellPrices = formattedSellPrices.map(parseFormattedNumber);

    return {
        lowestSellPrice: min(sellPrices)
    }
}

/* For price competitiveness rating, not liquidity score */
export async function averageSellPrice(mint: string, currency: string): Promise<StarRating> {
    const sellOrders = await retrieveOrders(mint);
    const MAXIMUM_VALID_PRICE = new BN(1).mul(new BN(10).pow(new BN(8)));
    const resourcesFound = assets.find((asset) => asset.mint === mint && asset.isResource === true)!;
    let formattedSellPrices: string[] = [];

    const filteredSells = sellOrders.filter(order => order.orderType === 'sell' && order.currencyMint === currency)

    if ( currency === ATLAS && resourcesFound ) {
        formattedSellPrices = filteredSells
            .filter(order =>
                order.price &&
                order.price.lte(MAXIMUM_VALID_PRICE))
            .map(order => formatAtlasNumber(new BN(order.price)))
    } else {
        formattedSellPrices = filteredSells
            .filter(order => order.price)
            .map(order => formatAtlasNumber(new BN(order.price)))
    }
    // console.log('filteredSellOrders...', formattedSellPrices);

    const sellPrices = formattedSellPrices.map(parseFormattedNumber);
    // console.log('sellPrices...', sellPrices);

    return {
        averageSellPrice: mean(sellPrices)
    }
}

async function retrieveOrders(mint: string): Promise<Order[]> {
    const findMint = new PublicKey(mint);
    return await gmClientService.getOpenOrdersForAsset(CONNECTION, findMint, PROGRAM_ID)
}
