'use client'

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function ErrorComponent({ error, reset }: ErrorProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">
            <div className="w-full max-w-md">
                <div className="text-white">Something went wrong!</div>
                <div>
                    {error.message || "An unexpected error occurred."}
                </div>
            </div>
            <button
                onClick={reset}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
                Try again
            </button>
        </div>
    );
}
