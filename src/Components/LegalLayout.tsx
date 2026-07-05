import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

interface props {
  titleKey: 'privacy.title' | 'terms.title' | 'returns.title'
  children: React.ReactNode
}

const LegalLayout = ({ titleKey, children }: props) => {
  const { t } = useLanguage()

  return (
    <>
      <Head>
        <title>{t(titleKey)} - Souqi</title>
      </Head>
      <main className="bg-surface min-h-screen pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <Link href="/" className="text-xs font-semibold text-neutral-500 hover:text-brand-600 transition-colors mb-6 inline-block">
            ← {t('notFound.goHome')}
          </Link>
          <h1 className="text-3xl font-extrabold text-brand-950 mb-8">{t(titleKey)}</h1>
          <div className="bg-white border border-cream rounded-3xl p-6 sm:p-10 shadow-soft space-y-6">
            {children}
          </div>
        </div>
      </main>
    </>
  )
}

export const LegalSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h2 className="text-base font-bold text-brand-950 mb-2">{title}</h2>
    <div className="text-sm text-neutral-600 leading-relaxed space-y-2">{children}</div>
  </div>
)

export default LegalLayout
