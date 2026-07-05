import React from 'react'
import { HiOutlineViewGrid, HiOutlineViewList } from 'react-icons/hi'
import { useLanguage } from '@/contexts/LanguageContext'

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'newest'
export type ViewMode = 'grid' | 'list'

interface props {
  resultCount: number
  sort: SortOption
  onSortChange: (sort: SortOption) => void
  view: ViewMode
  onViewChange: (view: ViewMode) => void
}

const SortAndViewBar = ({ resultCount, sort, onSortChange, view, onViewChange }: props) => {
  const { t } = useLanguage()

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-cream rounded-2xl p-4 shadow-soft mb-6">
      <p className="text-xs text-neutral-500 font-medium">
        {t('shop.showingResults')} {resultCount} {t('shop.results')}
      </p>

      <div className="flex items-center gap-3">
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="h-9 px-3 rounded-lg border border-cream text-xs font-medium outline-none focus:border-brand-500 bg-white"
        >
          <option value="default">{t('shop.defaultSorting')}</option>
          <option value="price-asc">{t('shop.priceLowHigh')}</option>
          <option value="price-desc">{t('shop.priceHighLow')}</option>
          <option value="newest">{t('shop.newest')}</option>
        </select>

        <div className="flex items-center border border-cream rounded-lg overflow-hidden">
          <button
            onClick={() => onViewChange('grid')}
            className={`w-9 h-9 flex items-center justify-center ${view === 'grid' ? 'bg-brand-600 text-white' : 'text-neutral-400 hover:bg-surface'}`}
            title="Grid view"
          >
            <HiOutlineViewGrid />
          </button>
          <button
            onClick={() => onViewChange('list')}
            className={`w-9 h-9 flex items-center justify-center ${view === 'list' ? 'bg-brand-600 text-white' : 'text-neutral-400 hover:bg-surface'}`}
            title="List view"
          >
            <HiOutlineViewList />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SortAndViewBar
