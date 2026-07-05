import Head from 'next/head'
import { GetStaticProps } from 'next'
import { getStoreCategories } from '@/lib/externalApi'
import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'

interface props {
  brands: string[]
}

const formatBrand = (slug: string) =>
  slug.split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

const BRAND_ICONS = ['👔', '💍', '📱', '💻', '🏠', '🎮', '🎧', '⌚']

const Brands = ({ brands }: props) => {
  const { t } = useLanguage()

  return (
    <>
      <Head>
        <title>{t('brands.pageTitle')} - Souqi</title>
        <meta name="description" content={t('brands.pageDescription')} />
      </Head>
      <main className="bg-surface min-h-screen pb-20">
        <div className="page-container py-8">
          <div className="text-center mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-600">{t('brands.eyebrow')}</span>
            <h1 className="text-3xl font-extrabold text-brand-950 mt-1">{t('brands.title')}</h1>
            <p className="text-sm text-neutral-500 mt-2 max-w-lg mx-auto">{t('brands.subtitle')}</p>
          </div>

          {brands.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 xl:gap-5">
              {brands.map((brand, idx) => (
                <Link
                  key={brand}
                  href={`/search?q=${encodeURIComponent(brand)}`}
                  className="group bg-white border border-cream rounded-3xl p-6 text-center shadow-soft hover:shadow-card hover:border-brand-200 transition-all duration-300"
                >
                  <span className="text-4xl block mb-3">{BRAND_ICONS[idx % BRAND_ICONS.length]}</span>
                  <h2 className="text-sm font-bold text-brand-950 group-hover:text-brand-600 transition-colors capitalize">
                    {formatBrand(brand)}
                  </h2>
                  <p className="text-[10px] text-neutral-400 mt-1">{t('brands.shopCategory')}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-neutral-500 py-20">{t('common.loading')}</p>
          )}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const brands = await getStoreCategories()
  return { props: { brands }, revalidate: 3600 }
}

export default Brands
