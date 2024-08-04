'use client'

import React, { useState, useEffect } from 'react';

const PulsingIcon = ({ light, dark }: { light: number[], dark: number[] }) => {
    const [glowIntensity, setGlowIntensity] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setGlowIntensity((prevIntensity) => (prevIntensity + 1) % 100);
        }, 50); // Update every 50ms for smooth animation

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    const calculateColor = (intensity: number) => {
        const darkYellow = dark;
        const lightYellow = light;
        const r = Math.round(darkYellow[0] + (lightYellow[0] - darkYellow[0]) * (intensity / 100));
        const g = Math.round(darkYellow[1] + (lightYellow[1] - darkYellow[1]) * (intensity / 100));
        const b = Math.round(darkYellow[2] + (lightYellow[2] - darkYellow[2]) * (intensity / 100));
        return `rgb(${r}, ${g}, ${b})`;
    };

    return (
        <div
            className="w-7 h-7 rounded-lg transition-all duration-300 ease-in-out"
            style={{
                backgroundColor: calculateColor(glowIntensity),
                boxShadow: `0 0 ${4 + glowIntensity / 25}px ${calculateColor(glowIntensity)}`,
            }}
        ></div>
    );
};

export default PulsingIcon;
