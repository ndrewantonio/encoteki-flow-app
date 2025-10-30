'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import EncotekiLogo from '@/assets/encoteki-icon.png'
import HomepageNav from './homepageNav'
import NavbarButton from '../button/navbarButton'
import ConnectWalletButton from '../button/connectWalletButton'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function NavBar() {
  const pathname = usePathname()
  const { isConnected } = useAccount()

  return (
    <nav className="flex items-center justify-between px-4 pt-4 tablet:px-8 tablet:pt-8">
      {pathname === '/' ? (
        <>
          <div className="flex items-center gap-12">
            <div className="flex flex-col-reverse tablet:flex-row tablet:gap-2">
              <Link href="/">
                <Image
                  src={EncotekiLogo}
                  alt="alt"
                  className="h-[54px] w-[79px] tablet:block tablet:h-[64px] tablet:w-[92px]"
                />
              </Link>
            </div>

            {/* Desktop Homepage Nav */}
            <HomepageNav />
          </div>

          <div className="flex items-center gap-4">
            <Link href="/dao">
              <NavbarButton isPrimary={false} wording={'DAO'} />
            </Link>
            <Link href="/mint">
              <NavbarButton isPrimary={true} wording={'Mint'} />
            </Link>
          </div>
        </>
      ) : (
        <Link href="/">
          <Image
            src={EncotekiLogo}
            alt="alt"
            className="h-[54px] w-[79px] tablet:h-[64px] tablet:w-[92px]"
          />
        </Link>
      )}

      {pathname === '/partner-deals' && <></>}

      {pathname === '/mint' && (
        <Link href="/dao">
          <NavbarButton isPrimary={false} wording={'DAO'} />
        </Link>
      )}

      {pathname.startsWith('/dao') && (
        <div className="flex flex-col-reverse gap-2 tablet:flex-row tablet:gap-4">
          <Link href="/mint">
            <NavbarButton
              isPrimary={true}
              wording={'Mint'}
              className="hidden tablet:block"
            />
          </Link>
          {isConnected ? <ConnectButton /> : <ConnectWalletButton />}
        </div>
      )}

      {pathname.startsWith('/partner-deals') && (
        <div className="flex flex-col-reverse gap-2 tablet:flex-row tablet:gap-4">
          {isConnected ? <ConnectButton /> : <ConnectWalletButton />}
        </div>
      )}
    </nav>
  )
}
