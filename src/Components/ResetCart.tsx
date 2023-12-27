import { resetCart } from '@/store/nextslice'
import React from 'react'
import { useDispatch } from 'react-redux'

const ResetCart = () => {
    const dispatch =useDispatch()
    const handelResetCart= ()=>{
        const confirmreset=window.confirm(
            "Are You sure To Reset Your Cart?"
        )
        if(confirmreset){
            dispatch(resetCart())
        }

    }
  return (
    <div className=''>
        <button onClick={handelResetCart} className="w-44 h-10 font-semibold bg-gray-200
         hover:bg-red-600 shadow-lg shadow-amazon_yellow rounded-lg hover:text-white duration-300"> Reset Cart</button>
      
    </div>
  )
}

export default ResetCart
