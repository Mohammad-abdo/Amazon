import React from 'react'
import Image from 'next/image'
import FormattedPrice from './FormattedPrice'
import { IoMdClose as CloseIcon } from "react-icons/io"
import { LuMinus, LuPlus } from "react-icons/lu"
import { useDispatch } from 'react-redux'
import { decressQuantaty, deleteProduct, incressQuantaty } from '@/store/nextslice'

interface item {
  brand: string
  category: string
  description: string
  image: string
  isNew: boolean
  oldPrice: number
  price: number
  title: string
  _id: number
  quantaty: number
}

interface CartProductProps {
  item: item
}

const CartProduct = ({ item }: CartProductProps) => {
  const dispatch = useDispatch()

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative w-32 h-32 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center border border-slate-100 p-2">
        <Image 
          width={120} 
          height={120} 
          src={item.image} 
          alt={item.title} 
          className="object-contain w-full h-full transform hover:scale-105 transition-transform duration-300" 
        />
      </div>

      {/* Details Panel */}
      <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
        <div className="flex flex-col gap-1 max-w-md">
          <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">
            {item.category}
          </span>
          <h4 className="text-base font-semibold text-slate-800 line-clamp-1">
            {item.title}
          </h4>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-2">
            {item.description}
          </p>
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            Unit Price: 
            <span className="font-semibold text-slate-800">
              <FormattedPrice amount={item.price} />
            </span>
          </div>
        </div>

        {/* Quantity Controls & Total */}
        <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-8 w-full md:w-auto">
          {/* Quantity selector pill */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-slate-200 rounded-full bg-slate-50 p-1 shadow-sm">
              <button
                onClick={() => dispatch(decressQuantaty({ _id: item._id }))}
                className="w-7 h-7 flex items-center justify-center rounded-full text-slate-600 hover:bg-white hover:text-indigo-600 transition-colors shadow-sm bg-transparent"
                title="Decrease Quantity"
              >
                <LuMinus className="text-xs" />
              </button>
              <span className="w-8 text-center text-xs font-semibold text-slate-700 select-none">
                {item.quantaty}
              </span>
              <button
                onClick={() => dispatch(incressQuantaty({ _id: item._id }))}
                className="w-7 h-7 flex items-center justify-center rounded-full text-slate-600 hover:bg-white hover:text-indigo-600 transition-colors shadow-sm bg-transparent"
                title="Increase Quantity"
              >
                <LuPlus className="text-xs" />
              </button>
            </div>

            {/* Remove CTA */}
            <button
              onClick={() => dispatch(deleteProduct(item._id))}
              className="text-slate-400 hover:text-red-500 flex items-center gap-1 text-xs font-medium transition-colors"
            >
              <CloseIcon className="text-sm" />
              <span>Remove</span>
            </button>
          </div>

          {/* Subtotal */}
          <div className="text-right">
            <span className="text-xs text-slate-400 block font-normal">Subtotal</span>
            <span className="text-base font-bold text-slate-900 block mt-0.5">
              <FormattedPrice amount={item.price * item.quantaty} />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartProduct
