'use client'

import { IconUser } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { spinner } from './spinner'
import { CodeBlock } from '../ui/codeblock'
import { MemoizedReactMarkdown } from '../markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { StreamableValue, useStreamableValue } from 'ai/rsc'
import { useStreamableText } from '@/lib/hooks/use-streamable-text'
import PulsingIcon from "@/components/ui/pulsing-icon";
import { observer } from "mobx-react-lite";
import { PlayerPresenter } from "@/presenters/PlayerPresenter";
import { Power } from "react-feather";
import { SubscriptionPresenter } from "@/presenters/SubscriptionPresenter";

// Different types of message bubbles.

export const UserMessage = observer(({ children }: { children: React.ReactNode }) => {
    const playerPresenter = PlayerPresenter.getInstance();
    const subscriptionPresenter = SubscriptionPresenter.getInstance();

  return (
    <div className="group relative flex items-start md:-ml-12">
      <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-md border bg-background shadow-sm">
        <IconUser />
      </div>
        <div className="flex-col w-full">
            <div className="ml-4 mb-2 flex-1 space-y-2 overflow-hidden pl-2">
                { children }
            </div>
            <div className="flex flex-row items-center text-[#d1aa0f] float-right text-lg">
                { !playerPresenter.isLoading && <Power size={ 18 } className="mr-2"/> }
                { playerPresenter.isLoading && <SpinnerMessage/> }
                <div>
                    { playerPresenter.isLoading || playerPresenter.playerName === 'undefined' ? (
                        'Loading...'
                    ) : playerPresenter.playerName ? (
                        `${ playerPresenter.playerName } | Station ${ subscriptionPresenter.account[0]?.subscriptionRank! }`
                    ) : (
                        'No Name Detected'
                    ) }
                </div>
            </div>
        </div>
    </div>
  )
} )

export function BotMessage( {
                                content,
                                className
                            }: {
    content: string | StreamableValue<string>
    className?: string
} ) {
    const text = useStreamableText( content )

    return (
        <div className={ cn( 'group relative flex items-start md:-ml-12', className ) }>
            <div className="flex size-[24px] text-xl shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
                <PulsingIcon light={ [ 249, 246, 240 ] } dark={ [ 23, 21, 21 ] }/>
            </div>
            <div className="flex-col w-full">
                <div className="ml-4 mb-3 flex-1 space-y-2 overflow-hidden px-1 text-xl">
                    <MemoizedReactMarkdown
                        className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 text-xl"
                        remarkPlugins={ [ remarkGfm, remarkMath ] }
                        components={ {
                            p( { children } ) {
                                return <p className="mb-2 last:mb-0">{ children }</p>
                            },
                            code( { node, inline, className, children, ...props } ) {
                                if ( children.length ) {
                                    if ( children[ 0 ] == '▍' ) {
                                        return (
                                            <span className="mt-1 animate-pulse cursor-default">▍</span>
                                        )
                                    }

                                    children[ 0 ] = ( children[ 0 ] as string ).replace( '`▍`', '▍' )
                                }

                                const match = /language-(\w+)/.exec( className || '' )

                                if ( inline ) {
                                    return (
                                        <code className={ className } { ...props }>
                                            { children }
                                        </code>
                                    )
                                }

                                return (
                                    <CodeBlock
                                        key={ Math.random() }
                                        language={ ( match && match[ 1 ] ) || '' }
                                        value={ String( children ).replace( /\n$/, '' ) }
                                        { ...props }
                                    />
                                )
                            }
                        } }
                    >
                        { text }
                    </MemoizedReactMarkdown>
                </div>
                <div className="flex flex-row items-center text-[#d1aa0f] float-right text-lg">
                    <Power size={ 18 } className="mr-2"/>
                    <div>Atlasson</div>
                </div>
            </div>
        </div>
    )
}

export function BotCard( {
                             children,
                             showAvatar = true
                         }: {
    children: React.ReactNode
    showAvatar?: boolean
} ) {
    return (
        <div className="group relative flex items-start md:-ml-12">
            <div
                className={ cn(
                    'flex size-[24px] text-xl shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm',
                    !showAvatar && 'invisible'
                ) }
            >
                <PulsingIcon light={ [ 249, 246, 240 ] } dark={ [ 23, 21, 21 ] }/>
            </div>
            <div className="flex flex-col w-full">
                <div className="ml-4 flex-1 pl-2 mb-3">{ children }</div>
                <div className="flex flex-row text-[#d1aa0f] float-right items-center self-end text-lg">
                    <Power size={ 18 } className="mr-2"/>
                    <div>Atlasson</div>
                </div>
            </div>
        </div>
    )
}

export function SystemMessage( { children }: { children: React.ReactNode } ) {
    return (
        <div
            className={
                'mt-2 flex items-center justify-center gap-2 text-xs text-gray-500'
            }
        >
            <div className={ 'max-w-[600px] flex-initial p-2' }>{ children }</div>
        </div>
    )
}

export function SpinnerMessage({message}: {message?: string}) {
    return (
        <div className="group relative flex md:-ml-12">
            <div className="ml-4 flex flex-row items-center align-center text-amber-500">
                <div className="flex">{ spinner }</div>
                <div className="flex">{ message }</div>
            </div>
        </div>
    )
}
