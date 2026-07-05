import React, { useEffect, useState } from 'react'
import { BiCaretDown } from 'react-icons/bi'
import { HiOutlineSearch as SearchIcon, HiOutlineShoppingCart } from 'react-icons/hi'
import { SlLocationPin } from 'react-icons/sl'
import { FaHeart } from 'react-icons/fa'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { StateProps } from '../../../type'
import { useSession, signIn, signOut } from 'next-auth/react'
import { addUser, removeUser } from '@/store/nextslice'
import { useLanguage } from '@/contexts/LanguageContext'
import Logo from '@/Components/Logo'

const Header = () => {
  const { productData, favoriteData, userInfo } = useSelector(
    (state: StateProps) => state.next
  )
  const [cartlength, setCartlength] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()
  const { data: session } = useSession()
  const { language, toggleLanguage, t } = useLanguage()

  useEffect(() => {
    if (router.pathname === '/search') {
      setSearchQuery(typeof router.query.q === 'string' ? router.query.q : '')
    }
  }, [router.pathname, router.query.q])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const query = searchQuery.trim()
    if (!query) return
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  useEffect(() => {
    setCartlength(productData.length)
  }, [productData.length])

  useEffect(() => {
    if (session) {
      dispatch(
        addUser({
          name: session.user?.name,
          email: session.user?.email,
          image: session.user?.image,
        })
      )
    } else {
      dispatch(removeUser())
    }
  }, [session, dispatch])

  return (
    <header className="glass-nav border-b border-cream text-brand-950 h-[72px] w-full sticky top-0 z-50 shadow-header">
      <div className="h-full page-container flex items-center justify-between gap-4 xl:gap-6">

        <Link
          href="/"
          className="flex items-center justify-center py-1.5 px-2 rounded-xl hover:bg-cream/60 transition-all duration-300"
        >
          <Logo variant="light" />
        </Link>

        <div className="hidden xl:flex items-center gap-2 py-1.5 px-2.5 rounded-xl hover:bg-cream/60 cursor-pointer transition-all duration-300">
          <SlLocationPin className="text-brand-600 text-lg" />
          <div className="text-left">
            <span className="text-[10px] text-neutral-500 block uppercase tracking-wider font-semibold">{t('header.deliverTo')}</span>
            <span className="text-xs text-brand-950 block font-bold">{t('header.globalShipping')}</span>
          </div>
        </div>

        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 max-w-xl xl:max-w-2xl 2xl:max-w-3xl hidden md:flex h-11 relative rounded-full overflow-hidden border border-cream bg-cream/50 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-400/20 transition-all duration-300"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('header.searchPlaceholder')}
            className="w-full h-full bg-transparent px-5 py-2 text-sm text-brand-950 placeholder:text-neutral-400 outline-none border-none focus:outline-none"
          />
          <button
            type="submit"
            className="w-12 h-full bg-brand-600 hover:bg-brand-500 text-white flex items-center justify-center cursor-pointer transition-colors duration-200 rounded-full m-0.5"
            title="Search"
          >
            <SearchIcon className="text-lg" />
          </button>
        </form>

        <div className="flex items-center gap-1 sm:gap-2">

          <button
            onClick={toggleLanguage}
            className="h-9 px-3 rounded-full border border-cream hover:bg-cream/80 text-xs font-bold text-brand-800 transition-all duration-300"
            title="Toggle language"
          >
            {language === 'en' ? 'العربية' : 'English'}
          </button>

          {userInfo ? (
            <div
              onClick={() => signOut()}
              className="flex items-center gap-2 py-1.5 px-2.5 rounded-xl hover:bg-cream/60 cursor-pointer transition-all duration-300 group"
              title="Sign Out"
            >
              {userInfo.image ? (
                <img
                  src={userInfo.image}
                  alt={userInfo.name}
                  className="object-cover w-8 h-8 rounded-full border-2 border-cream group-hover:border-brand-400 transition-colors"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-sm font-bold text-white uppercase">
                  {userInfo.name.charAt(0)}
                </div>
              )}
              <div className="text-left hidden sm:block">
                <span className="text-[10px] text-neutral-500 block font-medium">{t('header.helloSignOut')}</span>
                <span className="text-xs text-brand-950 block font-bold max-w-[90px] truncate">{userInfo.name}</span>
              </div>
            </div>
          ) : (
            <div
              onClick={() => signIn()}
              className="flex flex-col py-1.5 px-3 rounded-xl hover:bg-cream/60 cursor-pointer transition-all duration-300"
              title="Sign In"
            >
              <span className="text-[10px] text-neutral-500 font-medium">{t('header.helloGuest')}</span>
              <span className="text-xs text-brand-950 font-bold flex items-center gap-0.5">
                {t('header.signIn')} <BiCaretDown className="text-neutral-400" />
              </span>
            </div>
          )}

          <Link
            href="/favorites"
            className="relative flex items-center gap-1.5 py-1.5 px-3 rounded-xl hover:bg-cream/60 cursor-pointer transition-all duration-300"
            title="Wishlist"
          >
            <FaHeart className="text-brand-600 text-base" />
            <div className="text-left hidden sm:block">
              <span className="text-[10px] text-neutral-500 block font-medium">{t('header.favorites')}</span>
              <span className="text-xs text-brand-950 block font-bold">{t('header.wishlist')}</span>
            </div>
            {favoriteData.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {favoriteData.length}
              </span>
            )}
          </Link>

          <Link
            href="/cart"
            className="relative flex items-center gap-2 py-2 px-3.5 rounded-full bg-brand-600 hover:bg-brand-500 text-white cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-brand-600/25"
            title="Shopping Cart"
          >
            <HiOutlineShoppingCart className="text-lg" />
            <div className="text-left hidden sm:block">
              <span className="text-[10px] text-brand-100 block font-medium">{t('header.cart')}</span>
              <span className="text-xs text-white block font-bold">
                {cartlength > 0 ? `${cartlength} ${t('header.items')}` : t('header.empty')}
              </span>
            </div>
            {cartlength > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-brand-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                {cartlength}
              </span>
            )}
          </Link>

        </div>
      </div>
    </header>
  )
}

export default Header
