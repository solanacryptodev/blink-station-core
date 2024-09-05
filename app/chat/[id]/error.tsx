'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Error({ error, reset, }: { error: Error & { digest?: string }; reset: () => void; }) {
    const router = useRouter();

    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div>
            <h2>Something went wrong!</h2>
            <button
                onClick={() => {
                    reset();
                    router.refresh();
                }}
            >
                Try again
            </button>
        </div>
    );
}
