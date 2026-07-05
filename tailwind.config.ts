import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/Components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '320px',
        sm: '375px',
        sml: '500px',
        md: '667px',
        mdl: '768px',
        lg: '960px',
        lgl: '1024px',
        xl: '1280px',
      },
      colors: {
        amazon_blue: '#2E1A01',
        amazon_light: '#4D2C01',
        amazon_yellow: '#D47A01',
        amazon_yellow_shadow: '#AD6301',
        lightText: '#78716c',
        surface: '#FDFDFD',
        cream: '#F2E9E1',
        brand: {
          50: '#FDF3E7',
          100: '#FBE4C4',
          200: '#F6C888',
          300: '#F0A94C',
          400: '#E38C1F',
          500: '#D4870A',
          600: '#D47A01',
          700: '#AD6301',
          800: '#7D4701',
          900: '#4D2C01',
          950: '#2E1A01',
        },
      },
      fontFamily: {
        bodyFont: ['Plus Jakarta Sans', 'Noto Sans Arabic', 'sans-serif'],
        displayFont: ['Plus Jakarta Sans', 'Noto Sans Arabic', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 16px -2px rgba(212, 122, 1, 0.08)',
        card: '0 4px 24px -4px rgba(46, 26, 1, 0.06)',
        header: '0 1px 0 rgba(242, 233, 225, 0.8), 0 4px 20px -4px rgba(46, 26, 1, 0.06)',
      },
    },
  },
  plugins: [],
}
export default config
