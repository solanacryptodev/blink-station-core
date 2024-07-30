import { Metadata, ResolvingMetadata } from 'next'
import { redirect } from 'next/navigation'
import { ReturnedOrders } from "@/lib/types";
import { assets } from "@/lib/metadata";
import { OrderSide } from "@staratlas/factory";
import { formatPriceForQuery } from "@/lib/utils";

interface PageProps {
    searchParams: { asset?: string }
}

export async function generateMetadata(
    { searchParams }: PageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const asset = searchParams.asset

    if (!asset) {
        redirect(`/api/actions/buy?asset=calicoatsenforcer|DgkAjeQvA1eJbq9YPvzCJojuKmNqBYYC7mcwDonCNYWz|790866|618`)
    }

    // Fetch asset data based on the asset parameter
    const assetData = await fetchAssetData(asset)
    const assetImage = assets.filter((asset) => asset.param === assetData.assetName)

    return {
        title: `Blink Station X - The ${assetData.assetName}`,
        description: `Purchase this ${assetData.assetName} game asset from the Star Atlas Galactic Marketplace 
            for ${assetData.price} ATLAS!`,
        openGraph: {
            title: `Blink Station X - The ${assetData.assetName}`,
            description: `Purchase this ${assetData.assetName} game asset from the Star Atlas Galactic Marketplace 
             for ${assetData.price} ATLAS!`,
            images: [{ url: assetImage[0].image! }],
        },
        twitter: {
            card: 'summary_large_image',
            title: `Blink Station X - The ${assetData.assetName}`,
            description: `Purchase this ${assetData.assetName} game asset from the Star Atlas Galactic Marketplace 
              for ${assetData.price} ATLAS!`,
            images: [assetImage[0].image!],
        },
    }
}

async function fetchAssetData(assetId: string): Promise<Partial<ReturnedOrders>> {
    // Filter out the asset based on the first parameter
    const asset = assets.filter((asset) => asset.param === assetId.split('|')[0]);
    const formattedPrice = formatPriceForQuery(assetId.split('|')[2]);

    return {
        orderType: OrderSide.Sell,
        assetName: asset[0].name,
        orderId: assetId.split('|')[1],
        price: formattedPrice,
        quantity: Number(assetId.split('|')[3])
    }
}

export default function BlinkPage({ searchParams }: PageProps) {
    const asset = searchParams.asset

    if (asset) {
        // Redirect to the API route for blockchain interaction
        redirect(`/api/actions/buy?asset=${asset}`)
    }

    // If no asset parameter, you could render a default page or redirect to home
    return <div>Welcome to the Blink Builder</div>
}
