import { ACTIONS_CORS_HEADERS, ActionsJson } from "@solana/actions";

export const GET = async () => {
    const payload: ActionsJson = {
        rules: [
            // map all root level routes to an action
            {
                pathPattern: "/blink?asset=:assetId",
                apiPath: "/api/actions/buy?asset=:assetId",
            },
            // fallback path
            // TODO: fetch quantity from on-chain. Currently hardcoded to 618.
            {
                pathPattern: "/blink?asset=:assetId",
                apiPath: "/api/actions/buy?asset=:assetId",
            },
        ],
    };

    return Response.json(payload, {
        headers: ACTIONS_CORS_HEADERS,
    });
};

// DO NOT FORGET TO INCLUDE THE `OPTIONS` HTTP METHOD
// THIS WILL ENSURE CORS WORKS FOR BLINKS
export const OPTIONS = GET;
