import 'reflect-metadata'
import { nanoid } from '@/lib/utils'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'
import PhotoGrid from "@/components/photo-grid";
import { ChatLogPresenter } from "@/presenters/ChatLogPresenter";

export const metadata = {
  title: 'Blink Station 10'
}

export default async function IndexPage() {
    const chatLogPresenter = ChatLogPresenter.getInstance()
  const id = `station-log-${nanoid()}`
    chatLogPresenter.setID(id);
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()
  const shdwDrive = process.env.NEXT_PUBLIC_SHDW!

  const homePhotos = [
      `https://shdw-drive.genesysgo.net/${shdwDrive}/blinkstation3.png`,
      `https://shdw-drive.genesysgo.net/${shdwDrive}/blinkstation5.png`,
      `https://shdw-drive.genesysgo.net/${shdwDrive}/blinkstation6.png`,
      `https://shdw-drive.genesysgo.net/${shdwDrive}/blinkstation7.png`
  ]

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <PhotoGrid id={id} photos={homePhotos} />
    </AI>
  )
}
