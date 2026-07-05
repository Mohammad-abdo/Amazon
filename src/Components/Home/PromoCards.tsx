import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { HiOutlineLightningBolt, HiOutlineBookOpen, HiOutlineTruck } from 'react-icons/hi'

const PROMOS = [
  {
    icon: HiOutlineLightningBolt,
    key: 'deals' as const,
    href: '/deals',
    bg: 'bg-[#5B3A8C]',
    accent: 'from-white/10 to-transparent',
  },
  {
    icon: HiOutlineTruck,
    key: 'shipping' as const,
    href: '/shipping',
    bg: 'bg-neutral-100',
    accent: 'from-brand-100/50 to-transparent',
    dark: true,
  },
  {
    icon: HiOutlineBookOpen,
    key: 'magazine' as const,
    href: '/magazine',
    bg: 'bg-brand-500',
    accent: 'from-white/15 to-transparent',
  },
]

const PromoCards = () => {
  const { t } = useLanguage()

  return (
    <section className="mt-12 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xl:gap-5">
        {PROMOS.map(({ icon: Icon, key, href, bg, accent, dark }) => (
          <Link
            key={key}
            href={href}
            className={`group relative overflow-hidden rounded-3xl ${bg} p-6 sm:p-7 min-h-[160px] flex flex-col justify-between shadow-soft hover:shadow-card hover:scale-[1.01] transition-all duration-300`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${accent}`} />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-white/10 blur-2xl" />

            <div className="relative">
              <Icon className={`text-3xl mb-3 ${dark ? 'text-brand-600' : 'text-white/80'}`} />
              <h3 className={`text-lg font-bold mb-1 ${dark ? 'text-brand-950' : 'text-white'}`}>
                {t(`home.promo.${key}Title`)}
              </h3>
              <p className={`text-xs leading-relaxed max-w-[200px] ${dark ? 'text-neutral-600' : 'text-white/80'}`}>
                {t(`home.promo.${key}Desc`)}
              </p>
            </div>

            <span
              className={`relative text-xs font-bold mt-4 inline-flex items-center gap-1 ${
                dark ? 'text-brand-600 group-hover:text-brand-500' : 'text-white group-hover:underline'
              }`}
            >
              {t('home.promo.cta')} →
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default PromoCards
