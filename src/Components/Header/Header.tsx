import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Logo from '@/Components/Logo'
import cartIcon from '@/images/cart.png'
import { BiCaretDown } from 'react-icons/bi'
import { HiOutlineSearch as SearchIcon } from 'react-icons/hi'
import { SlLocationPin } from 'react-icons/sl'
import { FaHeart } from 'react-icons/fa'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { StateProps } from '../../../type'
import { useSession, signIn, signOut } from "next-auth/react"
import { addUser, removeUser } from '@/store/nextslice'

const Header = () => {
  const { productData, favoriteData, userInfo } = useSelector(
    (state: StateProps) => state.next
  )
  const [cartlength, setCartlength] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()
  const { data: session } = useSession()

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
    <header className="bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-slate-100 h-20 w-full sticky top-0 z-50 transition-all duration-300">
      <div className="h-full max-w-screen-2xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6">
        
        {/* Brand Logo */}
        <Link 
          href="/" 
          className="flex items-center justify-center py-1.5 px-2.5 rounded-xl border border-transparent hover:border-slate-800 hover:bg-slate-900/50 transition-all duration-300"
        >
          <Logo />
        </Link>

        {/* Location display - redesigned to look clean */}
        <div className="hidden xl:flex items-center gap-2 py-1.5 px-2.5 rounded-xl border border-transparent hover:border-slate-800 hover:bg-slate-900/50 cursor-pointer transition-all duration-300">
          <SlLocationPin className="text-indigo-400 text-lg" />
          <div className="text-left">
            <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">Deliver to</span>
            <span className="text-xs text-white block font-bold">Global Shipping</span>
          </div>
        </div>

        {/* Premium Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 max-w-xl hidden md:flex h-10 relative rounded-xl overflow-hidden border border-slate-700 bg-slate-900 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all duration-300"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search premium products..."
            className="w-full h-full bg-transparent px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none border-none focus:outline-none"
          />
          <button
            type="submit"
            className="w-12 h-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center cursor-pointer transition-colors duration-200"
            title="Search"
          >
            <SearchIcon className="text-lg" />
          </button>
        </form>

        {/* Right Nav Options */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* User Signin/out */}
          {userInfo ? (
            <div 
              onClick={() => signOut()} 
              className="flex items-center gap-2.5 py-1.5 px-2.5 rounded-xl border border-transparent hover:border-slate-800 hover:bg-slate-900/50 cursor-pointer transition-all duration-300 group"
              title="Sign Out"
            >
              {userInfo.image ? (
                <img  
                  src={userInfo.image} 
                  alt={userInfo.name}
                  className="object-cover w-8 h-8 rounded-full border border-slate-700 group-hover:border-indigo-400 transition-colors"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold text-white uppercase">
                  {userInfo.name.charAt(0)}
                </div>
              )}
              <div className="text-left hidden sm:block">
                <span className="text-[10px] text-slate-400 block font-medium">Hello, Sign Out</span>
                <span className="text-xs text-white block font-bold max-w-[90px] truncate">{userInfo.name}</span>
              </div>
            </div>
          ) : (
            <div 
              onClick={() => signIn()} 
              className="flex flex-col py-1.5 px-3 rounded-xl border border-transparent hover:border-slate-800 hover:bg-slate-900/50 cursor-pointer transition-all duration-300"
              title="Sign In"
            >
              <span className="text-[10px] text-slate-400 font-medium">Hello, Guest</span>
              <span className="text-xs text-white font-bold flex items-center gap-0.5">
                Sign In <BiCaretDown className="text-slate-400" />
              </span>
            </div>
          )}

          {/* Favorites Wishlist Link */}
          <Link 
            href="/favorites" 
            className="relative flex items-center gap-1.5 py-1.5 px-3 rounded-xl border border-transparent hover:border-slate-800 hover:bg-slate-900/50 cursor-pointer transition-all duration-300"
            title="Wishlist"
          >
            <FaHeart className="text-indigo-400 text-base" />
            <div className="text-left hidden sm:block">
              <span className="text-[10px] text-slate-400 block font-medium">Favorites</span>
              <span className="text-xs text-white block font-bold">Wishlist</span>
            </div>
            {favoriteData.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {favoriteData.length}
              </span>
            )}
          </Link>

          {/* Shopping Cart Link */}
          <Link 
            href="/cart" 
            className="relative flex items-center gap-2 py-1.5 px-3 rounded-xl border border-transparent hover:border-slate-850 hover:bg-slate-900/50 bg-slate-900/30 border-slate-800 cursor-pointer transition-all duration-300"
            title="Shopping Cart"
          >
            <Image 
              src={cartIcon} 
              alt="Cart Icon" 
              className="w-5 h-5 object-contain filter invert opacity-90"
            />
            <div className="text-left hidden sm:block">
              <span className="text-[10px] text-slate-400 block font-medium">Cart</span>
              <span className="text-xs text-white block font-bold">
                {cartlength > 0 ? `${cartlength} items` : 'Empty'}
              </span>
            </div>
            {cartlength > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
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
