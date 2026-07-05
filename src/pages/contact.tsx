import React, { useState } from 'react'
import Head from 'next/head'
import { MdEmail } from 'react-icons/md'

const CONTACT_EMAIL = 'support@nexis-shop.example'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Demo storefront has no backend to receive messages — this simply confirms locally.
    setSubmitted(true)
  }

  const inputClass = 'h-11 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:border-indigo-500 w-full'

  return (
    <>
      <Head>
        <title>Contact Us - Nexis Premium E-Commerce</title>
        <meta name="description" content="Get in touch with the Nexis team." />
      </Head>
      <div className="max-w-screen-2xl mx-auto py-12 px-4 sm:px-6 min-h-[70vh] bg-slate-50">
        <div className="max-w-lg mx-auto bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Contact Us</h1>
          <p className="text-sm text-slate-500 mb-6">
            Have a question? Reach us directly at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-600 hover:underline inline-flex items-center gap-1">
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
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className={inputClass}
              />
              <input
                required
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className={inputClass}
              />
              <textarea
                required
                placeholder="Your message"
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-indigo-500 resize-none h-32"
              />
              <button
                type="submit"
                className="h-11 bg-slate-900 text-white rounded-xl font-semibold text-sm hover:bg-indigo-600 transition-colors self-start px-8"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}

export default Contact
