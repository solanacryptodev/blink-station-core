'use server'

import { Flipside } from '@flipsidecrypto/sdk';
import * as fs from "node:fs";
import * as path from "node:path";
import { CONNECTION, gmClientService, PROGRAM_ID } from '@/lib/chat/blinks/actions';
import { PublicKey } from "@solana/web3.js";
import { formatAtlasNumber, parseFormattedNumber } from "@/lib/utils";
import { StarRating } from '@/lib/types'
import { BN } from "@coral-xyz/anchor";
import { mean, min, sum } from 'lodash'
import { Order } from "@staratlas/factory";

const uri = process.env.FLIPSIDE_API!;

const flipside = new Flipside(uri, 'https://api-v2.flipsidecrypto.xyz');

export async function totalAssetExchanges(mint: string, currency: string): Promise<number> {
    let results = 0
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
                    AND block_timestamp > '2024-08-20'                     
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

            // console.log(`Query results have been written to ${outputPath}`);

            results = queryResultSet.records?.length!;
            console.log('Number of results:', results);

            return results;
    } catch (error) {
        console.error('Error executing query or writing results:', error);
        throw error;
    }
}

export async function totalBuyAndSellQuantities(mint: string, currency: string): Promise<StarRating> {
    const orders = await retrieveOrders(mint);

    const filteredBuys = orders
        .filter(order => order.orderType === 'buy' && order.currencyMint === currency)
        .map(order => Number(order.orderQtyRemaining))

    //console.log('buyQuantities...', filteredBuys);

    const filteredSells = orders
        .filter(order => order.orderType === 'sell' && order.currencyMint === currency)
        .map(order => Number(order.orderQtyRemaining))

    // console.log('sellQuantities...', filteredSells);

    return {
        totalBuyQuantity: sum(filteredBuys),
        totalSellQuantity: sum(filteredSells)
    }
}

export async function totalBuyAndSellPrices(mint: string, currency: string): Promise<StarRating> {
    const orders = await retrieveOrders(mint);

    const filteredBuys = orders.filter(order => order.orderType === 'buy' && order.currencyMint === currency)
    const formattedBuyPrices = filteredBuys
        .filter(order => order.price)
        .map(order => formatAtlasNumber(new BN(order.price * order.orderQtyRemaining)))
   // console.log('formattedBuyPrices...', formattedBuyPrices);

    const filteredSells = orders.filter(order => order.orderType === 'sell' && order.currencyMint === currency)
    const formattedSellPrices = filteredSells
        .filter(order => order.price)
        .map(order => formatAtlasNumber(new BN(order.price * order.orderQtyRemaining)))
    //console.log('formattedSellPrices...', formattedSellPrices);

    return {
        totalBuyPrice: sum(formattedBuyPrices.map(parseFormattedNumber)),
        totalSellPrice: sum(formattedSellPrices.map(parseFormattedNumber))
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

    const filteredSells = sellOrders.filter(order => order.orderType === 'sell' && order.currencyMint === currency)
    const formattedSellPrices = filteredSells
        .filter(order => order.price)
        .map(order => formatAtlasNumber(new BN(order.price)))
    // console.log('formattedSellPrices...', formattedSellPrices);

    const sellPrices = formattedSellPrices.map(parseFormattedNumber);

    return {
        averageSellPrice: mean(sellPrices)
    }
}

async function retrieveOrders(mint: string): Promise<Order[]> {
    const findMint = new PublicKey(mint);
    return await gmClientService.getOpenOrdersForAsset(CONNECTION, findMint, PROGRAM_ID)
}
