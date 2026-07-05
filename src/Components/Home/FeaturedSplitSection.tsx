import React from 'react'
import Link from 'next/link'
import ProductImage from '@/Components/Products/ProductImage'
import FormattedPrice from '@/Components/Products/FormattedPrice'
import { productProps } from '../../../type'
import { useLanguage } from '@/contexts/LanguageContext'
import { FaStar } from 'react-icons/fa'

interface props {
  products: productProps[]
}

const FeaturedSplitSection = ({ products }: props) => {
  const { t } = useLanguage()

  if (products.length < 5) return null

  const [hero, ...rest] = products.slice(0, 5)

  return (
    <section className="mt-12 w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-extrabold text-brand-950">{t('home.featuredTitle')}</h2>
        <Link href="/categories" className="text-xs font-semibold text-brand-600 hover:text-brand-500">
          {t('home.viewAll')} →
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xl:gap-5">
        <Link
          href={`/product/${hero._id}`}
          className="group relative rounded-3xl overflow-hidden bg-brand-950 min-h-[320px] sm:min-h-[380px] flex flex-col justify-end p-6 sm:p-8 shadow-card hover:shadow-glow transition-shadow duration-300"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,122,1,0.35),transparent_55%)]" />
          <div className="absolute top-6 right-6 w-44 h-44 sm:w-52 sm:h-52 opacity-90 group-hover:scale-105 transition-transform duration-500 relative">
            <ProductImage src={hero.image} alt={hero.title} fill className="object-contain drop-shadow-2xl" />
          </div>
          <div className="relative z-10 max-w-[70%]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-300">{hero.category}</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-2 line-clamp-2">{hero.title}</h3>
            <p className="text-sm text-brand-100 line-clamp-2 mb-4">{hero.description}</p>
            <span className="inline-flex items-center gap-2 text-xl font-bold text-white">
              <FormattedPrice amount={hero.price} />
            </span>
            <span className="block mt-4 text-xs font-semibold text-brand-200 group-hover:text-white transition-colors">
              {t('home.shopNow')} →
            </span>
          </div>
        </Link>

        <div className="grid grid-cols-2 gap-4 xl:gap-5">
          {rest.map((product) => (
            <Link
              key={product._id}
              href={`/product/${product._id}`}
              className="group bg-white rounded-3xl p-4 sm:p-5 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col"
            >
              <div className="relative h-28 sm:h-32 mb-3 flex items-center justify-center bg-brand-50/50 rounded-2xl overflow-hidden">
                <ProductImage
                  src={product.image}
                  alt={product.title}
                  width={120}
                  height={120}
                  className="object-contain max-h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-500 mb-1">{product.category}</span>
              <h4 className="text-sm font-semibold text-brand-950 line-clamp-2 flex-1 group-hover:text-brand-600 transition-colors">
                {product.title}
              </h4>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-brand-50">
                <span className="text-sm font-bold text-brand-600">
                  <FormattedPrice amount={product.price} />
                </span>
                <FaStar className="text-amber-400 text-xs" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedSplitSection
