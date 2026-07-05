import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { HiOutlineUsers, HiOutlineShoppingBag, HiOutlineGlobeAlt, HiOutlineStar } from 'react-icons/hi'

const STATS = [
  { icon: HiOutlineShoppingBag, value: '2,000+', key: 'products' as const },
  { icon: HiOutlineUsers, value: '50K+', key: 'customers' as const },
  { icon: HiOutlineGlobeAlt, value: '12+', key: 'countries' as const },
  { icon: HiOutlineStar, value: '4.8', key: 'rating' as const },
]

const StatsSection = () => {
  const { t } = useLanguage()

  return (
    <section className="mt-12 mx-4 sm:mx-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ icon: Icon, value, key }) => (
          <div
            key={key}
            className="bg-white border border-cream rounded-2xl p-5 text-center shadow-soft hover:shadow-card hover:border-brand-200 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center mx-auto mb-3">
              <Icon className="text-brand-600 text-xl" />
            </div>
            <p className="text-2xl font-extrabold text-brand-950">{value}</p>
            <p className="text-xs text-neutral-500 mt-1">{t(`home.stats.${key}`)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StatsSection
