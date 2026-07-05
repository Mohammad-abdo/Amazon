import React from 'react'
import { useSelector } from 'react-redux'
import { StateProps, storeProduct } from '../../type'
import CartProduct from '@/Components/Products/CartProduct'
import ResetCart from '@/Components/ResetCart'
import Link from 'next/link'
import CartPyment from '@/Components/CartPyment'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import Head from 'next/head'

const Cart = () => {
  const { productData } = useSelector((state: StateProps) => state.next)

  return (
    <>
      <Head>
        <title>Shopping Cart - Souqi</title>
        <meta name="description" content="Review your selected products, adjust item quantities, and checkout securely at Souqi." />
      </Head>
      <div className="page-container py-8 min-h-[70vh] bg-surface">
      {productData.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-4 bg-white border border-cream p-6 rounded-2xl shadow-soft">
            <div className="flex items-center justify-between border-b border-cream pb-4 mb-6">
              <h1 className="text-2xl font-bold text-brand-950">Shopping Cart</h1>
              <p className="text-sm font-semibold text-brand-600">
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
            <div className="mt-6 border-t border-cream pt-6">
              <ResetCart />
            </div>
          </div>

          {/* Payment Card */}
          <div className="lg:col-span-1 bg-white border border-cream rounded-2xl shadow-soft overflow-hidden">
            <CartPyment />
          </div>
        </div>
      ) : (
        /* Empty Cart State */
        <div className="max-w-md mx-auto bg-white border border-cream rounded-2xl p-8 text-center shadow-soft flex flex-col items-center justify-center my-12">
          <div className="w-20 h-20 rounded-full bg-brand-50 flex items-center justify-center mb-6 text-brand-300">
            <HiOutlineShoppingCart className="text-4xl text-brand-200" />
          </div>
          <h2 className="text-xl font-bold text-brand-950 mb-2">Your cart is empty</h2>
          <p className="text-xs text-neutral-500 max-w-xs mb-6 leading-relaxed">
            Looks like you haven&apos;t added anything to your cart yet. Head back to the store to find your next purchase!
          </p>
          <Link href="/">
            <button className="h-11 px-8 bg-brand-600 text-white rounded-xl font-medium text-sm transition-all duration-300 hover:bg-brand-500 active:scale-[0.98] shadow-sm hover:shadow-md">
              Start Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
    </>
  )
}

export default Cart
