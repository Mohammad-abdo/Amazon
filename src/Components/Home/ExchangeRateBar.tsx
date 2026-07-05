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
    <div className="mx-4 sm:mx-6 mt-6 bg-gradient-to-r from-brand-950 via-brand-900 to-brand-800 rounded-2xl px-5 py-4 shadow-card overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNCkiLz48L3N2Zz4=')] opacity-50" />
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-brand-600/30 flex items-center justify-center">
            <HiOutlineCurrencyDollar className="text-brand-200 text-lg" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-300">{t('home.liveRates')}</p>
            <p className="text-xs text-brand-100">{t('home.ratesUpdated')} {rates.date}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {Object.entries(rates.rates).map(([code, value]) => (
            <div
              key={code}
              className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-1.5 text-center min-w-[72px]"
            >
              <span className="text-[10px] text-brand-200 block font-medium">
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
