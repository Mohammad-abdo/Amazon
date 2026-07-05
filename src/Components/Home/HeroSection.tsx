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
    <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[220px_1fr_240px] gap-4 px-4 sm:px-6 pt-4">
      <CategorySidebar categories={categories} />

      <div className="rounded-2xl overflow-hidden">
        <Banner compact />
      </div>

      {dealCategories.length > 0 && (
        <div className="hidden lg:flex flex-col gap-4">
          {dealCategories.map((cat, idx) => (
            <DealCard key={cat.id} category={cat} eyebrow={idx === 0 ? 'Catch Big Deals' : 'Trending Now'} />
          ))}
        </div>
      )}
    </div>
  )
}

export default HeroSection
