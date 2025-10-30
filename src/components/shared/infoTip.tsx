import Image from 'next/image'
import { Tooltip } from '@heroui/react'
import Info from '@/assets/icon/info.svg'

export default function InfoTip({ text }: { text: string }) {
  return (
    <Tooltip content={text} showArrow={true}>
      <Image src={Info} alt="Info" width={18} height={18} />
    </Tooltip>
  )
}
