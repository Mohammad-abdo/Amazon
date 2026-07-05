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
      className="relative flex-1 rounded-2xl overflow-hidden bg-brand-400 group min-h-[120px] shadow-soft hover:shadow-glow transition-shadow duration-300"
    >
      <ProductImage
        src={category.image}
        alt={category.name}
        fill
        className="object-cover opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-600/90 via-brand-400/30 to-brand-200/10 flex flex-col justify-end p-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-50 mb-1">{eyebrow}</span>
        <span className="text-white font-bold text-sm leading-tight line-clamp-2 drop-shadow-sm">Shop {category.name}</span>
      </div>
    </Link>
  )
}

export default DealCard
