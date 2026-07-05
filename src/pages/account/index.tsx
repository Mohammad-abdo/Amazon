import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { signIn } from 'next-auth/react'
import { StateProps } from '../../../type'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { FaHeart } from 'react-icons/fa'
import { useLanguage } from '@/contexts/LanguageContext'

const Account = () => {
  const { userInfo } = useSelector((state: StateProps) => state.next)
  const { orders } = useSelector((state: StateProps) => state.orders)
  const { favoriteData } = useSelector((state: StateProps) => state.next)
  const { t } = useLanguage()

  if (!userInfo) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-surface gap-4">
        <h2 className="text-xl font-semibold text-brand-900">{t('account.signInPrompt')}</h2>
        <button
          onClick={() => signIn()}
          className="h-11 px-8 bg-brand-600 text-white rounded-xl font-medium text-sm hover:bg-brand-500 transition-all"
        >
          {t('header.signIn')}
        </button>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>My Account - Souqi</title>
      </Head>
      <div className="page-container py-8 min-h-[70vh] bg-surface">
        <div className="max-w-2xl mx-auto bg-white border border-cream rounded-2xl p-8 shadow-soft">
          <div className="flex items-center gap-4 border-b border-cream pb-6 mb-6">
            {userInfo.image ? (
              <img src={userInfo.image} alt={userInfo.name} className="w-16 h-16 rounded-full object-cover border border-cream" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-brand-600 flex items-center justify-center text-xl font-bold text-white uppercase">
                {userInfo.name?.charAt(0)}
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold text-brand-950">{userInfo.name}</h1>
              <p className="text-sm text-neutral-400">{userInfo.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Link href="/account/orders" className="flex items-center gap-3 border border-cream rounded-xl p-4 hover:border-brand-200 hover:bg-brand-50/40 transition-colors">
              <HiOutlineShoppingBag className="text-2xl text-brand-600" />
              <div>
                <p className="text-sm font-semibold text-brand-950">{t('account.orderHistory')}</p>
                <p className="text-xs text-neutral-400">{orders.length} order{orders.length === 1 ? '' : 's'}</p>
              </div>
            </Link>
            <Link href="/favorites" className="flex items-center gap-3 border border-cream rounded-xl p-4 hover:border-brand-200 hover:bg-brand-50/40 transition-colors">
              <FaHeart className="text-2xl text-brand-600" />
              <div>
                <p className="text-sm font-semibold text-brand-950">{t('account.wishlist')}</p>
                <p className="text-xs text-neutral-400">{favoriteData.length} item{favoriteData.length === 1 ? '' : 's'}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Account
