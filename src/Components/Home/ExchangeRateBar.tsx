import React from 'react'
import { ExchangeRates } from '@/lib/externalApi'
import { useLanguage } from '@/contexts/LanguageContext'
import { HiOutlineCurrencyDollar } from 'react-icons/hi'

interface props {
  rates: ExchangeRates | null
}

const CURRENCY_LABELS: Record<string, { en: string; ar: string }> = {
  SAR: { en: 'SAR', ar: 'ريال' },
  EUR: { en: 'EUR', ar: 'يورو' },
  GBP: { en: 'GBP', ar: 'جنيه' },
  AED: { en: 'AED', ar: 'درهم' },
  EGP: { en: 'EGP', ar: 'جنيه مصري' },
}

const ExchangeRateBar = ({ rates }: props) => {
  const { language, t } = useLanguage()

  if (!rates) return null

  return (
    <div className="w-full mt-6 vibrant-panel rounded-2xl xl:rounded-3xl px-5 xl:px-8 py-4 xl:py-5 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.15),transparent_55%)]" />
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/25 flex items-center justify-center">
            <HiOutlineCurrencyDollar className="text-white text-lg" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-100">{t('home.liveRates')}</p>
            <p className="text-xs text-white/90">{t('home.ratesUpdated')} {rates.date}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {Object.entries(rates.rates).map(([code, value]) => (
            <div
              key={code}
              className="bg-white/20 backdrop-blur-sm border border-white/25 rounded-xl px-3 py-1.5 text-center min-w-[72px]"
            >
              <span className="text-[10px] text-brand-50 block font-medium">
                1 USD → {CURRENCY_LABELS[code]?.[language] || code}
              </span>
              <span className="text-sm font-bold text-white">{value.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExchangeRateBar
