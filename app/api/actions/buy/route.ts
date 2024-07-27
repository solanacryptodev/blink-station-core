import { NextRequest, NextResponse } from 'next/server';
import { PublicKey } from '@solana/web3.js';
import { ActionGetResponse, ActionPostRequest, ACTIONS_CORS_HEADERS } from "@solana/actions";
import { CONNECTION, gmClientService, parseCombinedParams, PROGRAM_ID } from '@/lib/chat/blinks/actions';
import { AssetMetadata, assets } from '@/app/api/actions/buy/const';

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    const requestURL = new URL(req.url);
    const getAssetParam = requestURL.searchParams.get("asset") as string;

    const params = parseCombinedParams(getAssetParam);
    // console.log('params...', params);

    const matchingAsset: AssetMetadata = assets.find(asset => asset.param === params.asset)!;

    // const baseHref = new URL(`/api/buy`, requestURL.origin).toString();

    const payload: ActionGetResponse = {
        title: `Star Atlas: Buy ${matchingAsset?.name}`,
        icon: `${matchingAsset?.image!}`,
        description: `Purchase ${matchingAsset?.name} NFT from the Galactic Marketplace`,
        label: "Buy NFT",
        links: {
            actions: [
                {
                    label: `${params.price} ATLAS/NFT`,
                    href: `${requestURL}?asset=${getAssetParam}&quantity={quantity}`,
                    parameters: [
                        {
                            name: "quantity",
                            label: `(Max Quantity: ${params.quantity})`,
                            required: true
                        }
                    ]
                }
            ],
        }
    };

    return NextResponse.json(payload, {
        headers: ACTIONS_CORS_HEADERS
    });
}

export async function POST(req: NextRequest) {
    const requestURL = new URL(req.url);
    // console.log('Full request URL:', requestURL.toString());

    const getAssetParam = requestURL.searchParams.get("asset");
    const getQuantityParam = requestURL.searchParams.get("quantity");

    // console.log('Asset param:', getAssetParam);
    // console.log('Quantity param:', getQuantityParam);

    if (!getAssetParam || !getQuantityParam) {
        throw new Error('Missing required parameters');
    }

    const params = parseCombinedParams(getAssetParam);
    // console.log('Parsed params:', params);

    const matchingAsset: AssetMetadata = assets.find(asset => asset.param === params.asset)!;
    if (!matchingAsset) {
        throw new Error('Asset not found');
    }

    const body: ActionPostRequest = await req.json();
    // console.log('Request body:', body);

    const buyerPubkey = new PublicKey(body.account);
    const purchaseQty = parseInt(getQuantityParam);
    const orderPrice = parseFloat(params.price);
    const orderId = params.orderId;

    console.log('Fetching order...');
    const order = await gmClientService.getOpenOrder(CONNECTION, new PublicKey(orderId), PROGRAM_ID);
    // console.log('Fetched order:', order);

    if (!order) {
        throw new Error('Order not found');
    }

    console.log('Creating exchange transaction...');
    const exchangeTx = await gmClientService.getCreateExchangeTransaction(
        CONNECTION,
        order,
        buyerPubkey,
        purchaseQty,
        PROGRAM_ID,
    );

    exchangeTx.transaction.feePayer = buyerPubkey;
    exchangeTx.transaction.recentBlockhash = (await CONNECTION.getLatestBlockhash({ commitment: "finalized" })).blockhash;

    const serializedTransaction = exchangeTx.transaction.serialize({ requireAllSignatures: false }).toString('base64');

    const payload = {
        transaction: serializedTransaction,
        message: `Purchase ${purchaseQty} ${matchingAsset.name} for ${orderPrice * purchaseQty} ATLAS`
    };

    // console.log('Sending payload:', payload);

    return NextResponse.json(payload, {
        headers: ACTIONS_CORS_HEADERS
    });
}

export async function OPTIONS(req: NextRequest) {
    return NextResponse.json({}, {
        headers: ACTIONS_CORS_HEADERS
    });
}
