import React from 'react'
import Link from 'next/link'
import ProductImage from './ProductImage'
import { Category } from '../../../type'

const CategoryCard = ({ name, slug, image }: Category) => {
  return (
    <Link
      href={`/category/${slug}`}
      className="group relative bg-white border border-cream rounded-3xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-500 flex flex-col"
    >
      <div className="relative w-full pt-[70%] bg-cream/40 overflow-hidden">
        <ProductImage
          src={image}
          alt={name}
          fill
          sizes="(max-w-700px) 100vw, 300px"
          className="object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="font-semibold text-brand-950 text-base group-hover:text-brand-600 transition-colors">
          {name}
        </h3>
      </div>
    </Link>
  )
}

export default CategoryCard
