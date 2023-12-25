import React from 'react'
import Image from 'next/image'
import FormattedPrice from './FormattedPrice';
import { HiShoppingCart } from 'react-icons/hi'
import { FaHeart } from "react-icons/fa";
const ProductCard = ( {_id,title,description,price,brand,oldPrice,category,image,isNew}) => {
  return (
    <div>
      

<div key={_id} className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-xl bg-light p-4 group overflow-hidden ">
   <div className=' w-full h-[260px] relative'>
   <Image height={300} className="rounded-t-lg w-full h-full object-cover scale-90 hover:scale-100 transition-transform duration-300" src={image} alt="title" width="300"/>
<div className=' w-12 h-24 absolute bottom-10 right-0 border-[1px] border-gray-400 bg-white rounded-md flex flex-col translate-x-20 group-hover:translate-x-0 duration-300 transition-transform'>
  <span className=' w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl hover:bg-amazon_yellow bg-transparent cursor-pointer duration-300'>
    <HiShoppingCart className="hover:text-white"/> 
    </span>
  <span className=' w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl hover:bg-amazon_yellow bg-transparent cursor-pointer duration-300'>
    <FaHeart className="hover:text-red-600"/> 
  </span>
</div>
{
  isNew && <p className=' absolute top-0 right-0 text-amazon_blue font-medium text-xs tracking-wide animate-bounce '>!save <FormattedPrice amount={oldPrice - price} /> </p>
}
   </div>
   <hr />
    <div className="">
    {price}
            {brand}
            {oldPrice}
            {category}
            {title} {description} 
      
    </div>
</div>

    </div>
  )
}

export default ProductCard
