'use client'

import NavBar from '@/components/navbar'
import { useAccount } from 'wagmi'
import { useMintCtx } from '../../context/mintContext'
import MintConfirmation from './mintConfirmation'
import SelectPaymentMethod from './selectPaymentMethod'
import { PaymentMethod } from '@/enums/paymentMethod'
import { useEffect } from 'react'
import QrisMethod from './qrisMethod'
import WalletMethod from './walletMethod'
import Footer from '@/components/footer'

export default function Mint() {
  const { isConnected } = useAccount()
  const { txSuccess, paymentMethod, setPaymentMethod } = useMintCtx()

  useEffect(() => {
    setPaymentMethod('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <nav className="absolute left-0 right-0 top-0">
        <NavBar />
      </nav>
      <main className="flex h-screen w-full items-center justify-center">
        {!txSuccess ? (
          <section className="h-auto w-[calc(100%-32px)] max-w-[400px] rounded-2xl bg-white drop-shadow-xl">
            {paymentMethod === '' ? (
              <SelectPaymentMethod />
            ) : (
              <>
                {paymentMethod === PaymentMethod.wallet ? (
                  <>
                    {isConnected ? <WalletMethod /> : <SelectPaymentMethod />}
                  </>
                ) : (
                  <QrisMethod />
                )}
              </>
            )}
          </section>
        ) : (
          <MintConfirmation />
        )}
      </main>
      <Footer />
    </>
  )
}
