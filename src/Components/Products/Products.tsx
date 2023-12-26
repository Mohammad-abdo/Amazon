import React, { use, useEffect, useState } from 'react'
import { productProps } from '../../../type'
import ProductCard from './ProductCard.jsx'


const Products = ({productData}:any) => {
  
  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 px-6 '>
      {productData.map(({_id,isNew,title,description,price,brand,oldPrice,category,image}:productProps)=>(
       <ProductCard key={_id} isNew={isNew} _id={_id} title={title} description={description} price={price} brand={brand} oldPrice={oldPrice} category={category} image={image}/>
      )
      )}
    
    </div>
  )
}

export default Products
