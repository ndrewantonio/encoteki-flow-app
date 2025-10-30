import Link from 'next/link'

export default function HomepageNav() {
  const homepageNavs = [
    { label: 'Collection', href: '#collection' },
    { label: 'Benefit', href: '#benefit' },
    { label: 'About', href: '#about' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <div className="hidden gap-8 desktop:flex">
      {homepageNavs.map((nav, index) => {
        return (
          <Link
            key={index}
            href={nav.href}
            className="duration-300 hover:text-primary-green"
          >
            {nav.label}
          </Link>
        )
      })}
    </div>
  )
}
