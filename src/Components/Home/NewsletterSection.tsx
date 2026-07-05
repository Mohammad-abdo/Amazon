import React, { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { HiOutlineMail } from 'react-icons/hi'

const NewsletterSection = () => {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section className="mt-12 mx-4 sm:mx-6 mb-4">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 p-8 sm:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(212,122,1,0.2),transparent_50%)]" />
        <div className="relative max-w-xl mx-auto text-center">
          <div className="w-12 h-12 rounded-2xl bg-brand-600/30 flex items-center justify-center mx-auto mb-4">
            <HiOutlineMail className="text-brand-200 text-2xl" />
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-2">{t('home.newsletterTitle')}</h2>
          <p className="text-sm text-brand-100 mb-6">{t('home.newsletterSubtitle')}</p>

          {submitted ? (
            <p className="text-brand-200 font-semibold text-sm animate-pulse">{t('home.newsletterSuccess')}</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('home.newsletterPlaceholder')}
                className="flex-1 h-11 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-brand-200 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20"
              />
              <button
                type="submit"
                className="h-11 px-6 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-semibold text-sm transition-colors shadow-md whitespace-nowrap"
              >
                {t('home.newsletterBtn')}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default NewsletterSection
