'use client'

import { observer } from "mobx-react-lite";
import { FunctionComponent, useEffect, useId } from "react";
import { LorePresenter } from "@/presenters/LorePresenter";
import { useAIState } from "ai/rsc";

export const Lore: FunctionComponent<{ lore: string }> = observer(({ lore } : { lore: string }) => {
    const lorePresenter = LorePresenter.getInstance();
    lorePresenter.componentDidMount();
    lorePresenter.findLore(lore);

    const id = useId();

    // get the AI state and update it
    const [aiState, setAIState] = useAIState()

    useEffect(() => {
        if (lorePresenter.isFetchComplete && !lorePresenter.isLoading) {
            const loreString = JSON.stringify(lorePresenter.lore, null, 2);
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
    }, [lorePresenter.isFetchComplete, lorePresenter.isLoading])

    return (
        <div className='container flex-col mx-auto bg-gradient-to-r from-gray-900 via-neutral-900 to-gray-900 shadow-lg rounded-lg overflow-hidden'>
            <div className='flex flex-col bg-gray-800 p-6 m-8 shadow-lg rounded-lg'>
                <div className='text-3xl text-center font-bold underline mb-2'>Galia Expanse Database</div>
                <div className='text-2xl text-center mb-2'>{lorePresenter.loreName}</div>
                <div className='text-xl text-center text-amber-100'>{lorePresenter.loreAnalysis}</div>
            </div>
        </div>
    )
})
