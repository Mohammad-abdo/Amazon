import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CountryInfo } from '@/lib/externalApi'
import { useLanguage } from '@/contexts/LanguageContext'
import { HiOutlineGlobeAlt } from 'react-icons/hi'

interface props {
  countries: CountryInfo[]
}

const ShippingCountriesSection = ({ countries }: props) => {
  const { t } = useLanguage()

  if (countries.length === 0) return null

  return (
    <section className="mt-12 w-full bg-cream/50 border border-cream rounded-3xl p-6 sm:p-8 xl:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-brand-600 flex items-center justify-center shadow-soft">
            <HiOutlineGlobeAlt className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-brand-950">{t('home.shippingTitle')}</h2>
            <p className="text-xs text-neutral-500">{t('home.shippingSubtitle')}</p>
          </div>
        </div>
        <Link
          href="/shipping"
          className="text-xs font-semibold text-brand-600 hover:text-brand-500 transition-colors self-start sm:self-auto"
        >
          {t('home.viewShippingInfo')} →
        </Link>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-3">
        {countries.map((country) => (
          <div
            key={country.code}
            className="bg-white border border-cream rounded-2xl p-3 flex flex-col items-center gap-2 hover:shadow-soft hover:border-brand-200 transition-all duration-200"
            title={country.name}
          >
            <div className="relative w-10 h-7 rounded overflow-hidden shadow-sm">
              <Image src={country.flag} alt={country.name} fill className="object-cover" unoptimized />
            </div>
            <span className="text-[10px] font-semibold text-brand-900 text-center line-clamp-1">{country.code}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ShippingCountriesSection
