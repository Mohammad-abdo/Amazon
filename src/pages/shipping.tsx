import Head from 'next/head'
import Image from 'next/image'
import { GetStaticProps } from 'next'
import { CountryInfo, ExchangeRates, getExchangeRates, getShippingCountries } from '@/lib/externalApi'
import { useLanguage } from '@/contexts/LanguageContext'
import {
  HiOutlineGlobeAlt,
  HiOutlineTruck,
  HiOutlineClock,
  HiOutlineShieldCheck,
} from 'react-icons/hi'

interface props {
  countries: CountryInfo[]
  rates: ExchangeRates | null
}

const SHIPPING_FEATURES = [
  { icon: HiOutlineTruck, key: 'feature1' as const },
  { icon: HiOutlineClock, key: 'feature2' as const },
  { icon: HiOutlineShieldCheck, key: 'feature3' as const },
  { icon: HiOutlineGlobeAlt, key: 'feature4' as const },
]

const Shipping = ({ countries, rates }: props) => {
  const { t } = useLanguage()

  return (
    <>
      <Head>
        <title>{t('shipping.pageTitle')} - Souqi</title>
        <meta name="description" content={t('shipping.pageDescription')} />
      </Head>
      <main className="bg-surface min-h-screen pb-20">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-8">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-2xl bg-brand-600 flex items-center justify-center mx-auto mb-4 shadow-card">
              <HiOutlineGlobeAlt className="text-white text-3xl" />
            </div>
            <h1 className="text-3xl font-extrabold text-brand-950">{t('shipping.title')}</h1>
            <p className="text-sm text-neutral-500 mt-2 max-w-lg mx-auto">{t('shipping.subtitle')}</p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {SHIPPING_FEATURES.map(({ icon: Icon, key }) => (
              <div key={key} className="bg-white border border-cream rounded-2xl p-5 shadow-soft text-center">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center mx-auto mb-3">
                  <Icon className="text-brand-600 text-xl" />
                </div>
                <h3 className="text-sm font-bold text-brand-950 mb-1">{t(`shipping.${key}Title`)}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">{t(`shipping.${key}Desc`)}</p>
              </div>
            ))}
          </div>

          {/* Exchange rates */}
          {rates && (
            <div className="bg-gradient-to-r from-brand-950 to-brand-800 rounded-3xl p-6 sm:p-8 mb-12">
              <h2 className="text-lg font-bold text-white mb-1">{t('shipping.ratesTitle')}</h2>
              <p className="text-xs text-brand-200 mb-5">{t('home.ratesUpdated')} {rates.date}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {Object.entries(rates.rates).map(([code, value]) => (
                  <div key={code} className="bg-white/10 border border-white/10 rounded-2xl p-4 text-center">
                    <span className="text-[10px] text-brand-200 block mb-1">1 USD</span>
                    <span className="text-lg font-extrabold text-white">{value.toFixed(2)}</span>
                    <span className="text-[10px] text-brand-300 block mt-0.5">{code}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Countries grid */}
          <div>
            <h2 className="text-xl font-bold text-brand-950 mb-2">{t('shipping.countriesTitle')}</h2>
            <p className="text-sm text-neutral-500 mb-6">{t('shipping.countriesSubtitle')}</p>

            {countries.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {countries.map((country) => (
                  <div
                    key={country.code}
                    className="bg-white border border-cream rounded-2xl p-4 flex flex-col items-center gap-3 shadow-soft hover:shadow-card hover:border-brand-200 transition-all duration-200"
                  >
                    <div className="relative w-16 h-11 rounded-lg overflow-hidden shadow-sm">
                      <Image src={country.flag} alt={country.name} fill className="object-cover" unoptimized />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-brand-950">{country.name}</p>
                      <p className="text-[10px] text-neutral-400 font-mono">{country.code}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-neutral-500 text-center py-12">{t('common.loading')}</p>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const [countries, rates] = await Promise.all([getShippingCountries(), getExchangeRates()])
  return { props: { countries, rates }, revalidate: 3600 }
}

export default Shipping
