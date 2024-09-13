'use client'

import { observer } from "mobx-react-lite";
import { FunctionComponent, useEffect, useId, useState, useCallback, useRef } from "react";
import { LorePresenter } from "@/presenters/LorePresenter";
import { useAIState } from "ai/rsc";
import { wordRevealer } from '@/lib/utils'
import { motion, Variants } from 'framer-motion';
import { LoreData } from "@/lib/lore-metadata";
import { StarAtlasLore } from "@/lib/lore/lore";
import { Error } from "@/components/error";
import { PlayerPresenter } from "@/presenters/PlayerPresenter";

export const Lore: FunctionComponent<{ lore: string }> = observer(({ lore }) => {
    const lorePresenter = LorePresenter.getInstance(StarAtlasLore);
    const playerPresenter = PlayerPresenter.getInstance();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [foundLore, setFoundLore] = useState<LoreData | null>(null);
    const [animationKey, setAnimationKey] = useState(0);

    const id = useId();
    const playerName = JSON.stringify(playerPresenter.playerName, null, 2);
    const stationRank = JSON.stringify(playerPresenter.playerRank, null, 2);
    // console.log('player name and rank outside of useEffect...', playerName, stationRank)
    const [aiState, setAIState] = useAIState();
    const prevLoreRef = useRef<string | null>(null);

    const charVariants: Variants = {
        hidden: { opacity: 0 },
        reveal: { opacity: 1 }
    };
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        reveal: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const fetchLore = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedLore = await lorePresenter.findLore(lore);
            // console.log('Fetched lore:', fetchedLore);
            if (fetchedLore.length > 0) {
                setFoundLore(fetchedLore[0]);
                setAnimationKey(prev => prev + 1); // Trigger animation
            } else {
                setFoundLore(null);
            }
        } catch (err) {
            console.error('Error fetching lore:', err);
            setError('No lore found for this query.');
            setFoundLore(null);
        } finally {
            setIsLoading(false);
        }
    }, [lore, lorePresenter]);

    useEffect(() => {
        fetchLore();
    }, [fetchLore]);

    useEffect(() => {
        // console.log('player name and rank inside of useEffect...', playerName, stationRank)
        if (!error && !isLoading && foundLore && lore !== prevLoreRef.current) {
            const loreString = JSON.stringify(foundLore, null, 2);
            // console.log('Updating AI state with lore:', loreString);
            const message = {
                id,
                role: 'system' as const,
                content: `[This player's Station Rank is ${stationRank} and their name is ${playerName}. They have generated lore from the Galia Expanse 
                Database based on ${lore}]: ${loreString}. Use their rank and name in your response to their inquiries.`
            }

            if (aiState.messages[aiState.messages.length - 1]?.id === id) {
                setAIState({
                    ...aiState,
                    messages: [...aiState.messages.slice(0, -1), message]
                })
            } else {
                setAIState({
                    ...aiState,
                    messages: [...aiState.messages, message]
                })
            }
        }
    }, [error, foundLore, id, isLoading, lore, setAIState, playerName, stationRank]);

    const revealLoreName = wordRevealer(foundLore?.loreName || '');
    const revealLoreAnalysis = foundLore?.loreAnalysis || '';

    const paragraphs = revealLoreAnalysis.split('\n\n').filter(paragraph => paragraph.trim() !== '');


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            {!error && (
                <motion.div
                    key={animationKey}
                    className='container flex-col mx-auto bg-gradient-to-r from-gray-900 via-neutral-900 to-gray-900 shadow-lg rounded-lg overflow-hidden'
                    variants={containerVariants}
                    initial="hidden"
                    animate="reveal"
                >
                    <div className='flex flex-col bg-gray-800 p-6 m-8 shadow-lg rounded-lg'>
                        <div className='text-3xl text-center font-bold underline mb-2'>Galia Expanse Database</div>
                        <motion.div className='text-2xl text-center text-amber-100 mb-3' variants={charVariants}>
                            <h1>
                                {revealLoreName?.map((char, index) =>
                                    <motion.span key={index} variants={charVariants}>
                                        {char}
                                    </motion.span>
                                )}
                            </h1>
                        </motion.div>
                        <motion.div className='text-xl text-amber-100 space-y-4' variants={containerVariants}>
                            {paragraphs.map((paragraph, index) => (
                                <motion.p key={index} className='text-left' variants={charVariants}>
                                    {wordRevealer(paragraph).map((char, charIndex) => (
                                        <motion.span key={charIndex} variants={charVariants}>
                                            {char}
                                        </motion.span>
                                    ))}
                                </motion.p>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            )}

            { foundLore?.loreAnalysis.length === 0 && (
                <div className='flex flex-col bg-red-700 p-6 m-8 shadow-lg rounded-lg'>
                    <div className='text-3xl text-center font-bold mb-2'>Galia Expanse Database</div>
                    <motion.div className='text-2xl text-center text-amber-100 mb-3' variants={ charVariants }>
                        <h1>No lore was found in the Station database that matches your inquiry. Please try again.</h1>
                    </motion.div>
                </div>
            )}

            { error && (
                <Error error={ error }/>
            )}
        </>
    );
});
