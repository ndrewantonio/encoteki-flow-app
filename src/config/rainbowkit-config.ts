import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { flowTestnet } from 'viem/chains'

export const config = getDefaultConfig({
  appName: 'Encoteki Dev',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? '',
  chains: [flowTestnet],
  ssr: true,
})
