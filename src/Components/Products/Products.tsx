import React from 'react'
import { productProps } from '../../../type'
import ProductCard from './ProductCard'


interface props {
  productData: productProps[]
}

const Products = ({productData}:props) => {

  return (
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-6 '>
      {productData.map((product)=>(
       <ProductCard key={product._id} {...product}/>
      )
      )}

    </div>
  )
}

export default Products
