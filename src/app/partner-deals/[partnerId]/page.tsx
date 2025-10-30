'use client'

import Loading from '@/app/loading'
import SDGBadge from '@/components/badge/sdgBadge'
import Breadcrumb from '@/components/breadcrumbs/breadcrumbs'
import DefaultButton from '@/components/button/defaultButton'
import ExternalRedirectionBtn from '@/components/button/redirectionButton'
import Footer from '@/components/footer'
import GrayLine from '@/components/lines/grayLine'
import NavBar from '@/components/navbar'
import { PartnerResponse, SDGResponse } from '@/types/supabase'
import { getPartnerById } from '@/utils/supabase/partners/getPartnerById'
import { getSDGsByIds } from '@/utils/supabase/partners/getSDGsByIds'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import contractConfig from '@/config/contract-config'

type Params = Promise<{ partnerId: string }>

export default function PartnerDealPage({ params }: { params: Params }) {
  const { isConnected, address } = useAccount()
  const { openConnectModal } = useConnectModal()
  const [isHolder, setIsHolder] = useState(false)
  const [showButton, setShowButton] = useState(true)
  const constantDemoCode = 'DEMOPROMOCODE'

  // Get nft id of address wallet
  const { data, isSuccess } = useReadContract({
    abi: contractConfig.tsbd,
    address: contractConfig.tsbdAddress,
    functionName: 'walletOfOwner',
    args: [address ?? '0x1c3294B823cF9ac62940c64E16bce6ebAf7dca5B'],
  })

  const [loading, setLoading] = useState(true)
  const [partner, setPartner] = useState<PartnerResponse>({
    id: 0,
    name: '',
    deals: '',
    subtopic: '',
    image_url: '',
    partner_url: '',
    tnc: '',
    type: '',
  })
  const [sdgs, setSDGs] = useState<SDGResponse[]>([])

  useEffect(() => {
    const fetchPartners = async (partnerId: string) => {
      try {
        const partner: PartnerResponse = await getPartnerById(Number(partnerId))
        setPartner(partner)
      } catch (error) {
        console.error('Fetch partner failed:', error)
      } finally {
        setLoading(false)
      }
    }

    const fetchSDGs = async (partnerId: string) => {
      try {
        const sdgs: SDGResponse[] = await getSDGsByIds(Number(partnerId))
        setSDGs(sdgs)
      } catch (error) {
        console.error('Fetch SDG list failed:', error)
      } finally {
        setLoading(false)
      }
    }

    const walletcount = async () => {
      try {
        if (!isConnected || !isSuccess) return

        // Convert BigInt array to number array
        const walletOfOwner = (data as bigint[]).map((id) => Number(id))

        if (walletOfOwner.length > 0) {
          setIsHolder(true)
        }
      } catch (error) {
        console.error('Fetch SDG list failed:', error)
      } finally {
        setLoading(false)
      }
    }

    const init = async () => {
      try {
        if (!isConnected) setShowButton(true)

        const { partnerId } = await params
        await fetchPartners(partnerId)
        document.title = partner.name
        await fetchSDGs(partnerId)
        await walletcount()
      } catch (error) {
        console.error('Init Partner failed:', error)
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      }
    }

    init()
  }, [data, isConnected, isSuccess, params, partner.name])

  const breadcrumbs = [
    {
      index: 1,
      page: 'Home',
      link: '/',
    },
    {
      index: 2,
      page: 'Partner Deals',
      link: '/partner-deals',
    },
    {
      index: 3,
      page: partner.name,
      link: `/partner-deals/${partner.id}`,
    },
  ]

  const claimDeals = () => {
    if (isConnected) {
      setShowButton(false)
    } else {
      if (openConnectModal) openConnectModal()
    }
  }

  return (
    <>
      <NavBar />

      {loading ? (
        <Loading />
      ) : (
        <>
          <main className="mx-auto my-16 w-[calc(100%-32px)] max-w-[912px] space-y-12 tablet:my-24">
            <Breadcrumb items={breadcrumbs} />

            <div className="rounded-[32px] bg-white">
              <header className="p-4 text-base">Deal info</header>
              <GrayLine />

              {/* Desktop View */}
              <div className="hidden w-full gap-8 p-6 desktop:flex">
                {/* Deals Detail */}
                <article className="h-[100px] w-3/5 space-y-4">
                  <h3 className="text-2xl font-medium">{partner.deals}</h3>
                  <ul className="ml-4 list-disc text-base">
                    <div dangerouslySetInnerHTML={{ __html: partner.tnc }} />
                  </ul>
                </article>

                <section className="h-auto w-2/5 space-y-4">
                  {/* Partner Logo */}
                  <div className="flex size-24 items-center rounded-2xl bg-white drop-shadow-lg">
                    <Image
                      src={partner.image_url}
                      alt="alt"
                      width={100}
                      height={100}
                    />
                  </div>

                  {/* About Partner */}
                  <div className="flex flex-col gap-4">
                    {/* Partner Info */}
                    <div className="space-y-2">
                      <p className="text-lg">{partner.name}</p>
                      <p className="text-sm text-neutral-40">
                        {partner.subtopic}
                      </p>
                    </div>

                    {showButton ? (
                      <DefaultButton
                        wording={'Claim deals'}
                        isPrimary={false}
                        className="h-auto w-full py-2"
                        action={claimDeals}
                      />
                    ) : (
                      <p className="py-2 text-center text-primary-green">
                        {isHolder ? (
                          <>
                            {partner.type === 'offline'
                              ? 'Eligible for the deals'
                              : constantDemoCode}
                          </>
                        ) : (
                          'Ineligible for the deals'
                        )}
                      </p>
                    )}

                    {/* Partner Store */}
                    <ExternalRedirectionBtn
                      wording={'See store'}
                      url={partner.partner_url}
                    />
                  </div>
                  <GrayLine />

                  {/* SDG */}
                  <div className="space-y-3">
                    <p className="text-sm text-neutral-30">
                      This brand supports these SDGs
                    </p>
                    <div className="flex w-full flex-wrap gap-2">
                      {sdgs.map((sdg, index) => {
                        return (
                          <div key={index}>
                            <SDGBadge
                              wording={`#${sdg.sdg_number} ${sdg.name}`}
                              bgColor={sdg.bg_color}
                              textColor={sdg.text_color}
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </section>
              </div>

              {/* Mobile/Tablet View */}
              <div className="flex flex-grow flex-col justify-between gap-8 p-6 desktop:hidden">
                <section className="h-auto w-full space-y-6">
                  {/* About Partner */}
                  <div className="flex gap-4">
                    {/* Partner Logo */}
                    <div className="flex size-20 items-center rounded-2xl bg-white drop-shadow-lg">
                      <Image
                        src={partner.image_url}
                        alt="alt"
                        width={80}
                        height={80}
                      />
                    </div>
                    {/* Partner Info */}
                    <div className="flex w-3/4 flex-col gap-4">
                      <div className="space-y-1">
                        <p className="text-sm">{partner.name}</p>
                        <p className="text-base font-medium">{partner.deals}</p>
                        <p className="text-sm text-neutral-40">
                          {partner.subtopic}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* SDG */}
                  <div className="space-y-3">
                    <p className="text-sm text-neutral-30">
                      This brand supports these SDGs
                    </p>
                    <div className="flex w-full flex-wrap gap-2">
                      {sdgs.map((sdg, index) => {
                        return (
                          <div key={index}>
                            <SDGBadge
                              wording={`#${sdg.sdg_number} ${sdg.name}`}
                              bgColor={sdg.bg_color}
                              textColor={sdg.text_color}
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Deals Detail */}
                  <article className="h-auto space-y-4">
                    <ul className="ml-4 list-disc text-sm">
                      <div dangerouslySetInnerHTML={{ __html: partner.tnc }} />
                    </ul>
                  </article>
                </section>

                {showButton ? (
                  <DefaultButton
                    wording={'Claim deals'}
                    isPrimary={false}
                    className="py-1"
                    action={claimDeals}
                  />
                ) : (
                  <p className="py-2 text-center text-primary-green">
                    {isHolder ? (
                      <>
                        {partner.type === 'offline'
                          ? 'Eligible for the deals'
                          : constantDemoCode}
                      </>
                    ) : (
                      'Ineligible for the deals'
                    )}
                  </p>
                )}
                <ExternalRedirectionBtn
                  wording={'See store'}
                  url={partner.partner_url}
                />
              </div>
            </div>
          </main>
        </>
      )}

      <Footer />
    </>
  )
}
