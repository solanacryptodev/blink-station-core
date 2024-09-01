import 'reflect-metadata'
import { nanoid } from '@/lib/utils'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'
import { Button } from "@/components/ui/button";
import Link from 'next/link'

export const metadata = {
  title: 'Blink Station 10'
}

export default async function IndexPage() {
  const id = `station-log-${nanoid()}`
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()

  interface CenteredButtonProps {
    href: string;
    className?: string;
    children: React.ReactNode;
  }

  const CenteredButton: React.FC<CenteredButtonProps> = ({ href, className, children }) => {
    return (
        <div className="flex items-center align-center justify-center min-w-full content-center">
          <div className="w-full max-w-md px-4 justify-end text-right">
            <Link href={href} passHref>
              <Button className={`rounded bg-gradient-to-r from-[#15323F] to-[#102832] hover:from-[#0a191f] hover:to-[#0e232c] opacity-100 ${className || ''}`}>
                {children}
              </Button>
            </Link>
          </div>
        </div>
    );
  };

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <CenteredButton href={`/chat/${id}`} className="text-white">Enter Blink Station 10</CenteredButton>
    </AI>
  )
}
