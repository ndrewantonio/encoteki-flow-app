import { Metadata } from 'next'
import Image from 'next/image'
import NavBar from '@/components/navbar'
import Footer from '@/components/footer'
import { getPartners } from '@/utils/supabase/partners/getPartners'
import { PartnerResponse } from '@/types/supabase'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Partner Deals',
  description: 'Encoteki Partner Deals',
}

export default async function Partners() {
  const partners: PartnerResponse[] = await getPartners()

  return (
    <>
      <NavBar />

      {/* Mobile & Tablet View */}
      <div className="mx-auto w-[calc(100%-32px)] max-w-[450px] py-[72px] tablet:w-[calc(100%-64px)] tablet:max-w-[800px] desktop:hidden">
        <main className="flex flex-col gap-8 desktop:hidden">
          {/* Heading */}
          <header className="desktop:space-y-4">
            <h2 className="text-[32px] font-medium">Partner Deals</h2>
            <h5 className="text-base font-normal">
              Enjoy exclusive deals only for Encoteki holders.
            </h5>
          </header>

          {/* Content */}
          <section className="flex flex-col gap-4 tablet:grid tablet:grid-cols-2 tablet:gap-4">
            {partners.map((partner, index) => (
              <Link key={index} href={`/partner-deals/${partner.id}`}>
                <div className="flex items-center gap-4 rounded-2xl bg-white p-4">
                  <div className="flex h-[154px] w-full flex-1 items-center justify-center">
                    <Image
                      src={partner.image_url}
                      alt="alt"
                      width={100}
                      height={100}
                    />
                  </div>

                  <div className="flex flex-[2] flex-col gap-1 text-left text-black">
                    <p className="text-md font-normal">{partner.name}</p>
                    <p className="text-lg font-medium">{partner.deals}</p>
                    <p className="text-sm font-normal text-neutral-40">
                      {partner.subtopic}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </section>
        </main>
      </div>

      {/* Desktop View */}
      <div className="mx-auto hidden desktop:block desktop:w-[913px] desktop:py-24">
        <main className="flex flex-col gap-12">
          {/* Heading */}
          <header className="desktop:space-y-4">
            <h2 className="text-[48px] font-medium">Partner Deals</h2>
            <h5 className="text-lg font-normal">
              Enjoy exclusive deals only for Encoteki holders.
            </h5>
          </header>

          {/* Content */}
          <div className="grid grid-cols-2 gap-4">
            {partners.map((partner, index) => (
              <Link key={index} href={`/partner-deals/${partner.id}`}>
                <div className="flex items-center bg-white desktop:h-[154px] desktop:w-[450px] desktop:gap-4 desktop:rounded-2xl desktop:p-4">
                  <div className="flex h-fit flex-1 items-center justify-center">
                    <Image
                      src={partner.image_url}
                      alt="alt"
                      width={100}
                      height={100}
                    />
                  </div>

                  <div className="flex flex-[2] flex-col gap-1 text-left text-black">
                    <p className="text-md font-normal">{partner.name}</p>
                    <p className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-medium">
                      {partner.deals}
                    </p>
                    <p className="text-sm font-normal text-neutral-40">
                      {partner.subtopic}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </>
  )
}
