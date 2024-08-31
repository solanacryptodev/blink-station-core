'use client'

import { observer } from "mobx-react-lite";
import { FunctionComponent, useEffect, useId, useState, useCallback, useRef } from "react";
import { LorePresenter } from "@/presenters/LorePresenter";
import { useAIState } from "ai/rsc";
import { wordRevealer } from '@/lib/utils'
import { motion, Variants, useAnimate } from 'framer-motion';
import { LoreData } from "@/lib/metadata";

export const Lore: FunctionComponent<{ lore: string }> = observer(({ lore }) => {
    const lorePresenter = LorePresenter.getInstance()
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [foundLore, setFoundLore] = useState<LoreData | null>(null);
    const [animationKey, setAnimationKey] = useState(0);

    const id = useId();
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
        if (!error && !isLoading && foundLore && lore !== prevLoreRef.current) {
            const loreString = JSON.stringify(foundLore, null, 2);
            // console.log('Updating AI state with lore:', loreString);
            const message = {
                id,
                role: 'system' as const,
                content: `[Player has generated lore from the Galia Expanse Database based on ${lore}]: ${loreString}`
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
    }, [error, foundLore, id, isLoading, lore, setAIState]);

    const revealLoreName = wordRevealer(foundLore?.loreName || '')
    const revealLoreAnalysis = wordRevealer(foundLore?.loreAnalysis || '')

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
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
                <motion.div className='text-xl text-center text-amber-100' variants={charVariants}>
                    <p>
                        {revealLoreAnalysis?.map((char, index) =>
                            <motion.span key={index} variants={charVariants}>
                                {char}
                            </motion.span>
                        )}
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
});
