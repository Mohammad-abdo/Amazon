import React from 'react'
import { productProps } from '../../../type'
import ProductCard from './ProductCard'

interface props {
  productData: productProps[]
}

const Products = ({ productData }: props) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-5 xl:gap-6">
      {productData.map((product) => (
        <ProductCard key={product._id} {...product} />
      ))}
    </div>
  )
}

export default Products
