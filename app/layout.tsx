import 'reflect-metadata'
import '@/app/globals.css'
import { Chakra_Petch } from 'next/font/google'
import { cn } from '@/lib/utils'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/sonner'
import Starfield from '@/components/ui/backgrounds/Starfield'
import { SidebarDesktop } from '@/components/sidebar-desktop'
// import { usePathname } from "next/navigation";

const chakra = Chakra_Petch({
  weight: '400',
  display: 'swap',
  subsets: ['latin'],
})

export const metadata = {
  title: {
    default: 'Blink Station 10',
    template: `%s `
  },
  description: 'An AI-powered chatbot for the Star Atlas Universe.',
  icons: {
    icon: '/blinkIcon64.ico',
    shortcut: '/faviconIcon.png',
    apple: '/blinkIcon.png'
  }
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  // const pathname = usePathname()
  // const isChatPage = pathname?.startsWith('/chat/')

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'antialiased',
            chakra.className
        )}
      >
        <Toaster position="top-center" />
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Starfield
                starCount={2000}
                starColor={[255, 255, 255]}
                speedFactor={0.10}
                backgroundColor="black"
            />
            <Header />
            <main className="flex flex-col flex-1 bg-muted/50">
                  <div className="relative flex h-[calc(100vh_-_theme(spacing.16))]">
                    <SidebarDesktop />
                    {children}
                  </div>
            </main>
          </div>
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  )
}
