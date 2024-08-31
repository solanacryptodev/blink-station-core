'use client'

import { FormEvent, useEffect, useRef, useState } from "react";
import Textarea from 'react-textarea-autosize'
import { useActions, useUIState } from 'ai/rsc'
import { UserMessage } from './stocks/message'
import { type AI } from '@/lib/chat/actions'
import { Button } from '@/components/ui/button'
import { IconArrowElbow, IconPlus } from '@/components/ui/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { nanoid } from 'nanoid'
import { usePathname, useRouter } from 'next/navigation'
import { observer } from "mobx-react-lite";
import { SubscriptionPresenter } from "@/presenters/SubscriptionPresenter";
import { tokenizeString } from '@/lib/tokenizer';
import { ChatLogPresenter } from "@/presenters/ChatLogPresenter";
import Link from 'next/link'

export const PromptForm = observer(({
  input,
  setInput
}: {
  input: string
  setInput: (value: string) => void
}) => {
      const subscriptionPresenter = SubscriptionPresenter.getInstance();
      const chatLogPresenter = ChatLogPresenter.getInstance();

      const router = useRouter();
      const path = usePathname();
      const { formRef, onKeyDown } = useEnterSubmit()
      const [isNavigating, setIsNavigating] = useState(false);
      const inputRef = useRef<HTMLTextAreaElement>(null)
      const { submitUserMessage } = useActions()
      const pathname = usePathname();
      const [_, setMessages] = useUIState<typeof AI>()

      useEffect(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, [])

    const handleGenerateID = async (event: FormEvent): Promise<string> => {
        event.preventDefault()

        let currentChatId = chatLogPresenter.currentChatId;
        if (!currentChatId || !pathname.includes('/chat/')) {
            currentChatId = chatLogPresenter.createNewChat();
            console.log("Created new chat ID:", currentChatId);
            setIsNavigating(true);
            try {
                router.push( `/chat/${ currentChatId }` );
            } finally {
                setIsNavigating(false);
            }
        }

        return currentChatId;
    }

    const handleSubmitMessage = async(event: FormEvent) => {
        const value = input.trim()
        setInput('')
        if (!value) return

        event.preventDefault()
        setMessages(currentMessages => [
            ...currentMessages,
            {
                id: nanoid(),
                display: <UserMessage>{value}</UserMessage>
            }
        ])

        const responseMessage = await submitUserMessage(value)
        chatLogPresenter.addMessageToChat(chatLogPresenter.currentChatId!, responseMessage)

        setMessages(currentMessages => [...currentMessages, responseMessage])

        const tokens = tokenizeString(value);
        await subscriptionPresenter.deductFromTokenCount(tokens * 150);
    }

    return (
    <form ref={formRef} onSubmit={async (event) => {
        const id = await handleGenerateID(event);
        if ( id && pathname.includes('/chat/') ) {
            await handleSubmitMessage(event);
        }
    }}>
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-[14px] size-8 rounded-full bg-background p-0 sm:left-4"
              // onClick={() => {
              //   router.push('/new')
              // }}
            >
              <IconPlus />
              <span className="sr-only">New Chat</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>New Chat</TooltipContent>
        </Tooltip>
        <Textarea
          disabled={subscriptionPresenter.account.length === 0}
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder={subscriptionPresenter.account.length === 0 ? "Create an account" : "Write a message..."}
          className="min-h-[60px] w-full z-70 resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <div className="absolute right-0 top-[13px] sm:right-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="submit" size="icon" disabled={input === ''}>
                <IconArrowElbow />
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  )
})
