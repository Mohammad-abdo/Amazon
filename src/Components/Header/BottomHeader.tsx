import React from 'react'
import Link from 'next/link'
import { LuMenu } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from 'next-auth/react'
import { StateProps } from '../../../type'
import { removeUser } from '@/store/nextslice'
import { useLanguage, TranslationKey } from '@/contexts/LanguageContext'

const links: { id: number; key: TranslationKey; path: string }[] = [
  { id: 1, key: 'bottomHeader.categories', path: '/categories' },
  { id: 2, key: 'bottomHeader.deals', path: '/deals' },
  { id: 3, key: 'bottomHeader.brands', path: '/brands' },
  { id: 4, key: 'bottomHeader.magazine', path: '/magazine' },
  { id: 5, key: 'bottomHeader.giftCards', path: '/gift-cards' },
  { id: 6, key: 'bottomHeader.trackOrder', path: '/track-order' },
  { id: 7, key: 'bottomHeader.shipping', path: '/shipping' },
  { id: 8, key: 'bottomHeader.faq', path: '/faq' },
]

const BottomHeader = () => {
  const { userInfo } = useSelector((state: StateProps) => state.next)
  const dispatch = useDispatch()
  const { t } = useLanguage()

  const handelSignOut = () => {
    signOut()
    dispatch(removeUser())
  }

  return (
    <div className="bg-brand-500 text-white h-10 w-full text-xs sm:text-sm flex items-center px-4 justify-between shadow-sm">
      <div className="flex items-center gap-1 sm:gap-2">
        <Link
          href="/categories"
            className="flex items-center gap-1.5 h-8 cursor-pointer hover:bg-brand-400 px-3.5 rounded-lg transition-all duration-200 font-semibold"
        >
          <LuMenu className="text-lg" /> {t('bottomHeader.allCategories')}
        </Link>
        {links.map((link) => (
          <Link
            href={link.path}
            key={link.id}
            className="hover:bg-brand-400 hidden md:inline-flex items-center h-8 cursor-pointer px-3.5 rounded-lg transition-all duration-200 font-medium text-white"
          >
            {t(link.key)}
          </Link>
        ))}
      </div>

      {userInfo && (
        <button
          onClick={handelSignOut}
          className="hover:bg-brand-700 text-brand-100 hover:text-white duration-200 md:inline-flex items-center h-8 cursor-pointer px-3.5 rounded-lg transition-all font-semibold text-xs uppercase tracking-wider"
        >
          {t('bottomHeader.signOut')}
        </button>
      )}
    </div>
  )
}

export default BottomHeader
