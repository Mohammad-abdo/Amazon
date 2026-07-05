import React from 'react'
import Link from 'next/link'
import ProductImage from '@/Components/Products/ProductImage'
import { Category } from '../../../type'

interface props {
  category: Category
  eyebrow: string
}

const DealCard = ({ category, eyebrow }: props) => {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="relative flex-1 rounded-2xl overflow-hidden bg-brand-950 group min-h-[120px] shadow-soft"
    >
      <ProductImage
        src={category.image}
        alt={category.name}
        fill
        className="object-cover opacity-50 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-900/30 to-transparent flex flex-col justify-end p-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-300 mb-1">{eyebrow}</span>
        <span className="text-white font-bold text-sm leading-tight line-clamp-2">Shop {category.name}</span>
      </div>
    </Link>
  )
}

export default DealCard
