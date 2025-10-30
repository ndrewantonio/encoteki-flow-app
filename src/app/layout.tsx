import type { Metadata } from 'next'
import './globals.css'
import Provider from './providers'
import '@rainbow-me/rainbowkit/styles.css'
import { Outfit } from 'next/font/google'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'Encoteki',
  description: 'Welcome to Encoteki',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} relative`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
