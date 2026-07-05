import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { StateProps } from '../../type'
import { useLanguage } from '@/contexts/LanguageContext'
import FormattedPrice from '@/Components/Products/FormattedPrice'
import { HiOutlineSearch } from 'react-icons/hi'

const TrackOrder = () => {
  const { t } = useLanguage()
  const { orders } = useSelector((state: StateProps) => state.orders)
  const [orderId, setOrderId] = useState('')
  const [searched, setSearched] = useState(false)

  const order = orders.find((o) => o.id.toLowerCase() === orderId.trim().toLowerCase())

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearched(true)
  }

  return (
    <>
      <Head>
        <title>{t('trackOrder.pageTitle')} - Souqi</title>
      </Head>
      <main className="bg-surface min-h-screen pb-20">
        <div className="max-w-xl mx-auto px-4 sm:px-6 py-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-brand-600 flex items-center justify-center mx-auto mb-4 shadow-card">
              <HiOutlineSearch className="text-white text-2xl" />
            </div>
            <h1 className="text-2xl font-extrabold text-brand-950">{t('trackOrder.title')}</h1>
            <p className="text-sm text-neutral-500 mt-2">{t('trackOrder.subtitle')}</p>
          </div>

          <form onSubmit={handleSearch} className="bg-white border border-cream rounded-2xl p-6 shadow-soft mb-6">
            <label className="text-xs font-semibold text-brand-950 block mb-2">{t('trackOrder.label')}</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={orderId}
                onChange={(e) => { setOrderId(e.target.value); setSearched(false) }}
                placeholder="SOQ-1234567890"
                className="flex-1 h-11 px-4 rounded-xl border border-cream bg-surface text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 font-mono"
              />
              <button type="submit" className="h-11 px-5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-semibold text-sm transition-colors">
                {t('trackOrder.search')}
              </button>
            </div>
          </form>

          {searched && (
            order ? (
              <div className="bg-white border border-cream rounded-2xl p-6 shadow-soft space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-brand-950">{order.id}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-50 text-brand-700 px-2.5 py-1 rounded-full">{order.status}</span>
                </div>
                <p className="text-xs text-neutral-500">{new Date(order.createdAt).toLocaleString()}</p>
                <div className="border-t border-cream pt-4 space-y-2">
                  {order.items.map((item) => (
                    <div key={item._id} className="flex justify-between text-xs">
                      <span className="text-brand-900 line-clamp-1 flex-1 mr-2">{item.title} ×{item.quantaty}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between border-t border-cream pt-4">
                  <span className="text-sm font-semibold text-brand-950">{t('checkout.orderTotal')}</span>
                  <span className="text-lg font-bold text-brand-600"><FormattedPrice amount={order.total} /></span>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-cream rounded-2xl p-8 text-center shadow-soft">
                <p className="text-sm text-neutral-500 mb-4">{t('trackOrder.notFound')}</p>
                <Link href="/account/orders" className="text-xs font-semibold text-brand-600 hover:underline">
                  {t('trackOrder.viewHistory')} →
                </Link>
              </div>
            )
          )}
        </div>
      </main>
    </>
  )
}

export default TrackOrder
