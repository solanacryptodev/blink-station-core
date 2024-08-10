'use client'

import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { auth } from '@/auth'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  IconGitHub,
  IconSeparator,
  IconVercel
} from '@/components/ui/icons'
// import { UserMenu } from '@/components/user-menu'
import { SidebarMobile } from './sidebar-mobile'
import { SidebarToggle } from './sidebar-toggle'
import { ChatHistory } from './chat-history'
import { Session } from '@/lib/types'
import Image from "next/image";
import { observer } from "mobx-react-lite";
import { PlayerPresenter } from "@/presenters/PlayerPresenter";
import { WalletButton } from '@/components/ui/wallet-button';

function UserOrLogin() {
    // const session = (await auth()) as Session
  return (
    <>
        {/*{session?.user ? (*/}
        {/*  <>*/}
        {/*    <SidebarMobile>*/}
        {/*      <ChatHistory userId={session.user.id} />*/}
        {/*    </SidebarMobile>*/}
        {/*    <SidebarToggle />*/}
        {/*  </>*/}
        {/*) : (*/}
        {/*  <div>*/}
        {/*    <Image src='/blinkIcon.jpg' width={50} height={50} alt='Blink Station X icon.' className='rounded-full' />*/}
        {/*  </div>*/}
        {/*)}*/}
        <div>
            <Image src='/blinkIcon.jpg' width={50} height={50} alt='Blink Station X icon.' className='rounded-full' />
        </div>
          <div className="flex items-center">
            <IconSeparator className="size-6 text-muted-foreground/50" />
              <div>Blink Station 10</div>
          </div>
    </>
  )
}

export const Header = observer(() => {
    const playerPresenter = PlayerPresenter.getInstance();

  return (
    <header className="sticky opacity-70 top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <UserOrLogin />
        </React.Suspense>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <IconGitHub />
        <span className="hidden ml-2 md:flex">Settings</span>

          {playerPresenter.isConnected ? (
              playerPresenter.wallet?.name === 'Phantom' && <WalletButton backgroundColor='645E8F' hoverColor='7A73AD' status="Disconnect" /> ||
              playerPresenter.wallet?.name === 'Solflare' && <WalletButton backgroundColor='B43E24' hoverColor='B43E24' status="Disconnect" /> ||
              playerPresenter.wallet?.name === 'Ledger' && <WalletButton backgroundColor='7F5B32' hoverColor='7F5B32' status="Disconnect" />
          ) : (
              <WalletButton backgroundColor="194555" hoverColor="7F5B32" status="Connect" />
          )}
      </div>
    </header>
  )
})
