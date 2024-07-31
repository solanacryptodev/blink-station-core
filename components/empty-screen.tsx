import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-2xl font-semibold">
          Welcome to Blink Station 10!
        </h1>
        <p className="leading-normal text-muted-foreground text-lg">
          Atlasson will be your trusty AI companion as you explore the{' '}
          <ExternalLink href="https://staratlas.com">Star Atlas</ExternalLink>, Universe.{' '}
        </p>
        <p className="leading-normal text-muted-foreground text-lg">
          Atlasson uses{' '}
          <ExternalLink href="https://build.staratlas.com">
            real-time data
          </ExternalLink>{' '}
          from the Solana blockchain to tell you what is happening across the Galia Expanse. Battles being fought, Starbases being built,
          resources being mined, lore and so much more. Atlasson is your ally in the galaxy.
        </p>
      </div>
    </div>
  )
}
