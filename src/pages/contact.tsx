import React, { useState } from 'react'
import Head from 'next/head'
import { MdEmail } from 'react-icons/md'
import { useLanguage } from '@/contexts/LanguageContext'

const CONTACT_EMAIL = 'support@souqi.example'

const Contact = () => {
  const { t } = useLanguage()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Demo storefront has no backend to receive messages — this simply confirms locally.
    setSubmitted(true)
  }

  const inputClass = 'h-11 px-3 rounded-lg border border-cream text-sm outline-none focus:border-brand-500 w-full'

  return (
    <>
      <Head>
        <title>Contact Us - Souqi</title>
        <meta name="description" content="Get in touch with the Souqi team." />
      </Head>
      <div className="page-container py-12 min-h-[70vh] bg-surface">
        <div className="max-w-lg mx-auto bg-white border border-cream rounded-2xl p-8 shadow-soft">
          <h1 className="text-2xl font-bold text-brand-950 mb-2">{t('contact.title')}</h1>
          <p className="text-sm text-neutral-500 mb-6">
            Have a question? Reach us directly at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-600 hover:underline inline-flex items-center gap-1">
              <MdEmail className="inline" /> {CONTACT_EMAIL}
            </a>{' '}
            or send a message below.
          </p>

          {submitted ? (
            <div className="bg-green-50 border border-green-100 text-green-700 text-sm rounded-xl p-4">
              Thanks, {form.name || 'friend'}! Your message has been noted. We&apos;ll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                required
                placeholder={t('contact.namePlaceholder')}
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className={inputClass}
              />
              <input
                required
                type="email"
                placeholder={t('contact.emailPlaceholder')}
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className={inputClass}
              />
              <textarea
                required
                placeholder={t('contact.messagePlaceholder')}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-cream text-sm outline-none focus:border-brand-500 resize-none h-32"
              />
              <button
                type="submit"
                className="h-11 bg-brand-600 text-white rounded-xl font-semibold text-sm hover:bg-brand-500 transition-colors self-start px-8"
              >
                {t('contact.send')}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}

export default Contact
