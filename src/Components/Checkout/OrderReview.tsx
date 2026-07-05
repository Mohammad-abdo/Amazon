import React from 'react'
import ProductImage from '@/Components/Products/ProductImage'
import FormattedPrice from '@/Components/Products/FormattedPrice'
import { useLanguage } from '@/contexts/LanguageContext'
import { Address, storeProduct } from '../../../type'

interface props {
  items: storeProduct[]
  address: Address
  total: number
  onBack: () => void
  onPlaceOrder: () => void
  placing: boolean
}

const OrderReview = ({ items, address, total, onBack, onPlaceOrder, placing }: props) => {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h3 className="text-sm font-bold text-brand-950 mb-3">{t('checkout.shippingTo')}</h3>
        <div className="bg-cream/40 border border-cream rounded-xl p-4 text-xs text-neutral-600 leading-relaxed">
          <p className="font-semibold text-brand-950">{address.name}</p>
          <p>{address.line1}{address.line2 ? `, ${address.line2}` : ''}</p>
          <p>{address.city}, {address.state} {address.zip}</p>
          <p>{address.country}</p>
          <p>{address.phone}</p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-brand-950 mb-3">Items ({items.length})</h3>
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div key={item._id} className="flex items-center gap-3 bg-white border border-cream rounded-xl p-3">
              <div className="relative w-14 h-14 bg-cream/40 rounded-lg overflow-hidden flex-shrink-0">
                <ProductImage src={item.image} alt={item.title} fill className="object-contain p-1" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-brand-950 line-clamp-1">{item.title}</p>
                <p className="text-xs text-neutral-500">Qty: {item.quantaty}</p>
              </div>
              <span className="text-xs font-bold text-brand-950">
                <FormattedPrice amount={item.price * item.quantaty} />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-cream pt-4">
        <span className="text-sm font-semibold text-neutral-600">{t('checkout.orderTotal')}</span>
        <span className="text-xl font-extrabold text-brand-600">
          <FormattedPrice amount={total} />
        </span>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          type="button"
          className="h-11 px-6 border border-cream rounded-xl text-sm font-medium text-neutral-600 hover:bg-cream/60"
        >
          {t('checkout.back')}
        </button>
        <button
          onClick={onPlaceOrder}
          disabled={placing}
          type="button"
          className="flex-1 h-11 bg-brand-600 text-white rounded-xl font-semibold text-sm hover:bg-brand-500 active:scale-[0.98] disabled:opacity-50"
        >
          {placing ? t('checkout.placingOrder') : t('checkout.placeOrder')}
        </button>
      </div>
    </div>
  )
}

export default OrderReview
