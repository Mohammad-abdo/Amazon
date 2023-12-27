import React from 'react'
import Image from 'next/image'
import FormattedPrice from './FormattedPrice';
import { HiShoppingCart } from 'react-icons/hi'
import { FaHeart } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { addToCart, addToFavorite } from '@/store/nextslice';
const ProductCard = ( {_id,title,description,price,brand,oldPrice,category,image,isNew}) => {
 const dispatch=useDispatch()
 
  return (
    <div>
      

<div key={_id} className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-xl bg-light p-4 group overflow-hidden ">
   <div className=' w-full h-[260px] relative'>
   <Image height={300} className="rounded-t-lg w-full h-full object-cover scale-90 hover:scale-100 transition-transform duration-300" src={image} alt="title" width="300"/>
<div className=' w-12 h-24 absolute bottom-10 right-0 border-[1px] border-gray-400 bg-white rounded-md flex flex-col translate-x-20 group-hover:translate-x-0 duration-300 transition-transform'>
  <span className=' w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl hover:bg-amazon_yellow bg-transparent cursor-pointer duration-300'>
    <HiShoppingCart 
      onClick={()=>dispatch(
        addToCart({
          _id:_id,
          brand:brand,
          category:category,
          image:image,
          description:description,
          isNew:isNew,
          oldPrice:oldPrice,
          price:price,
          title:title,
          quantaty:1
        })
      )}
    className="hover:text-white"/> 
    </span>
  <span className=' w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl hover:bg-amazon_yellow bg-transparent cursor-pointer duration-300'>
    <FaHeart 
      onClick={()=>dispatch(
        addToFavorite({
          _id:_id,
          brand:brand,
          category:category,
          image:image,
          description:description,
          isNew:isNew,
          oldPrice:oldPrice,
          price:price,
          title:title,
          quantaty:1
        })
      )}
    className="hover:text-red-600"/> 
  </span>
</div>
{
  isNew && <p className=' absolute top-0 right-0 text-amazon_blue font-medium text-xs tracking-wide animate-bounce '>!save <FormattedPrice amount={oldPrice - price} /> </p>
}
   </div>
   <hr />
    <div className="px-4 py-3 flex flex-col gap-1">
           <p className='text-xs text-gray-500 tracking-wide'> {category}</p>
       
            <p className='text-base font-medium cursor-pointer hover:text-amazon_yellow_shadow duration-300'> {title}  </p>
            <p className='flex items-center gap-2'> 
              <span className='text-sm line-through'> <FormattedPrice amount={oldPrice}/></span> 
              <span className=' text-amazon_blue font-semibold'> <FormattedPrice amount={price}/></span> 
            </p>
            <p className='text-xs text-justify text-gray-600 '>{description.substring(0,120)} </p>
            <button 
            onClick={()=>dispatch(
              addToCart({
                _id:_id,
                brand:brand,
                category:category,
                image:image,
                description:description,
                isNew:isNew,
                oldPrice:oldPrice,
                price:price,
                title:title,
                quantaty:1
              })
            )}
            className='h-10 font-medium text-white bg-amazon_blue rounded-md duration-300 mt-2 hover:bg-amazon_yellow hover:text-black '>add to cart</button>
      
    </div>
</div>

    </div> 
  )
}

export default ProductCard
