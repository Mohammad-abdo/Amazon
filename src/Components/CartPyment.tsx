import React, { useEffect, useState } from 'react'
import {SiMediamarkt} from 'react-icons/si'
import FormattedPrice from './Products/FormattedPrice'
import { useDispatch, useSelector } from 'react-redux'
import { StateProps, storeProduct } from '../../type'

const CartPyment = () => {
    const {productData}=useSelector((state:StateProps)=>state.next)
   const [totalamount,setTotalamount]= useState(0) 
   useEffect(()=>{
    let amont=0
    productData.map((item:storeProduct)=>{
amont += item.price *item.quantaty
return;
    })
    setTotalamount(amont)
   },[productData])
   useDispatch()
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-2 px-1'>
        <span className='bg-green-600 rounded-full p-1 h-6 w-6 text-sm
         text-white flex items-center justify-center mt-1'>
            <SiMediamarkt/>
        </span>
        <p className='text-sm'>
            Your order qualifies for FREE Shipping 
            bg Choosing this option atcheckout .See details....</p>
      </div>
      <p className='flex items-center justify-between px-2 font-semibold'>
        
        Total: <span className='font-bold text-xl'><FormattedPrice amount={totalamount}/></span>
        </p>

        <div className='flex flex-col  items-center '>
            <button 
             className='w-[94%] h-10 bg-amazon_blue text-white rounded-lg text-sm font-semibold
             hover:text-black cursor-not-allowed
             hover:bg-amazon_yellow'
            >Proceed to Buy</button>
            <p 
            className='text-xs mt-2 text-red-500 font-semibold animate-bounce'
            >Please Login to continue</p>
        </div>
    </div>
  )
}

export default CartPyment
