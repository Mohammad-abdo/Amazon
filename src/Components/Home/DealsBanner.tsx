import React from 'react'
import Link from 'next/link'
import { HiOutlineLightningBolt } from 'react-icons/hi'
import { useLanguage } from '@/contexts/LanguageContext'

const DealsBanner = () => {
  const { t } = useLanguage()

  return (
    <section className="mt-10 mx-4 sm:mx-6">
      <Link
        href="/deals"
        className="group relative block overflow-hidden rounded-3xl bg-gradient-to-r from-brand-600 via-brand-500 to-brand-700 p-6 sm:p-8 shadow-card hover:shadow-lg transition-all duration-300"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-950/20 rounded-full translate-y-1/2 -translate-x-1/4 blur-xl" />

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <HiOutlineLightningBolt className="text-white text-2xl" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-100">{t('home.dealsEyebrow')}</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">{t('home.dealsTitle')}</h2>
              <p className="text-sm text-brand-100 mt-1 max-w-md">{t('home.dealsSubtitle')}</p>
            </div>
          </div>
          <span className="inline-flex items-center justify-center h-11 px-6 bg-white text-brand-700 rounded-full font-bold text-sm group-hover:scale-105 transition-transform duration-300 shadow-md self-start sm:self-auto">
            {t('home.shopDeals')} →
          </span>
        </div>
      </Link>
    </section>
  )
}

export default DealsBanner
