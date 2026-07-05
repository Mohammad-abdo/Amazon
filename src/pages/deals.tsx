import Head from 'next/head'
import { GetStaticProps } from 'next'
import Products from '@/Components/Products/Products'
import { productProps } from '../../type'
import { getProducts } from '@/lib/api'
import { useLanguage } from '@/contexts/LanguageContext'
import { HiOutlineLightningBolt, HiOutlineTag } from 'react-icons/hi'

interface props {
  deals: productProps[]
}

const Deals = ({ deals }: props) => {
  const { t } = useLanguage()

  return (
    <>
      <Head>
        <title>{t('deals.pageTitle')} - Souqi</title>
        <meta name="description" content={t('deals.pageDescription')} />
      </Head>
      <main className="bg-surface min-h-screen pb-20">
        <div className="max-w-screen-2xl mx-auto">
          {/* Hero */}
          <div className="relative mx-4 sm:mx-6 mt-4 rounded-3xl overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-700 p-8 sm:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(212,122,1,0.3),transparent_60%)]" />
            <div className="relative max-w-xl">
              <div className="flex items-center gap-2 mb-3">
                <HiOutlineLightningBolt className="text-brand-300 text-xl animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-200">{t('deals.eyebrow')}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">{t('deals.title')}</h1>
              <p className="text-sm text-brand-100 leading-relaxed mb-6">{t('deals.subtitle')}</p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full">
                  <HiOutlineTag /> {deals.length} {t('deals.itemsOnSale')}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-brand-600 text-white text-xs font-bold px-4 py-2 rounded-full">
                  {t('deals.upTo')} 40% OFF
                </span>
              </div>
            </div>
          </div>

          {/* Deals grid */}
          <div className="px-4 sm:px-6 mt-10">
            {deals.length > 0 ? (
              <>
                <h2 className="text-xl font-bold text-brand-950 mb-6">{t('deals.hotDeals')}</h2>
                <Products productData={deals} />
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-neutral-500">{t('deals.noDeals')}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const products = await getProducts({ limit: 50 })
    const deals = products
      .filter((p) => p.oldPrice > p.price)
      .sort((a, b) => {
        const discountA = (a.oldPrice - a.price) / a.oldPrice
        const discountB = (b.oldPrice - b.price) / b.oldPrice
        return discountB - discountA
      })
      .slice(0, 16)

    return { props: { deals }, revalidate: 300 }
  } catch {
    return { props: { deals: [] }, revalidate: 60 }
  }
}

export default Deals
