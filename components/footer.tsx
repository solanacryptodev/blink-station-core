import React from 'react'

import { cn } from '@/lib/utils'
import { ExternalLink } from '@/components/external-link'
import { MusicPlayer } from "@/components/music-player";

export function FooterText({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div>
      <MusicPlayer />
    </div>
  )
}
