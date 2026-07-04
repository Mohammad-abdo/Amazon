import React, { useEffect, useState } from 'react'
import { SiMediamarkt } from 'react-icons/si'
import FormattedPrice from './Products/FormattedPrice'
import { useSelector } from 'react-redux'
import { StateProps, storeProduct } from '../../type'
import { useRouter } from 'next/router'
import { MdOutlineLocalShipping } from 'react-icons/md'

const CartPyment = () => {
  const { productData, userInfo } = useSelector((state: StateProps) => state.next)
  const [totalamount, setTotalamount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    let amount = 0
    productData.forEach((item: storeProduct) => {
      amount += item.price * item.quantaty
    })
    setTotalamount(amount)
  }, [productData])

  const handleCheckout = () => {
    router.push('/Success')
  }

  return (
    <div className="flex flex-col gap-5 p-6 w-full bg-white rounded-2xl">
      <div className="flex items-start gap-3 bg-indigo-50/50 border border-indigo-100 rounded-xl p-3">
        <span className="bg-indigo-600 rounded-full p-1.5 text-white flex items-center justify-center mt-0.5 shadow-md shadow-indigo-600/10">
          <MdOutlineLocalShipping className="text-sm" />
        </span>
        <p className="text-xs text-indigo-900 leading-relaxed">
          Your order qualifies for <span className="font-bold text-indigo-700">FREE Standard Shipping</span>. Fast courier delivery globally.
        </p>
      </div>

      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">Order Subtotal</span>
        <span className="text-sm font-bold text-slate-900">
          <FormattedPrice amount={totalamount} />
        </span>
      </div>

      <div className="flex items-center justify-between font-semibold text-slate-800">
        <span>Order Total</span>
        <span className="text-xl font-extrabold text-indigo-600">
          <FormattedPrice amount={totalamount} />
        </span>
      </div>

      {userInfo ? (
        <button
          onClick={handleCheckout}
          className="w-full h-11 bg-slate-900 text-white rounded-xl font-medium text-sm transition-all duration-300 hover:bg-indigo-600 active:scale-[0.98] shadow-sm hover:shadow-md"
        >
          Proceed to Checkout
        </button>
      ) : (
        <div className="flex flex-col items-center gap-2.5">
          <button
            disabled
            className="w-full h-11 bg-slate-200 text-slate-400 rounded-xl font-medium text-sm cursor-not-allowed shadow-inner"
          >
            Proceed to Checkout
          </button>
          <p className="text-xs text-red-500 font-semibold animate-pulse">
            Please log in above to place your order.
          </p>
        </div>
      )}
    </div>
  )
}

export default CartPyment
