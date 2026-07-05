import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { HiOutlineLightningBolt, HiOutlineBookOpen, HiOutlineTruck } from 'react-icons/hi'

const PROMOS = [
  { icon: HiOutlineLightningBolt, key: 'deals' as const, href: '/deals', gradient: 'from-brand-400 to-brand-600' },
  { icon: HiOutlineTruck, key: 'shipping' as const, href: '/shipping', gradient: 'from-brand-500 to-brand-700' },
  { icon: HiOutlineBookOpen, key: 'magazine' as const, href: '/magazine', gradient: 'from-brand-300 to-brand-500' },
]

const PromoCards = () => {
  const { t } = useLanguage()

  return (
    <section className="mt-12 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PROMOS.map(({ icon: Icon, key, href, gradient }) => (
          <Link
            key={key}
            href={href}
            className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} p-6 shadow-card hover:scale-[1.02] transition-transform duration-300`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
            <Icon className="text-white/80 text-3xl mb-4" />
            <h3 className="text-lg font-bold text-white mb-1">{t(`home.promo.${key}Title`)}</h3>
            <p className="text-xs text-white/75 leading-relaxed mb-4">{t(`home.promo.${key}Desc`)}</p>
            <span className="text-xs font-bold text-white group-hover:underline">{t('home.promo.cta')} →</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default PromoCards
