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
        '2xl': '1536px',
        '3xl': '1920px',
      },
      maxWidth: {
        page: '1760px',
        wide: '1920px',
      },
      colors: {
        amazon_blue: '#523120',
        amazon_light: '#704208',
        amazon_yellow: '#D47A01',
        amazon_yellow_shadow: '#B86801',
        lightText: '#8B7355',
        surface: '#FFFBF7',
        cream: '#F2E9E1',
        peach: '#FFF5EB',
        ink: '#523120',
        pastel: {
          pink: '#FDE8F0',
          blue: '#E3F0FF',
          mint: '#E0F5EE',
          lavender: '#EDE8FD',
          yellow: '#FFF6E0',
          sand: '#FFF0E6',
        },
        brand: {
          50: '#FFFBF5',
          100: '#FEF4E8',
          200: '#FBE4C4',
          300: '#F0A94C',
          400: '#E8952E',
          500: '#DE8310',
          600: '#D47A01',
          700: '#B86801',
          800: '#945508',
          900: '#704208',
          950: '#523120',
        },
      },
      fontFamily: {
        bodyFont: ['Plus Jakarta Sans', 'Noto Sans Arabic', 'sans-serif'],
        displayFont: ['Plus Jakarta Sans', 'Noto Sans Arabic', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 20px -4px rgba(212, 122, 1, 0.12)',
        card: '0 8px 32px -8px rgba(212, 122, 1, 0.15)',
        header: '0 1px 0 rgba(251, 228, 196, 0.9), 0 4px 24px -6px rgba(212, 122, 1, 0.1)',
        glow: '0 8px 28px -4px rgba(212, 122, 1, 0.35)',
      },
      backgroundImage: {
        'warm-gradient': 'linear-gradient(135deg, #FEF4E8 0%, #FFFBF7 50%, #FFF5EB 100%)',
        'orange-gradient': 'linear-gradient(135deg, #E8952E 0%, #D47A01 50%, #B86801 100%)',
        'orange-soft': 'linear-gradient(135deg, #FBE4C4 0%, #FEF4E8 100%)',
      },
    },
  },
  plugins: [],
}
export default config
