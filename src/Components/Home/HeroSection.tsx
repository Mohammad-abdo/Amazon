import React from 'react'
import Banner from '@/Components/Banner'
import CategoryCircles from './CategoryCircles'
import { Category } from '../../../type'

interface props {
  categories: Category[]
}

const HeroSection = ({ categories }: props) => {
  return (
    <div className="w-full pt-4 pb-2">
      <div className="rounded-3xl overflow-hidden shadow-card min-h-[280px] md:min-h-[360px] xl:min-h-[400px] 2xl:min-h-[440px]">
        <Banner compact />
      </div>
      <CategoryCircles categories={categories} />
    </div>
  )
}

export default HeroSection
