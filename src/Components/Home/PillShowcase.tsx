import React from 'react'
import Link from 'next/link'
import ProductImage from '@/Components/Products/ProductImage'
import FormattedPrice from '@/Components/Products/FormattedPrice'
import { productProps } from '../../../type'
import { useLanguage } from '@/contexts/LanguageContext'

const PILL_STYLES = [
  { bg: 'bg-pastel-pink', blob: 'bg-pastel-lavender' },
  { bg: 'bg-pastel-blue', blob: 'bg-pastel-mint' },
]

interface props {
  products: productProps[]
}

const PillShowcase = ({ products }: props) => {
  const { t } = useLanguage()

  if (products.length < 2) return null

  return (
    <section className="mt-10 w-full space-y-5">
      {products.slice(0, 2).map((product, idx) => {
        const style = PILL_STYLES[idx % PILL_STYLES.length]
        const reverse = idx % 2 === 1

        return (
          <div
            key={product._id}
            className={`pill-card relative ${style.bg} p-5 sm:p-6 md:p-8 min-h-[200px] sm:min-h-[220px] flex items-center overflow-hidden`}
          >
            <div className={`pastel-blob w-64 h-64 ${style.blob} ${reverse ? '-left-20 top-1/2 -translate-y-1/2' : '-right-16 top-0'}`} />

            <div className={`relative w-full flex flex-col md:flex-row items-center gap-6 md:gap-10 ${reverse ? 'md:flex-row-reverse' : ''}`}>
              <Link
                href={`/product/${product._id}`}
                className="relative w-full md:w-[42%] h-40 sm:h-48 flex items-center justify-center flex-shrink-0"
              >
                <ProductImage
                  src={product.image}
                  alt={product.title}
                  width={280}
                  height={280}
                  className="object-contain max-h-full w-auto drop-shadow-lg transform group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              <div className={`flex-1 text-center ${reverse ? 'md:text-right' : 'md:text-left'}`}>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-600">
                  {product.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-brand-950 mt-1 mb-2 line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-sm text-neutral-600 line-clamp-2 mb-4 max-w-md mx-auto md:mx-0">
                  {product.description}
                </p>
                <div className={`flex flex-col sm:flex-row items-center gap-3 ${reverse ? 'md:justify-end' : 'md:justify-start'}`}>
                  <span className="text-2xl font-extrabold text-brand-600">
                    <FormattedPrice amount={product.price} />
                  </span>
                  <Link href={`/product/${product._id}`}>
                    <button className="h-11 px-7 bg-brand-950 text-white rounded-full font-semibold text-sm hover:bg-brand-800 active:scale-[0.98] transition-all shadow-md">
                      {t('home.shopNow')}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default PillShowcase
