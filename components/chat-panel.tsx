import * as React from 'react'

import { shareChat } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { IconShare } from '@/components/ui/icons'
import { FooterText } from '@/components/footer'
import { ChatShareDialog } from '@/components/chat-share-dialog'
import { useAIState, useActions, useUIState } from 'ai/rsc'
import type { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { UserMessage } from './stocks/message'
import { useAmplitude } from "@/lib/hooks/use-amplitude";
import { observer } from 'mobx-react-lite'
import { PlayerPresenter } from "@/presenters/PlayerPresenter";
import { exampleMessages } from '@/lib/metadata'
import { ChatLogPresenter } from "@/presenters/ChatLogPresenter";
import { ExamplePrompts } from "@/lib/types";
import { tokenizeString } from "@/lib/tokenizer";
import { SubscriptionPresenter } from "@/presenters/SubscriptionPresenter";
import { usePathname } from "next/navigation";

export interface ChatPanelProps {
  id?: string
  title?: string
  input: string
  setInput: (value: string) => void
  isAtBottom: boolean
  scrollToBottom: () => void
}

export const ChatPanel = observer(({
  id,
  title,
  input,
  setInput,
  isAtBottom,
  scrollToBottom
}: ChatPanelProps) => {
  const playerPresenter = PlayerPresenter.getInstance();
  const chatLogPresenter = ChatLogPresenter.getInstance();
  const subscriptionPresenter = SubscriptionPresenter.getInstance();

  const [aiState] = useAIState()
  const [messages, setMessages] = useUIState<typeof AI>()
  const { submitUserMessage } = useActions();
  const pathname = usePathname();
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false)
  const { trackEvent } = useAmplitude();

  const startNewChat = async (example: ExamplePrompts) => {
    trackEvent('Example Prompt Clicked', {
      exampleMessage: example.message}
    );

    setMessages( currentMessages => [
      ...currentMessages,
      {
        id: nanoid(),
        display: <UserMessage>{ example.message }</UserMessage>
      }
    ])

    const responseMessage = await submitUserMessage(example.message, subscriptionPresenter.wallet.publicKey?.toString()!);
    chatLogPresenter.addMessageToChat(chatLogPresenter.currentChatId!, responseMessage);

    setMessages( currentMessages => [...currentMessages, responseMessage ])

    const tokens = tokenizeString(example.message);
    await subscriptionPresenter.deductFromTokenCount(tokens * 150);
  };

  return (
    <div className="fixed z-30 inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />

      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="mb-4 grid grid-cols-2 gap-2 px-4 sm:px-0">
          {messages.length === 0 &&
            exampleMessages.map((example, index) => (
                playerPresenter.account ? (
                    <div
                        key={ example.heading }
                        className={ `cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${
                            index > 1 && 'hidden md:block'
                        }` }
                        onClick={async (event) => {
                          event.preventDefault()
                            { pathname.includes('chat') && await startNewChat( example ) }
                        }}
                    >
                      <div className="text-sm font-semibold">{ example.heading }</div>
                      <div className="text-sm text-zinc-600">
                        { example.subheading }
                      </div>
                    </div>
                ) : (
                    <div
                        key={ example.heading }
                        className={ `pointer-events-none cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${
                            index > 1 && 'hidden md:block'
                        }` }
                    >
                      <div className="text-sm font-semibold">{ example.heading }</div>
                      <div className="text-sm text-zinc-600">
                        { example.subheading }
                      </div>
                    </div>
                )
            ))}
        </div>

        { messages?.length >= 2 ? (
            <div className="flex h-12 items-center justify-center">
              <div className="flex space-x-2">
                { id && title ? (
                    <>
                      <Button
                          variant="outline"
                          onClick={ () => setShareDialogOpen( true ) }
                      >
                        <IconShare className="mr-2"/>
                        Share
                      </Button>
                      <ChatShareDialog
                          open={ shareDialogOpen }
                          onOpenChange={ setShareDialogOpen }
                          onCopy={ () => setShareDialogOpen( false ) }
                          shareChat={ shareChat }
                          chat={ {
                            id,
                            title,
                            messages: aiState.messages
                          } }
                      />
                    </>
                ) : null }
              </div>
            </div>
        ) : null }

        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm input={ input } setInput={ setInput }/>
          <FooterText className="hidden sm:block"/>
        </div>
      </div>
    </div>
  )
})
