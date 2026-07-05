import React from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { HiCheckCircle, HiHome } from 'react-icons/hi'
import { MdEmail } from 'react-icons/md'
import Head from 'next/head'
import FormattedPrice from '@/Components/Products/FormattedPrice'
import { StateProps } from '../../type'

const Success = () => {
  const router = useRouter()
  const orderId = typeof router.query.orderId === 'string' ? router.query.orderId : ''
  const { orders } = useSelector((state: StateProps) => state.orders)
  const order = orders.find((o) => o.id === orderId)

  return (
    <>
      <Head>
        <title>Order Success - Souqi</title>
        <meta name="description" content="Your order has been successfully placed at Souqi. Checkout complete." />
      </Head>
      <div className="min-h-[75vh] bg-surface flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white border border-cream p-8 rounded-3xl text-center shadow-md flex flex-col items-center justify-center">
          {/* Animated Checkmark Icon */}
          <div className="relative w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 text-green-500 shadow-sm">
            <HiCheckCircle className="text-5xl text-green-500 animate-bounce" />
          </div>

          {/* Text Details */}
          <h1 className="text-2xl font-extrabold text-brand-950 mb-2">Order Confirmed!</h1>
          <p className="text-xs text-neutral-500 mb-6 leading-relaxed">
            Thank you for shopping with Souqi. Your order has been successfully placed, and is now being processed.
          </p>

          {/* Info Box */}
          {order ? (
            <div className="w-full bg-cream/40 border border-cream rounded-2xl p-4 mb-8 text-left space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-500 font-medium">Order ID</span>
                <span className="font-bold text-brand-950 font-mono select-all bg-white px-2.5 py-1 border border-cream rounded-md">
                  {order.id}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-500 font-medium">Items</span>
                <span className="font-bold text-brand-950">{order.items.length}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-500 font-medium">Total</span>
                <span className="font-bold text-brand-950">
                  <FormattedPrice amount={order.total} />
                </span>
              </div>
              <div className="flex items-start gap-2.5 pt-2 border-t border-cream">
                <MdEmail className="text-brand-700 text-base mt-0.5" />
                <div className="text-[11px] text-neutral-500 leading-normal">
                  <span className="font-bold block text-brand-900">Receipt Sent</span>
                  <span>We&apos;ve dispatched a digital invoice and shipping tracking details to your registered email address.</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-neutral-500 mb-8">Order details are unavailable.</p>
          )}

          <div className="w-full flex flex-col gap-3">
            <Link href="/account/orders" className="w-full">
              <button className="w-full h-11 border border-cream text-brand-900 rounded-xl font-semibold text-sm hover:bg-cream/60 transition-all duration-300">
                View Order History
              </button>
            </Link>
            <Link href="/" className="w-full">
              <button className="w-full h-11 bg-brand-600 text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-brand-500 active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
                <HiHome className="text-base" />
                Return to Homepage
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Success
