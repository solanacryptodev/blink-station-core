'use client'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { useEffect, useState, useTransition } from 'react'
import { useUIState, useAIState } from 'ai/rsc'
import { Message, Session } from '@/lib/types'
import { usePathname, useRouter } from 'next/navigation'
import { useScrollAnchor } from '@/lib/hooks/use-scroll-anchor'
import { toast } from 'sonner'
import { PlayerPresenter } from "@/presenters/PlayerPresenter";
import { WalletModal } from '@/components/wallet-modal';
import { observer } from "mobx-react-lite";
import { loadPlayerName } from "@/app/actions";

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
  session?: Session
  missingKeys: string[]
}

export const Chat = observer(({ id, className, session, missingKeys }: ChatProps) => {
  const router = useRouter()
  const path = usePathname()
  const [input, setInput] = useState('')
  const [messages] = useUIState()
  const [aiState] = useAIState()
  const playerPresenter = PlayerPresenter.getInstance();

  const [_, setNewChatId] = useLocalStorage('newChatId', id)
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const playerName = () => {
      if (playerPresenter.isConnected && playerPresenter.playerName === null) {
        playerPresenter.setIsLoading(true);
        startTransition(async () => {
          const nameFound = await loadPlayerName( playerPresenter.wallet.publicKey?.toString()! )
          if (nameFound) {
            playerPresenter.updatePlayerName(nameFound)
            playerPresenter.setIsLoading(false);
          }
        });
      }
    }
    playerName();
  }, [playerPresenter.isConnected]);

  // console.log('aiState...', aiState)
  // console.log('messages...', messages)

  useEffect(() => {
    setNewChatId(id)
  })

  useEffect(() => {
    missingKeys.map(key => {
      toast.error(`Missing ${key} environment variable!`)
    })
  }, [missingKeys])

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor()

  return (
    <div
      className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
      ref={scrollRef}
    >
      <div
        className={cn('pb-[200px] pt-4 md:pt-10', className)}
        ref={messagesRef}
      >
        {messages.length ? (
          <ChatList messages={messages} isShared={false} session={session} />
        ) : (
          <EmptyScreen />
        )}
        {playerPresenter.walletModal && !playerPresenter.isConnected && <WalletModal /> }
        <div className="w-full h-px" ref={visibilityRef} />
      </div>
      <ChatPanel
        id={id}
        input={input}
        setInput={setInput}
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />
    </div>
  )
})
