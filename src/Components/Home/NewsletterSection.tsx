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
    <section className="mt-12 w-full mb-4">
      <div className="relative overflow-hidden rounded-3xl vibrant-panel-soft p-8 sm:p-12">
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-300/30 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-brand-400/20 rounded-full translate-y-1/2 -translate-x-1/4 blur-xl" />
        <div className="relative max-w-xl mx-auto text-center">
          <div className="w-12 h-12 rounded-2xl bg-brand-500 flex items-center justify-center mx-auto mb-4 shadow-glow">
            <HiOutlineMail className="text-white text-2xl" />
          </div>
          <h2 className="text-2xl font-extrabold text-ink mb-2">{t('home.newsletterTitle')}</h2>
          <p className="text-sm text-brand-800/80 mb-6">{t('home.newsletterSubtitle')}</p>

          {submitted ? (
            <p className="text-brand-600 font-semibold text-sm">{t('home.newsletterSuccess')}</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('home.newsletterPlaceholder')}
                className="flex-1 h-11 px-4 rounded-xl bg-white border border-brand-200 text-ink placeholder:text-brand-400/70 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-400/25 shadow-sm"
              />
              <button
                type="submit"
                className="h-11 px-6 bg-brand-500 hover:bg-brand-400 text-white rounded-xl font-semibold text-sm transition-all shadow-glow hover:scale-[1.02] whitespace-nowrap"
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
