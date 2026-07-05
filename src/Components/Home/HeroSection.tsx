import React from 'react'
import Banner from '@/Components/Banner'
import CategorySidebar from './CategorySidebar'
import DealCard from './DealCard'
import { Category } from '../../../type'

interface props {
  categories: Category[]
}

const HeroSection = ({ categories }: props) => {
  const dealCategories = categories.slice(0, 2)

  return (
    <div className="w-full pt-4 pb-2">
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[240px_1fr_260px] xl:grid-cols-[260px_1fr_300px] 2xl:grid-cols-[280px_1fr_320px] gap-4 xl:gap-6">
        <CategorySidebar categories={categories} />

        <div className="rounded-2xl xl:rounded-3xl overflow-hidden min-h-[280px] lg:min-h-[360px] xl:min-h-[420px]">
          <Banner compact />
        </div>

        {dealCategories.length > 0 && (
          <div className="hidden lg:flex flex-col gap-4 xl:gap-5">
            {dealCategories.map((cat, idx) => (
              <DealCard key={cat.id} category={cat} eyebrow={idx === 0 ? 'Catch Big Deals' : 'Trending Now'} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HeroSection
