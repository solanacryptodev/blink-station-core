'use client'

import { useEffect, useRef } from "react";
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
import Image from "next/image";
import * as React from "react";

export const PromptForm = observer(({
  input,
  setInput
}: {
  input: string
  setInput: (value: string) => void
}) => {
      const subscriptionPresenter = SubscriptionPresenter.getInstance();
      const chatLogPresenter = ChatLogPresenter.getInstance();

      const { formRef, onKeyDown } = useEnterSubmit()
      const inputRef = useRef<HTMLTextAreaElement>(null)
      const { submitUserMessage } = useActions()
      const pathname = usePathname();
      const [_, setMessages] = useUIState<typeof AI>()

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    const handleSubmitMessage = async(message: string) => {
        const value = message.trim()
        setInput('')
        if (!value) return

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
        event.preventDefault();
        { pathname.includes('chat') && await handleSubmitMessage(input) }
    }}>
      <div className={`relative border ${
          !subscriptionPresenter.wallet?.connected
              ? 'border-red-500'
              : subscriptionPresenter.account.length === 0
                  ? 'border-red-500'
                  : !subscriptionPresenter.sageAccount
                      ? 'bg-red-500'
                  : subscriptionPresenter.tokenCount <= 0
                      ? 'border-red-500'
                      : 'border-amber-500'
      } flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12`}>
        <Tooltip>
          <TooltipTrigger asChild>
              <Image src='/blinkIcon.jpg' width={30} height={30} alt='Blink Station X icon.' className='absolute left-0 top-[14px] size-8 rounded-full bg-background p-0 sm:left-4' />
          </TooltipTrigger>
          <TooltipContent>Atlasson</TooltipContent>
        </Tooltip>
        <Textarea
          disabled={subscriptionPresenter.account.length === 0 || subscriptionPresenter.tokenCount <= 0}
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder={
              !subscriptionPresenter.wallet?.connected
                  ? "Connect Your Wallet"
                  : !subscriptionPresenter.sageAccount
                      ? "Create a Player Profile in Sage"
                  : subscriptionPresenter.account.length === 0
                      ? "Create an account"
                  : subscriptionPresenter.tokenCount <= 0
                      ? "You've run out of tokens"
                      : "Write a message..."
          }
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
              <Button
                  type="submit"
                  size="icon"
                  disabled={input === ''}
                  className={`${
                      !subscriptionPresenter.wallet?.connected
                          ? 'bg-red-300'
                          : !subscriptionPresenter.sageAccount
                              ? 'bg-red-300'
                          : subscriptionPresenter.account.length === 0
                              ? 'bg-red-300'
                          : subscriptionPresenter.tokenCount <= 0
                              ? 'bg-red-300'
                              : 'bg-amber-300'
                  }`}
              >
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
