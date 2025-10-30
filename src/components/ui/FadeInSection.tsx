'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface FadeInSectionProps {
  children: React.ReactNode
  bgColor?: string
}

export default function FadeInSection({
  children,
  bgColor,
}: FadeInSectionProps) {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: bgColor,
      }}
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      whileInView={
        hasScrolled
          ? { opacity: 1, filter: 'blur(0px)' }
          : { opacity: 1, filter: 'blur(0px)', transition: { duration: 0 } }
      }
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.section>
  )
}
