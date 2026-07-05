import Head from 'next/head'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { HiOutlineGift } from 'react-icons/hi'

const AMOUNTS = [25, 50, 100, 200]

const GiftCards = () => {
  const { t } = useLanguage()

  return (
    <>
      <Head>
        <title>{t('giftCards.pageTitle')} - Souqi</title>
        <meta name="description" content={t('giftCards.pageDescription')} />
      </Head>
      <main className="bg-surface min-h-screen pb-20">
        <div className="page-container py-8">
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-brand-600 flex items-center justify-center mx-auto mb-4 shadow-card">
              <HiOutlineGift className="text-white text-3xl" />
            </div>
            <h1 className="text-3xl font-extrabold text-brand-950">{t('giftCards.title')}</h1>
            <p className="text-sm text-neutral-500 mt-2 max-w-md mx-auto">{t('giftCards.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            {AMOUNTS.map((amount) => (
              <div
                key={amount}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 p-8 shadow-card hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
                <p className="text-brand-100 text-xs font-semibold uppercase tracking-wider mb-1">{t('giftCards.cardLabel')}</p>
                <p className="text-4xl font-extrabold text-white mb-4">${amount}</p>
                <button className="h-10 px-5 bg-white text-brand-700 rounded-xl font-bold text-sm hover:bg-brand-50 transition-colors">
                  {t('giftCards.buyNow')}
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white border border-cream rounded-3xl p-6 sm:p-8 shadow-soft text-center">
            <p className="text-sm text-neutral-600 leading-relaxed mb-4">{t('giftCards.note')}</p>
            <Link href="/contact" className="text-sm font-semibold text-brand-600 hover:underline">
              {t('giftCards.contactUs')} →
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default GiftCards
