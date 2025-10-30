import type { Config } from 'tailwindcss'
// tailwind.config.js
import { heroui } from '@heroui/react'

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        desktop: '1280px',
        tablet: '600px',
      },
      fontFamily: {},
      colors: {
        primary: {
          black: '#1A1A1A',
          blue: '#1346AC',
          red: '#D63B29',
          green: '#246234',
        },
        neutral: {
          '10': '#0D140F',
          '30': '#515351',
          '40': '#7D817D',
          '60': '#CCCECC',
        },
        green: {
          '10': '#163C20',
          '90': '#F0FAF3',
        },
        khaki: {
          '60': '#DADA9F',
          '70': '#E7E7C0',
          '80': '#EFEFD6',
          '90': '#F6F6EC',
          '99': '#F9F9F6',
        },
        red: {
          '90': '#FBE8E2',
        },
        brown: {
          '10': '#FEF3CD',
          '90': '#644E02',
        },
        blue: {
          '10': '#CEEEFD',
          '90': '#044462',
        },
      },
      animation: {
        scroll:
          'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
      },
      keyframes: {
        scroll: {
          to: {
            transform: 'translate(calc(-50% - 0.5rem))',
          },
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate'), heroui()],
} satisfies Config
