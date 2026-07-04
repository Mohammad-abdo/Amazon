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
      <button 
        onClick={handelResetCart} 
        className="px-6 h-10 font-semibold text-slate-500 hover:text-red-500 hover:bg-red-50/50 border border-slate-250 hover:border-red-200 rounded-xl transition-all duration-300 text-xs sm:text-sm"
      > 
        Reset Cart
      </button>
    </div>
  )
}

export default ResetCart
