import React from 'react'
import Link from 'next/link'
import FormattedPrice from '@/Components/Products/FormattedPrice'
import { TopRatedItem } from '@/lib/externalApi'
import { useLanguage } from '@/contexts/LanguageContext'
import { FaStar } from 'react-icons/fa'
import { HiOutlineArrowRight } from 'react-icons/hi'

interface props {
  items: TopRatedItem[]
}

const TopRatedSection = ({ items }: props) => {
  const { t } = useLanguage()

  if (items.length === 0) return null

  return (
    <section className="mt-12 px-4 sm:px-6">
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-600">{t('home.topRatedEyebrow')}</span>
          <h2 className="text-2xl font-bold text-brand-950 mt-1">{t('home.topRatedTitle')}</h2>
        </div>
        <Link href="/categories" className="hidden sm:flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-500">
          {t('home.viewAllProducts')} <HiOutlineArrowRight />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-cream rounded-2xl p-5 shadow-soft hover:shadow-card hover:border-brand-200 transition-all duration-300 flex flex-col"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-500 mb-2">{item.category}</span>
            <h3 className="text-sm font-semibold text-brand-950 line-clamp-2 flex-1 mb-3">{item.title}</h3>
            <div className="flex items-center gap-1.5 mb-3">
              <FaStar className="text-amber-400 text-xs" />
              <span className="text-xs font-bold text-brand-950">{item.rating.toFixed(1)}</span>
              <span className="text-[10px] text-neutral-400">({item.reviews} {t('home.reviews')})</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-cream">
              <span className="text-base font-bold text-brand-600">
                <FormattedPrice amount={item.price} />
              </span>
              <Link href="/categories" className="text-[11px] font-semibold text-brand-600 hover:underline">
                {t('home.shopNow')}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TopRatedSection
