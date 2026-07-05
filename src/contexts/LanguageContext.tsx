import React, { createContext, useContext, useEffect, useState } from 'react'
import { translations, Language, Translations } from '@/lib/i18n'

type DotPaths<T, P extends string = ''> = {
  [K in keyof T & string]: T[K] extends string
    ? `${P}${K}`
    : DotPaths<T[K], `${P}${K}.`>
}[keyof T & string]

export type TranslationKey = DotPaths<Translations>

const STORAGE_KEY = 'souqi-lang'

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: (key: TranslationKey) => string
  dir: 'ltr' | 'rtl'
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

const resolve = (key: string, lang: Language): string => {
  const parts = key.split('.')
  let value: unknown = translations[lang]
  for (const part of parts) {
    if (typeof value !== 'object' || value === null) return key
    value = (value as Record<string, unknown>)[part]
  }
  return typeof value === 'string' ? value : key
}

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'ar' || stored === 'en') {
      setLanguageState(stored)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    window.localStorage.setItem(STORAGE_KEY, lang)
  }

  const toggleLanguage = () => setLanguage(language === 'en' ? 'ar' : 'en')

  const t = (key: TranslationKey) => resolve(key, language)

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, toggleLanguage, t, dir: language === 'ar' ? 'rtl' : 'ltr' }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
