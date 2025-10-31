import MintPageButton from '@/components/button/mintButton'
import GrayLine from '@/components/lines/grayLine'
import MintPageHeading from '@/components/heading/mintPageHeading'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import Image from 'next/image'
import Flow from '@/assets/mint/flow.jpeg'
import QRIS from '@/assets/mint/qris.svg'
import { useMintCtx } from '@/context/mintContext'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { PaymentMethod } from '@/enums/paymentMethod'
import { costValue } from '@/constant/encoteki'

export default function SelectPaymentMethod() {
  const [isWalletPayment, setIsWalletPayment] = useState(true)
  const { setPaymentMethod, setSection } = useMintCtx()
  const { openConnectModal } = useConnectModal()
  const { isConnected } = useAccount()

  const payments = [
    {
      index: 0,
      name: 'Flow',
      method: PaymentMethod.wallet,
      icon: Flow,
    },
    {
      index: 1,
      name: 'QRIS',
      method: PaymentMethod.qris,
      icon: QRIS,
    },
  ]

  const onChangePaymentOpt = (value: string) => {
    if (value === PaymentMethod.wallet) {
      setIsWalletPayment(true)
    } else {
      setIsWalletPayment(false)
    }
  }

  const onClickContinue = () => {
    if (isWalletPayment) {
      // Wallet
      setPaymentMethod(PaymentMethod.wallet)
      if (openConnectModal && !isConnected) {
        openConnectModal()
      }
    } else {
      // QRIS
      setSection(1)
      setPaymentMethod(PaymentMethod.qris)
    }
  }

  return (
    <>
      <MintPageHeading wording="Select Payment Method" action={() => {}} />
      <GrayLine />
      <div className="space-y-8 p-6">
        <RadioGroup
          defaultValue={payments[0].method}
          onValueChange={(value) => onChangePaymentOpt(value)}
        >
          {payments.map((payment, index) => {
            return (
              <div key={index}>
                <div className="flex items-center gap-4 py-3">
                  <RadioGroupItem
                    value={payments[index].method}
                    id={payments[index].method}
                  />

                  <Image
                    src={payment.icon}
                    alt={payment.name}
                    width={32}
                    height={32}
                    className="rounded-md"
                  />

                  <Label htmlFor={payments[index].method} className="text-base">
                    {payment.name}
                  </Label>
                </div>
                <GrayLine />
              </div>
            )
          })}
        </RadioGroup>

        <div className="space-y-3">
          <div className="flex w-full justify-between text-base font-medium">
            <p>Amount</p>
            <p>
              {isWalletPayment
                ? `${costValue.native} FLOW`
                : `Rp. ${(300000).toLocaleString('id-ID')}`}
            </p>
          </div>

          <MintPageButton
            wording={'Continue'}
            action={onClickContinue}
            disabled={false}
          />
        </div>
      </div>
    </>
  )
}
