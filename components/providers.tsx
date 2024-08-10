'use client'

import { useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { SidebarProvider } from '@/lib/hooks/use-sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { createContext, ReactNode } from "react";
import { RootStore } from "@/stores/RootStore";

interface StoreProviderProps {
    children: ReactNode;
}

const StoreContext = createContext<RootStore | null>(null);

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
    const [store] = useState(() => new RootStore());

    useEffect(() => {
        store.initializeStores();
    }, [store]);

    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    );
};

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <StoreProvider>
        <NextThemesProvider {...props}>
            <SidebarProvider>
                <TooltipProvider>{children}</TooltipProvider>
            </SidebarProvider>
        </NextThemesProvider>
    </StoreProvider>
  )
}
