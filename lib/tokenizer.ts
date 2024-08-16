export function tokenizeString(str: string): number {
    // Trim leading and trailing whitespace
    str = str.trim();

    // Split the string into tokens
    const tokens: string[] = [];
    let currentToken = '';

    for (let i = 0; i < str.length; i++) {
        const char = str[i];

        if (char === ' ') {
            // If we have a current token, add it
            if (currentToken) {
                tokens.push(currentToken);
                currentToken = '';
            }
            // Start a new token with the space
            currentToken = ' ';
        } else if (char === "'" || char === '"') {
        // Add current token if exists
        if (currentToken) {
            tokens.push(currentToken);
        }
        // Start a new token with the apostrophe
        currentToken = char;
    } else if (/[!?.,:;]/.test(char)) {
        // Add current token if exists
        if (currentToken) {
            tokens.push(currentToken);
        }
        // Check if we're starting a run of punctuation
        let punctuation = char;
        while (i + 1 < str.length && /[!?.,:;]/.test(str[i + 1])) {
            i++;
            punctuation += str[i];
        }
        tokens.push(punctuation);
        currentToken = '';
    } else {
        // Add to current token
        currentToken += char;
    }
}

// Add any remaining token
if (currentToken) {
    tokens.push(currentToken);
}

// Handle URLs and emojis
const finalTokens = tokens.flatMap(token => {
    if (/^https?:\/\/\S+$/.test(token)) {
        // Assume URLs are about 3 tokens
        return [token, token, token];
    }
    // This regex attempts to match emoji characters
    // const emojiRegex = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu;
    // if (emojiRegex.test(token)) {
    //     // Split token into parts, keeping emojis separate
    //     return token.split(emojiRegex).filter(Boolean);
    // }
    return token;
});

return finalTokens.length;
}
