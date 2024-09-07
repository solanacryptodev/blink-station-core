'use client'

import * as React from 'react'
import {
  SettingsIcon,
  IconSeparator,
  IconVercel
} from '@/components/ui/icons'
// import { UserMenu } from '@/components/user-menu'
import Image from "next/image";
import { observer } from "mobx-react-lite";
import { PlayerPresenter } from "@/presenters/PlayerPresenter";
import { WalletButton } from '@/components/ui/wallet-button';
import { formatNumberWithCommas } from '@/lib/utils';
import { SettingsPresenter } from "@/presenters/SettingsPresenter";
import { useRouter } from "next/navigation";

function UserOrLogin() {
     const router = useRouter();

      return (
        <>
            <div>
                <Image src='/blinkIcon.jpg' width={50} height={50} alt='Blink Station X icon.' className='rounded-full cursor-pointer' onClick={() => {
                    router.push('/')
                }} />
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
    const settingsPresenter = SettingsPresenter.getInstance();

  return (
    <header className="sticky opacity-70 top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
          <React.Suspense fallback={ <div className="flex-1 overflow-auto"/> }>
              <UserOrLogin/>
              {playerPresenter.account && (
                  <>
                      <IconSeparator className="size-6 text-muted-foreground/50" />
                      <div className="rounded-md bg-black border-amber-500 border-2 ml-2 px-2 py-1">
                          {settingsPresenter.isApiKeySet?.length > 0 ? (
                              'Personal Key Activated'
                          ) : (
                              `${playerPresenter.tokensLeft <= 0 ? '0' : formatNumberWithCommas(playerPresenter.tokensLeft)} Tokens`
                          )}
                      </div>
                  </>
              )}
          </React.Suspense>
      </div>
        <div className="flex items-center justify-end space-x-2">
            <SettingsIcon />
        <span className="hidden ml-2 md:flex cursor-pointer" onClick={() => settingsPresenter.activateSettingsModal(true)}>Settings</span>

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
