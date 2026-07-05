import React from 'react'
import SouqiLogoIcon from '@/Components/SouqiLogoIcon'
import { useLanguage } from '@/contexts/LanguageContext'

interface LogoProps {
  className?: string
  variant?: 'light' | 'dark'
  showTagline?: boolean
}

const Logo = ({ className = '', variant = 'light', showTagline = false }: LogoProps) => {
  const { language } = useLanguage()
  const isDark = variant === 'dark'

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span className="flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
        <SouqiLogoIcon className="w-9 h-9" color="#D47A01" />
      </span>
      <div className="flex flex-col leading-none">
        <span
          className={`font-extrabold text-xl tracking-tight ${
            isDark
              ? 'text-white'
              : 'text-brand-700'
          }`}
        >
          {language === 'ar' ? 'سوقي' : 'SOUQI'}
        </span>
        {showTagline && (
          <span
            className={`text-[9px] font-medium uppercase tracking-[0.2em] mt-0.5 ${
              isDark ? 'text-brand-200' : 'text-neutral-500'
            }`}
          >
            E-Commerce Marketplace
          </span>
        )}
      </div>
    </div>
  )
}

export default Logo
