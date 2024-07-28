import { useCallback, useState } from "react";
import {  } from '@staratlas/player-profile';

export const usePlayerProfile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const findPlayerProfile = useCallback(async (asset: string) => {
        setIsLoading(true);
        setError(null);

        try {

        } catch (error) {
            console.error('An error emerged...', error);
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
            return [];
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        findPlayerProfile,
        isLoading,
        error
    };
};
