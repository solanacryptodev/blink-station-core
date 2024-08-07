import { useEffect, useCallback } from 'react';
import * as amplitude from '@amplitude/analytics-browser';

type EventMetadata = Record<string, any>;

export const useAmplitude = () => {
    const initializeAmplitude = useCallback(() => {
        const key = process.env.NEXT_PUBLIC_AMPLITUDE_KEY;

        if (!key) {
            console.warn('Amplitude key is not set in environment variables');
            return;
        }

        amplitude.init(key, {
            autocapture: true,
        });

    }, []);

    useEffect(() => {
        initializeAmplitude();
    }, [initializeAmplitude]);

    const trackEvent = useCallback((eventName: string, eventMetadata?: EventMetadata) => {
        amplitude.track(eventName, eventMetadata);
    }, []);

    const setUserId = useCallback((userId: string) => {
        amplitude.setUserId(userId);
    }, []);

    return { trackEvent, setUserId };
};
