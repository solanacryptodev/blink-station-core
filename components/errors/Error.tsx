'use client'

import React from 'react';

interface ErrorProps {
    error?: Error;
    reset?: () => void;
}

export const Error: React.FC<ErrorProps> = ({ error, reset }) => {
    return (
        <div className="error-container">
            <h1>Oops! Something went wrong.</h1>
            {error && <p>Error: {error.message}</p>}
            {reset && (
                <button onClick={reset} className="reset-button">
                    Try again
                </button>
            )}
        </div>
    );
};
