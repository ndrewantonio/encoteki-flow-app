import MintPageButton from '@/components/button/mintButton'
import MintPageHeading from '@/components/heading/mintPageHeading'
import GrayLine from '@/components/lines/grayLine'
import { Input } from '@/components/ui/input'
import { useMintCtx } from '@/context/mintContext'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import QRISDemo from '@/assets/Demo_QRIS.png'

export default function QrisMethod() {
  const { setPaymentMethod, setSection, section } = useMintCtx()
  const [submitAddressBtn, setSubmitAddressBtn] = useState(true)
  const [address, setAddress] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAddress(value)
  }

  useEffect(() => {
    if (address) {
      setSubmitAddressBtn(false)
    } else {
      setSubmitAddressBtn(true)
    }
  }, [address])

  return (
    <>
      {section === 1 && (
        <>
          <MintPageHeading
            wording="Enter your wallet address"
            action={() => {
              setPaymentMethod('')
              setSection(0)
            }}
          />
          <GrayLine />
          <div className="space-y-8 p-6">
            <section className="space-y-4">
              <p className="text-sm font-normal text-neutral-30">
                Your NFT will be sent to the wallet address you provided. Please
                ensure that it is correct, as we cannot recover NFTs sent to
                incorrect addresses.
              </p>
              <Input
                type="text"
                defaultValue={address}
                onChangeCapture={handleInputChange}
                placeholder="Walet address"
              />
              <button onClick={() => {}}>
                <p className="text-sm font-normal text-neutral-30 hover:text-primary-green">
                  Where to get my wallet address?
                </p>
              </button>
            </section>

            <MintPageButton
              wording={'Continue to payment'}
              action={() => setSection(2)}
              disabled={submitAddressBtn}
            />
          </div>
        </>
      )}

      {section === 2 && (
        <>
          <MintPageHeading wording="Scan QR" action={() => setSection(1)} />
          <GrayLine />
          <div className="space-y-3 p-6">
            <div className="space-y-8">
              <div className="mx-auto size-[240px]">
                <Image src={QRISDemo} alt={'QRIS Demo'} className="size-full" />
              </div>

              <div className="">
                <p className="text-base">Payment instructions</p>
                <ul className="text-style ml-4 list-disc text-sm text-neutral-30">
                  <li>
                    Open app that supports QRIS payment such as GoPay, OVO,
                    DANA, M-Banking
                  </li>
                  <li>Find menu to pay with QR and scan the QR above</li>
                  <li>
                    You will receive message telling your payment is successful,
                    this page will refresh on its own once we have received the
                    payment
                  </li>
                </ul>
              </div>
              <p className="text-sm text-neutral-30">
                Page not refreshing? Click the button below
              </p>
            </div>

            <MintPageButton
              wording={'I have paid'}
              action={() => {}}
              disabled={true}
            />
          </div>
        </>
      )}
    </>
  )
}
