import React from 'react'
import { useSelector } from 'react-redux'
import { StateProps, storeProduct } from '../../type'
import CartProduct from '@/Components/Products/CartProduct'
import ResetCart from '@/Components/ResetCart'
import Link from 'next/link'
import CartPyment from '@/Components/CartPyment'
import { HiOutlineShoppingCart } from 'react-icons/hi'

const Cart = () => {
  const { productData } = useSelector((state: StateProps) => state.next)

  return (
    <div className="max-w-screen-2xl mx-auto py-8 px-4 sm:px-6 min-h-[70vh] bg-slate-50">
      {productData.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Cart Products List */}
          <div className="lg:col-span-4 bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-150 pb-4 mb-6">
              <h1 className="text-2xl font-bold text-slate-800">Shopping Cart</h1>
              <p className="text-sm font-semibold text-indigo-600">
                {productData.length} {productData.length === 1 ? 'item' : 'items'}
              </p>
            </div>
            
            {/* Products container */}
            <div className="flex flex-col gap-4">
              {productData.map((item: storeProduct) => (
                <CartProduct key={item._id} item={item} />
              ))}
            </div>

            {/* Reset cart CTA */}
            <div className="mt-6 border-t border-slate-100 pt-6">
              <ResetCart />
            </div>
          </div>

          {/* Payment Card */}
          <div className="lg:col-span-1 bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
            <CartPyment />
          </div>
        </div>
      ) : (
        /* Empty Cart State */
        <div className="max-w-md mx-auto bg-white border border-slate-100 rounded-2xl p-8 text-center shadow-sm flex flex-col items-center justify-center my-12">
          <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-6 text-slate-400">
            <HiOutlineShoppingCart className="text-4xl text-slate-300" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
          <p className="text-xs text-slate-450 max-w-xs mb-6 leading-relaxed">
            Looks like you haven&apos;t added anything to your cart yet. Head back to the store to find your next purchase!
          </p>
          <Link href="/">
            <button className="h-11 px-8 bg-slate-900 text-white rounded-xl font-medium text-sm transition-all duration-300 hover:bg-indigo-600 active:scale-[0.98] shadow-sm hover:shadow-md">
              Start Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Cart
