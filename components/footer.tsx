import React from 'react'
import { cn } from '@/lib/utils'
import { MusicPlayer } from "@/components/MusicPlayer";

export function FooterText({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn( 'px-2 text-center text-sm leading-normal text-muted-foreground', className )}
      {...props}
    >
      <MusicPlayer />
    </div>
  )
}
