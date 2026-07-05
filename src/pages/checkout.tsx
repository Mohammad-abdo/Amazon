import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { StateProps, Address } from '../../type'
import { resetCart } from '@/store/nextslice'
import { addOrder } from '@/store/ordersSlice'
import StepIndicator from '@/Components/Checkout/StepIndicator'
import AddressForm from '@/Components/Checkout/AddressForm'
import OrderReview from '@/Components/Checkout/OrderReview'
import { useLanguage } from '@/contexts/LanguageContext'

const emptyAddress: Address = {
  name: '', line1: '', line2: '', city: '', state: '', zip: '', country: '', phone: '',
}

const Checkout = () => {
  const { productData, userInfo } = useSelector((state: StateProps) => state.next)
  const dispatch = useDispatch()
  const router = useRouter()
  const { t } = useLanguage()

  const [step, setStep] = useState<'address' | 'review'>('address')
  const [address, setAddress] = useState<Address>(emptyAddress)
  const [placing, setPlacing] = useState(false)

  useEffect(() => {
    if (productData.length === 0) {
      router.replace('/cart')
    }
  }, [productData.length, router])

  if (productData.length === 0) return null

  if (!userInfo) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-surface gap-3">
        <h2 className="text-xl font-semibold text-brand-900">{t('checkout.signInToCheckout')}</h2>
        <Link href="/cart" className="text-brand-600 hover:underline text-sm">{t('checkout.backToCart')}</Link>
      </div>
    )
  }

  const total = productData.reduce((sum, item) => sum + item.price * item.quantaty, 0)

  const handlePlaceOrder = () => {
    setPlacing(true)
    const order = {
      id: `SOQ-${Date.now()}`,
      items: productData,
      address,
      subtotal: total,
      total,
      createdAt: new Date().toISOString(),
      status: 'placed' as const,
    }
    dispatch(addOrder(order))
    dispatch(resetCart())
    router.push(`/success?orderId=${order.id}`)
  }

  return (
    <>
      <Head>
        <title>Checkout - Souqi</title>
      </Head>
      <div className="max-w-screen-2xl mx-auto py-8 px-4 sm:px-6 min-h-[70vh] bg-surface">
        <div className="max-w-3xl mx-auto bg-white border border-cream rounded-2xl p-6 md:p-10 shadow-soft">
          <h1 className="text-2xl font-bold text-brand-950 mb-6">{t('checkout.title')}</h1>
          <StepIndicator step={step} />

          {step === 'address' ? (
            <AddressForm
              initialAddress={address}
              onSubmit={(addr) => {
                setAddress(addr)
                setStep('review')
              }}
            />
          ) : (
            <OrderReview
              items={productData}
              address={address}
              total={total}
              onBack={() => setStep('address')}
              onPlaceOrder={handlePlaceOrder}
              placing={placing}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default Checkout
