import Head from 'next/head'
import Link from 'next/link'
import { HiHome, HiOutlineRefresh } from 'react-icons/hi'
import { useLanguage } from '@/contexts/LanguageContext'

const ServerError = () => {
  const { t } = useLanguage()

  return (
    <>
      <Head>
        <title>500 - Souqi</title>
      </Head>
      <div className="min-h-[70vh] bg-surface flex flex-col items-center justify-center px-4 text-center">
        <span className="text-6xl font-extrabold text-brand-100 mb-2">500</span>
        <h1 className="text-xl font-bold text-brand-950 mb-2">{t('error500.title')}</h1>
        <p className="text-sm text-neutral-500 max-w-sm mb-8">{t('error500.subtitle')}</p>
        <div className="flex gap-3">
          <button
            onClick={() => window.location.reload()}
            className="h-11 px-6 bg-brand-600 text-white rounded-xl font-medium text-sm hover:bg-brand-500 transition-all duration-300 flex items-center gap-2"
          >
            <HiOutlineRefresh /> {t('error500.retry')}
          </button>
          <Link href="/">
            <button className="h-11 px-6 border border-cream text-brand-900 rounded-xl font-medium text-sm hover:bg-cream/60 transition-all duration-300 flex items-center gap-2">
              <HiHome /> {t('notFound.goHome')}
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default ServerError
