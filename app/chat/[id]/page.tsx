import { notFound } from 'next/navigation'

import { auth } from '@/auth'
import { getMissingKeys } from '@/app/actions'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { Session } from '@/lib/types'
import { ChatLogPresenter } from "@/presenters/ChatLogPresenter";

export const metadata = {
  title: 'Blink Station 10 - Chat'
}

export default async function ChatPage({ params }: { params: { id: string } }) {
  const session = await auth() as Session
  const missingKeys = await getMissingKeys()
  const chatLogPresenter = ChatLogPresenter.getInstance()

  chatLogPresenter.setID(params.id);  // Set the current chat ID
  let chat = await chatLogPresenter.getChat()

  if (!chat) {
    // Create a new chat if it doesn't exist
    chatLogPresenter.createNewChat(params.id);
    chat = await chatLogPresenter.getChat()

    if (!chat) {
      console.error("Failed to create chat for ID:", params.id);
      notFound();
    }
  }

  return (
      <AI initialAIState={{ chatId: params.id, messages: chat.messages || [] }}>
        <Chat
            id={params.id}
            session={session}
            initialMessages={chat.messages || []}
            missingKeys={missingKeys}
        />
      </AI>
  )
}
