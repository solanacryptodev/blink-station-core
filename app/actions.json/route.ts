import { ACTIONS_CORS_HEADERS, ActionsJson } from "@solana/actions";

export const GET = async () => {
    const payload: ActionsJson = {
        rules: [
            // map all root level routes to an action
            {
                pathPattern: "/blink",
                apiPath: "/api/actions/buy",
            },
            // fallback path
            // TODO: fetch quantity from on-chain. Currently hardcoded to 618.
            {
                pathPattern: "/blink",
                apiPath: "/api/actions/buy?asset=calicoatsenforcer|DgkAjeQvA1eJbq9YPvzCJojuKmNqBYYC7mcwDonCNYWz|790866|618",
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
