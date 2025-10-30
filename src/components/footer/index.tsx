'use client'

import Image from 'next/image'
import Instagram from '@/assets/icon/instagram.svg'
import Thread from '@/assets/icon/threads.svg'
import X from '@/assets/icon/x.svg'
import Tiktok from '@/assets/icon/tiktok.svg'
import Telegram from '@/assets/icon/telegram.svg'
import ArrowUp from '@/assets/icon/arrow-up.svg'
import Link from 'next/link'

import { usePathname } from 'next/navigation'
import { Encoteki } from '@/constant/encoteki'

export default function Footer() {
  const pathname = usePathname()
  const currentYear: number = new Date().getFullYear()
  const title = 'Join the community and save the world!'
  const copyright = `Encoteki © ${currentYear} All rights reserved`
  const socmed = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: Encoteki.instagram,
    },
    {
      name: 'Thread',
      icon: Thread,
      url: Encoteki.thread,
    },
    {
      name: 'X',
      icon: X,
      url: Encoteki.twitter,
    },
    {
      name: 'Tiktok',
      icon: Tiktok,
      url: Encoteki.tiktok,
    },
    {
      name: 'Telegram',
      icon: Telegram,
      url: Encoteki.telegram,
    },
  ]

  return (
    <footer className="mx-auto w-full bg-primary-green px-6 py-24 tablet:px-16 desktop:px-32 desktop:py-24">
      <div className="flex h-auto flex-col tablet:flex-row tablet:justify-between">
        {/* Left Content */}
        <section className="mb-14 flex flex-col gap-4 tablet:mb-0 tablet:w-1/2 tablet:justify-between tablet:gap-10">
          <h1 className="text-xl font-medium text-white desktop:text-4xl">
            {title}
          </h1>
          <div className="flex gap-9">
            {socmed.map((item, index) => {
              return (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    key={index}
                    src={item.icon}
                    alt={item.name}
                    className="size-[15px] cursor-pointer tablet:size-[30px]"
                  />
                </a>
              )
            })}
          </div>
        </section>

        {/* Right Content */}
        {pathname === '/' ? (
          <div className="flex flex-col justify-between text-right tablet:w-1/2">
            <div className="hidden h-full tablet:flex tablet:flex-col tablet:items-end">
              <Link href="/#home">
                <Image
                  src={ArrowUp}
                  alt={'Back to top'}
                  width={24}
                  className=""
                />
              </Link>
              <p className="mt-3 text-base text-white">Back to top</p>
            </div>

            <p className="text-left text-sm font-normal text-white tablet:text-right">
              {copyright}
            </p>
          </div>
        ) : (
          <div className="flex h-auto items-end">
            <p className="text-sm font-normal text-white">{copyright}</p>
          </div>
        )}
      </div>
    </footer>
  )
}
