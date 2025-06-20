'use client';

import { HeroUIProvider } from "@heroui/react";

export default function HeroUIProviderWrapper({ children, }: Readonly<{ children: React.ReactNode; }>){
    return (
        <HeroUIProvider>
            {children}
        </HeroUIProvider>
    )
}