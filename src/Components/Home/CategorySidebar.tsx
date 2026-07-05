import React from 'react'
import Link from 'next/link'
import ProductImage from '@/Components/Products/ProductImage'
import { Category } from '../../../type'

interface props {
  categories: Category[]
}

const CategorySidebar = ({ categories }: props) => {
  return (
    <aside className="hidden md:flex flex-col bg-white border border-cream rounded-2xl shadow-soft overflow-hidden h-full">
      <div className="bg-brand-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-3.5">
        All Departments
      </div>
      <nav className="flex-1 overflow-y-auto divide-y divide-cream/60">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className="flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-neutral-600 hover:bg-brand-50 hover:text-brand-700 transition-colors duration-150"
          >
            <span className="relative w-6 h-6 rounded-full bg-cream overflow-hidden flex-shrink-0">
              <ProductImage src={cat.image} alt={cat.name} fill className="object-cover" />
            </span>
            <span className="line-clamp-1">{cat.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default CategorySidebar
