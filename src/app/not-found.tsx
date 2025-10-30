import Link from 'next/link'
import Image from 'next/image'
import NotFoundImg from '@/assets/404.png'

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[488px] text-center font-normal">
        <Image
          src={NotFoundImg}
          alt="404 Not Found"
          className="m-auto h-[182px] w-[272px] tablet:h-[325px] tablet:w-[488px]"
        />
        <h1 className="mb-2 text-2xl font-medium tablet:text-3xl">
          This page is lost in the wild
        </h1>
        <p className="text-sm tablet:text-base">
          The page you are looking for cannot be found. Please recheck the URL
          and try again.
        </p>
        <Link href="/">
          <button className="my-8 rounded-[32px] bg-primary-green px-6 py-3 text-white">
            Go back home
          </button>
        </Link>
      </div>
    </div>
  )
}
