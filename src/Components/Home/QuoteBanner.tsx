import React from 'react'
import Link from 'next/link'
import { DailyQuote } from '@/lib/externalApi'
import { useLanguage } from '@/contexts/LanguageContext'

interface props {
  quote: DailyQuote | null
}

const QuoteBanner = ({ quote }: props) => {
  const { t } = useLanguage()

  if (!quote) return null

  return (
    <section className="mt-12 w-full">
      <div className="relative vibrant-panel-soft rounded-3xl p-8 sm:p-10 text-center overflow-hidden">
        <div className="absolute top-4 left-6 text-6xl text-brand-300/60 font-serif leading-none select-none">&ldquo;</div>
        <blockquote className="relative max-w-2xl mx-auto">
          <p className="text-base sm:text-lg text-brand-800 font-medium leading-relaxed italic">
            {quote.content}
          </p>
          <footer className="mt-4 text-sm text-neutral-500">— {quote.author}</footer>
        </blockquote>
        <Link href="/magazine" className="inline-block mt-6 text-xs font-semibold text-brand-600 hover:underline">
          {t('home.exploreMagazine')} →
        </Link>
      </div>
    </section>
  )
}

export default QuoteBanner
