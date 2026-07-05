import React from 'react'
import Link from 'next/link'
import ProductImage from '@/Components/Products/ProductImage'
import { Category } from '../../../type'

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

const CategoryCircles = ({ categories }: props) => {
  if (categories.length === 0) return null

  return (
    <div className="w-full mt-6 -mx-1 px-1">
      <div className="flex gap-4 sm:gap-5 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
        {categories.slice(0, 10).map((cat, idx) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className="group flex flex-col items-center gap-2.5 flex-shrink-0 snap-start min-w-[72px] sm:min-w-[84px]"
          >
            <div
              className={`relative w-[68px] h-[68px] sm:w-[76px] sm:h-[76px] rounded-full ${PASTELS[idx % PASTELS.length]} flex items-center justify-center overflow-hidden ring-2 ring-white shadow-soft group-hover:scale-105 group-hover:shadow-card transition-all duration-300`}
            >
              <ProductImage
                src={cat.image}
                alt={cat.name}
                width={52}
                height={52}
                className="object-cover w-11 h-11 sm:w-12 sm:h-12 rounded-full"
              />
            </div>
            <span className="text-[11px] sm:text-xs font-semibold text-brand-950 text-center line-clamp-2 leading-tight max-w-[80px] group-hover:text-brand-600 transition-colors">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoryCircles
