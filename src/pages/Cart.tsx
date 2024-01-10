import React from 'react'
import { useSelector } from 'react-redux'
import { StateProps, productProps, storeProduct } from '../../type'
import ProductCard from '@/Components/Products/ProductCard'
import CartProduct from '@/Components/Products/CartProduct'
import ResetCart from '@/Components/ResetCart'
import Link from 'next/link'
import CartPyment from '@/Components/CartPyment'

const Cart = () => {

  const {productData,favoriteData}=useSelector((state:StateProps)=>state.next)
  return (

<div className='max-w-screen-2xl max-auto grid grid-cols-5  gap-10 py-4 px-6 '>

    {
      productData.length >0 ?(
         <>
          <div className=' bg-white shadow-lg col-span-4 p-4 rounded-lg'>
            <div className='flex items-center justify-between 
            border-b-[1px] border-gray-400 pb-1'>
              <p className='text-2xl font-semibold
               text-amazon_blue'>Shopping Cart</p>
               <p className='text-lg font-semibold text-amazon_blue'> 
                 Subtitle
               </p>
            </div>
            <div className='pt-2 flex flex-col gap-2'>
            {productData.map((item:storeProduct)=>(
     <div key={item._id} className='pt-2 flex flex-col gap-2 '>
     <CartProduct item={item}/>
     </div>
     
    ))}
    <ResetCart/>
            </div>
          </div>
          <div className='bg-white h-64 shadow-lg col-span-1 rounded-lg flex items-center justify-center'>
            <CartPyment />
          </div>
         </>
         ):(
        <div className='bg-white h-64 col-span-5 flex flex-col items-center 
        justify-center py-5 rounded-lg shadow-lg'>
          <h1 className='text-lg font-medium'>Your cart is empty!</h1>
          <Link href={'/'}>

          <button  
          className='w-52 h-10 bg-amazon_blue text-white rounded-lg text-sm font-semibold
          hover:text-black
          hover:bg-amazon_yellow'
          >Go to Shopping</button>
          </Link>
        </div>
      )
    }
  

</div>
  )
}

export default Cart
