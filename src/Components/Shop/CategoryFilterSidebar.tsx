import React, { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { Category } from '../../../type'

interface props {
  categories: Category[]
  activeCategoryId: number
  priceMin: string
  priceMax: string
  onApplyPrice: (min: string, max: string) => void
}

const CategoryFilterSidebar = ({ categories, activeCategoryId, priceMin, priceMax, onApplyPrice }: props) => {
  const { t } = useLanguage()
  const [min, setMin] = useState(priceMin)
  const [max, setMax] = useState(priceMax)

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault()
    onApplyPrice(min, max)
  }

  return (
    <aside className="flex flex-col gap-6">
      <div className="bg-white border border-cream rounded-2xl shadow-soft overflow-hidden">
        <div className="bg-brand-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-3.5">
          {t('shop.filterCategories')}
        </div>
        <nav className="flex flex-col divide-y divide-cream/60 max-h-96 overflow-y-auto">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className={`px-4 py-2.5 text-xs font-medium transition-colors duration-150 ${
                cat.id === activeCategoryId
                  ? 'bg-brand-50 text-brand-600 font-semibold'
                  : 'text-neutral-600 hover:bg-surface'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </nav>
      </div>

      <form onSubmit={handleApply} className="bg-white border border-cream rounded-2xl shadow-soft p-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-brand-950 mb-3">{t('shop.priceRange')}</h3>
        <div className="flex items-center gap-2 mb-3">
          <input
            type="number"
            min={0}
            placeholder={t('shop.min')}
            value={min}
            onChange={(e) => setMin(e.target.value)}
            className="w-full h-9 px-2.5 rounded-lg border border-cream text-xs outline-none focus:border-brand-500"
          />
          <span className="text-neutral-400 text-xs">{t('shop.to')}</span>
          <input
            type="number"
            min={0}
            placeholder={t('shop.max')}
            value={max}
            onChange={(e) => setMax(e.target.value)}
            className="w-full h-9 px-2.5 rounded-lg border border-cream text-xs outline-none focus:border-brand-500"
          />
        </div>
        <button
          type="submit"
          className="w-full h-9 bg-brand-600 text-white rounded-lg text-xs font-semibold hover:bg-brand-500 transition-colors"
        >
          {t('shop.applyFilter')}
        </button>
      </form>
    </aside>
  )
}

export default CategoryFilterSidebar
