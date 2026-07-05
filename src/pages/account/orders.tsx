import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { signIn } from 'next-auth/react'
import { StateProps } from '../../../type'
import FormattedPrice from '@/Components/Products/FormattedPrice'
import ProductImage from '@/Components/Products/ProductImage'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { IoMdArrowBack } from 'react-icons/io'

const OrderHistory = () => {
  const { userInfo } = useSelector((state: StateProps) => state.next)
  const { orders } = useSelector((state: StateProps) => state.orders)

  if (!userInfo) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50 gap-4">
        <h2 className="text-xl font-semibold text-slate-700">Please sign in to view your orders</h2>
        <button
          onClick={() => signIn()}
          className="h-11 px-8 bg-slate-900 text-white rounded-xl font-medium text-sm hover:bg-indigo-600 transition-all"
        >
          Sign In
        </button>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Order History - Nexis Premium E-Commerce</title>
      </Head>
      <div className="max-w-screen-2xl mx-auto py-8 px-4 sm:px-6 min-h-[70vh] bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between border-b border-slate-150 pb-4 mb-6">
            <Link href="/account" className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">
              <IoMdArrowBack className="text-base" />
              <span>My Account</span>
            </Link>
            <h1 className="text-2xl font-bold text-slate-800">Order History</h1>
          </div>

          {orders.length > 0 ? (
            <div className="flex flex-col gap-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-slate-700">{order.id}</span>
                    <span className="text-xs text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex flex-col gap-2 mb-4">
                    {order.items.map((item) => (
                      <div key={item._id} className="flex items-center gap-3">
                        <div className="relative w-10 h-10 bg-slate-50 rounded-lg overflow-hidden flex-shrink-0">
                          <ProductImage src={item.image} alt={item.title} fill className="object-contain p-0.5" />
                        </div>
                        <span className="text-xs text-slate-600 flex-1 line-clamp-1">{item.title}</span>
                        <span className="text-xs text-slate-400">x{item.quantaty}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                    <span className="text-xs font-semibold text-slate-500 uppercase">{order.status}</span>
                    <span className="text-sm font-bold text-slate-900">
                      <FormattedPrice amount={order.total} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-md mx-auto bg-white border border-slate-100 rounded-2xl p-8 text-center shadow-sm flex flex-col items-center justify-center my-12">
              <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-6 text-slate-400">
                <HiOutlineShoppingBag className="text-4xl text-slate-300" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">No orders yet</h2>
              <p className="text-xs text-slate-400 max-w-xs mb-6 leading-relaxed">
                Your placed orders will show up here once you complete a checkout.
              </p>
              <Link href="/">
                <button className="h-11 px-8 bg-slate-900 text-white rounded-xl font-medium text-sm transition-all duration-300 hover:bg-indigo-600 active:scale-[0.98] shadow-sm hover:shadow-md">
                  Start Shopping
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default OrderHistory
