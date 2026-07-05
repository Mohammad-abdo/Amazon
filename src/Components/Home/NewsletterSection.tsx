import React, { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

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
    <section className="mt-14 w-full -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-10 2xl:-mx-12">
      <div className="bg-brand-500 px-4 sm:px-8 lg:px-12 py-8 sm:py-10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-1">{t('home.newsletterTitle')}</h2>
            <p className="text-sm text-brand-100">{t('home.newsletterSubtitle')}</p>
          </div>

          {submitted ? (
            <p className="text-white font-semibold text-sm text-center">{t('home.newsletterSuccess')}</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full md:max-w-md flex-shrink-0">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('home.newsletterPlaceholder')}
                className="flex-1 h-12 px-5 rounded-full bg-white text-brand-950 placeholder:text-neutral-400 text-sm outline-none focus:ring-2 focus:ring-brand-300 shadow-sm"
              />
              <button
                type="submit"
                className="h-12 px-8 bg-brand-950 hover:bg-brand-800 text-white rounded-full font-bold text-sm transition-all hover:scale-[1.02] whitespace-nowrap shadow-md"
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
