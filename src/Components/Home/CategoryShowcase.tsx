import React from 'react'
import Link from 'next/link'
import ProductImage from '@/Components/Products/ProductImage'
import { Category } from '../../../type'
import { useLanguage } from '@/contexts/LanguageContext'
import { HiOutlineArrowRight } from 'react-icons/hi'

const PASTELS = [
  'bg-pastel-pink',
  'bg-pastel-blue',
  'bg-pastel-mint',
  'bg-pastel-lavender',
  'bg-pastel-yellow',
  'bg-pastel-sand',
]

interface props {
  categories: Category[]
}

const CategoryShowcase = ({ categories }: props) => {
  const { t } = useLanguage()

  if (categories.length === 0) return null

  return (
    <section className="mt-12 w-full">
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-600">{t('home.categoriesEyebrow')}</span>
          <h2 className="text-2xl font-bold text-brand-950 mt-1">{t('home.categoriesTitle')}</h2>
        </div>
        <Link href="/categories" className="hidden sm:flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-500">
          {t('home.viewAllCategories')} <HiOutlineArrowRight />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-8 gap-4 xl:gap-5">
        {categories.slice(0, 12).map((cat, idx) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className="group relative rounded-3xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300"
          >
            <div className={`relative pt-[100%] ${PASTELS[idx % PASTELS.length]} flex items-center justify-center`}>
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <ProductImage
                  src={cat.image}
                  alt={cat.name}
                  width={80}
                  height={80}
                  className="object-contain w-16 h-16 sm:w-20 sm:h-20 group-hover:scale-110 transition-transform duration-500 drop-shadow-md"
                />
              </div>
            </div>
            <div className="bg-white px-3 py-3 text-center">
              <p className="text-xs font-bold text-brand-950 line-clamp-2 leading-snug group-hover:text-brand-600 transition-colors">{cat.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default CategoryShowcase
