'use client'

import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { config } from '../config/rainbowkit-config'
import { MintProvider } from '@/context/mintContext'
import { DaoProvider } from '@/context/daoContext'
import { HeroUIProvider } from '@heroui/react'

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const queryClient = new QueryClient()

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <HeroUIProvider>
            <MintProvider>
              <DaoProvider>{children}</DaoProvider>
            </MintProvider>
          </HeroUIProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
