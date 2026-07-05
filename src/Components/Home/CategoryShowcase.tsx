import React from 'react'
import Link from 'next/link'
import ProductImage from '@/Components/Products/ProductImage'
import { Category } from '../../../type'
import { useLanguage } from '@/contexts/LanguageContext'
import { HiOutlineArrowRight } from 'react-icons/hi'

interface props {
  categories: Category[]
}

const CategoryShowcase = ({ categories }: props) => {
  const { t } = useLanguage()

  if (categories.length === 0) return null

  return (
    <section className="mt-12 px-4 sm:px-6">
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-600">{t('home.categoriesEyebrow')}</span>
          <h2 className="text-2xl font-bold text-brand-950 mt-1">{t('home.categoriesTitle')}</h2>
        </div>
        <Link href="/categories" className="hidden sm:flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-500">
          {t('home.viewAllCategories')} <HiOutlineArrowRight />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.slice(0, 12).map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className="group relative bg-white border border-cream rounded-2xl overflow-hidden shadow-soft hover:shadow-card hover:border-brand-200 transition-all duration-300"
          >
            <div className="relative pt-[80%] bg-cream/40">
              <ProductImage
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-0 inset-x-0 p-3">
              <p className="text-xs font-bold text-white line-clamp-2 leading-snug">{cat.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default CategoryShowcase
