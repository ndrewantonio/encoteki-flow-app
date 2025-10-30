import Image from 'next/image'
import TIGGY from '@/assets/tsb/Tiggy_tp.png'

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-3">
        <Image
          className="animate-spin"
          alt="Loading"
          src={TIGGY}
          width={100}
          height={100}
        />
      </div>
    </div>
  )
}
