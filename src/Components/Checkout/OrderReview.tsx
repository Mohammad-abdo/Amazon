import React from 'react'
import ProductImage from '@/Components/Products/ProductImage'
import FormattedPrice from '@/Components/Products/FormattedPrice'
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
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h3 className="text-sm font-bold text-slate-800 mb-3">Shipping to</h3>
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs text-slate-600 leading-relaxed">
          <p className="font-semibold text-slate-800">{address.name}</p>
          <p>{address.line1}{address.line2 ? `, ${address.line2}` : ''}</p>
          <p>{address.city}, {address.state} {address.zip}</p>
          <p>{address.country}</p>
          <p>{address.phone}</p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-800 mb-3">Items ({items.length})</h3>
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div key={item._id} className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl p-3">
              <div className="relative w-14 h-14 bg-slate-50 rounded-lg overflow-hidden flex-shrink-0">
                <ProductImage src={item.image} alt={item.title} fill className="object-contain p-1" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-800 line-clamp-1">{item.title}</p>
                <p className="text-xs text-slate-400">Qty: {item.quantaty}</p>
              </div>
              <span className="text-xs font-bold text-slate-800">
                <FormattedPrice amount={item.price * item.quantaty} />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-sm font-semibold text-slate-600">Order Total</span>
        <span className="text-xl font-extrabold text-indigo-600">
          <FormattedPrice amount={total} />
        </span>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          type="button"
          className="h-11 px-6 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          Back
        </button>
        <button
          onClick={onPlaceOrder}
          disabled={placing}
          type="button"
          className="flex-1 h-11 bg-slate-900 text-white rounded-xl font-semibold text-sm hover:bg-indigo-600 active:scale-[0.98] disabled:opacity-50"
        >
          {placing ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </div>
  )
}

export default OrderReview
