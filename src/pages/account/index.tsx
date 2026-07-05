import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { signIn } from 'next-auth/react'
import { StateProps } from '../../../type'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { FaHeart } from 'react-icons/fa'

const Account = () => {
  const { userInfo } = useSelector((state: StateProps) => state.next)
  const { orders } = useSelector((state: StateProps) => state.orders)
  const { favoriteData } = useSelector((state: StateProps) => state.next)

  if (!userInfo) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50 gap-4">
        <h2 className="text-xl font-semibold text-slate-700">Please sign in to view your account</h2>
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
        <title>My Account - Nexis Premium E-Commerce</title>
      </Head>
      <div className="max-w-screen-2xl mx-auto py-8 px-4 sm:px-6 min-h-[70vh] bg-slate-50">
        <div className="max-w-2xl mx-auto bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-4 border-b border-slate-100 pb-6 mb-6">
            {userInfo.image ? (
              <img src={userInfo.image} alt={userInfo.name} className="w-16 h-16 rounded-full object-cover border border-slate-200" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-xl font-bold text-white uppercase">
                {userInfo.name?.charAt(0)}
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold text-slate-900">{userInfo.name}</h1>
              <p className="text-sm text-slate-400">{userInfo.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Link href="/account/orders" className="flex items-center gap-3 border border-slate-100 rounded-xl p-4 hover:border-indigo-200 hover:bg-indigo-50/40 transition-colors">
              <HiOutlineShoppingBag className="text-2xl text-indigo-600" />
              <div>
                <p className="text-sm font-semibold text-slate-800">Order History</p>
                <p className="text-xs text-slate-400">{orders.length} order{orders.length === 1 ? '' : 's'}</p>
              </div>
            </Link>
            <Link href="/favorites" className="flex items-center gap-3 border border-slate-100 rounded-xl p-4 hover:border-indigo-200 hover:bg-indigo-50/40 transition-colors">
              <FaHeart className="text-2xl text-indigo-600" />
              <div>
                <p className="text-sm font-semibold text-slate-800">Wishlist</p>
                <p className="text-xs text-slate-400">{favoriteData.length} item{favoriteData.length === 1 ? '' : 's'}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Account
