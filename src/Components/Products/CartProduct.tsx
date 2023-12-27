import React from 'react'
import Image from 'next/image'
import FormattedPrice from './FormattedPrice';
import { HiShoppingCart } from 'react-icons/hi'
import { FaHeart } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { LuMinus,LuPlus } from "react-icons/lu";
import { useDispatch } from 'react-redux';
import { addToCart, addToFavorite, decressQuantaty, deleteProduct, incressQuantaty } from '@/store/nextslice';


interface item{
  brand:string;
  category:string;
  description:string;
  image:string;
  isNew:boolean;
  oldPrice:number;
  price:number;
  title:string;
  _id:number;
  quantaty:number;
}
interface CartProductProps{
  item:item
}
const CartProduct = ( {item}:CartProductProps) => {
 const dispatch=useDispatch()
 
  return (
    <div className='bg-gray-100 rounded-lg flex items-center gap-4'>
      <Image width={150} height={150} src={item.image} alt='Cartproduct img' 
      className=' object-cover'
      />
      <div className='flex items-center px-2 gap-4'>
        <div className='flex flex-col gap-1'>
        
          <p className='text-lg font-semibold text-amazon_blue'>{item.title}</p>
          <p className="text-sm text-gray-600">{item.description} </p>
          <p className='text-sm text-gray-600'>
             Unit Price{}
            
             <span className='font-semibold text-amazon_blue'>
              <FormattedPrice amount={item.price}/>
              </span></p>
              <div className='flex items-center  gap-6'>
          <div className='flex items-center justify-around mt-1 border border-gray-300 py-1 
          rounded-full w-28 shadow-lg shadow-gray-300'>
              <span 
              onClick={()=> dispatch(
                incressQuantaty({
                  _id :item. _id,
                  brand:item.brand,
                  category:item.category,
                  image:item.image,
                  description:item.description,
                  isNew:item.isNew,
                  oldPrice:item.oldPrice,
                  price:item.price,
                  title:item.title,
                  quantaty:1
                })
              )}
              
              className='w-6 h-6 flex items-center justify-center rounded-full text-base 
              bg-transparent hover:bg-gray-300  cursor-pointer decoration-purple-300'>
                <LuPlus/>
              </span>
              <span> {item.quantaty} </span>
              <span
              
              onClick={()=> dispatch(
                decressQuantaty({
                  _id :item. _id,
                  brand:item.brand,
                  category:item.category,
                  image:item.image,
                  description:item.description,
                  isNew:item.isNew,
                  oldPrice:item.oldPrice,
                  price:item.price,
                  title:item.title,
                  quantaty:1
                })
              )}
              
              className='w-6 h-6 flex items-center justify-center rounded-full text-base 
              bg-transparent hover:bg-gray-300  cursor-pointer decoration-purple-300'>
                <LuMinus/>
              </span>
          </div>
          {/* remove */}
          <div 
          
          
          onClick={()=> dispatch(
            deleteProduct( item._id)
          )}
          className='flex items-center  font-medium text-gray-400
           hover:text-red-600 cursor-pointer duration-300'>
              <IoMdClose className='mt-[2px]'/> <p>Remove</p>
          </div>
        </div>
        </div>
     <div className='text-lg font-semibold text-amazon_blue'>
      <FormattedPrice amount={item.price * item.quantaty}/>
     </div>
      </div>
    </div> 
  )
}

export default CartProduct
