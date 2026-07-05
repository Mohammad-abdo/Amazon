import React, { useEffect, useState } from 'react'
import FormattedPrice from './Products/FormattedPrice'
import { useSelector } from 'react-redux'
import { StateProps, storeProduct } from '../../type'
import { useRouter } from 'next/router'
import { MdOutlineLocalShipping } from 'react-icons/md'
import { useLanguage } from '@/contexts/LanguageContext'

const CartPyment = () => {
  const { productData, userInfo } = useSelector((state: StateProps) => state.next)
  const [totalamount, setTotalamount] = useState(0)
  const router = useRouter()
  const { t } = useLanguage()

  useEffect(() => {
    let amount = 0
    productData.forEach((item: storeProduct) => {
      amount += item.price * item.quantaty
    })
    setTotalamount(amount)
  }, [productData])

  const handleCheckout = () => {
    router.push('/checkout')
  }

  return (
    <div className="flex flex-col gap-5 p-6 w-full bg-white rounded-2xl">
      <div className="flex items-start gap-3 bg-brand-50/50 border border-brand-100 rounded-xl p-3">
        <span className="bg-brand-600 rounded-full p-1.5 text-white flex items-center justify-center mt-0.5 shadow-md shadow-brand-600/10">
          <MdOutlineLocalShipping className="text-sm" />
        </span>
        <p className="text-xs text-brand-900 leading-relaxed">
          {t('checkout.freeShippingNotice')}
        </p>
      </div>

      <div className="border-b border-cream pb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-neutral-500">{t('checkout.orderSubtotal')}</span>
        <span className="text-sm font-bold text-brand-950">
          <FormattedPrice amount={totalamount} />
        </span>
      </div>

      <div className="flex items-center justify-between font-semibold text-brand-950">
        <span>{t('checkout.orderTotal')}</span>
        <span className="text-xl font-extrabold text-brand-600">
          <FormattedPrice amount={totalamount} />
        </span>
      </div>

      {userInfo ? (
        <button
          onClick={handleCheckout}
          className="w-full h-11 bg-brand-600 text-white rounded-xl font-medium text-sm transition-all duration-300 hover:bg-brand-500 active:scale-[0.98] shadow-sm hover:shadow-md"
        >
          {t('checkout.proceedToCheckout')}
        </button>
      ) : (
        <div className="flex flex-col items-center gap-2.5">
          <button
            disabled
            className="w-full h-11 bg-cream text-neutral-400 rounded-xl font-medium text-sm cursor-not-allowed shadow-inner"
          >
            {t('checkout.proceedToCheckout')}
          </button>
          <p className="text-xs text-red-500 font-semibold animate-pulse">
            {t('checkout.pleaseSignIn')}
          </p>
        </div>
      )}
    </div>
  )
}

export default CartPyment
