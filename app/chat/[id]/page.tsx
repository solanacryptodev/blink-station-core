import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

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

  let chat = await chatLogPresenter.getChat()

  if (!chat) {
    // console.log("Chat not found in page.tsx, creating new chat");
    const newChatId = chatLogPresenter.createNewChat();
    chat = await chatLogPresenter.getChat();
    if (!chat) {
      console.error("Failed to create new chat");
      notFound();
    }
    // console.log("Redirecting to new chat:", newChatId);
    redirect(`/chat/${newChatId}`);
  }

  // console.log("Rendering chat with ID:", chat.id);
  return (
      <AI initialAIState={{ chatId: chat.id || '', messages: chat.messages || [] }}>
        <Chat
            id={chat.id}
            session={session}
            initialMessages={chat.messages || []}
            missingKeys={missingKeys}
        />
      </AI>
  )
}
