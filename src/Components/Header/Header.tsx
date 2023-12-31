import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import logo from '@/images/logo.png'
import cart from '@/images/cart.png'
  import {BiCaretDown} from 'react-icons/bi'
  import {HiOutlineSearch} from 'react-icons/hi'
  import {SlLocationPin} from 'react-icons/sl'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { StateProps } from '../../../type'
import { useSession, signIn, signOut } from "next-auth/react"
import { addUser } from '@/store/nextslice'



const Header = () => {
  const {productData,favoriteData,userInfo}=useSelector((state:StateProps)=>state.next)
  const [cartlength,setCartlength]=  useState(0)
  useEffect(()=>{
    setCartlength( productData.length)
  }, [productData.length])
  const dispatch = useDispatch()
  const { data: session, } = useSession()
useEffect(()=>{
  if(session){
   dispatch(addUser({
    name:session.user?.name,
    email:session.user?.email,
    image:session.user?.image
   }))
  }
},[session])
  
  return (
    <div className=' bg-amazon_blue h-20 w-full text-lightText sticky top-0 z-50'>
        <div className="h-full w-full mx-auto inline-flex items-center justify-between gap-1 mdl:gap-3 px-4 ">
<Link href={'/'} className="px-2 py-2 border border-transparent hover:border-white cursor-pointer duration-300 flex items-center justify-center h-[70%]">
<Image className='w-28 object-cover mt-1' src={logo} alt="Logo"/>
</Link>

{/* delever */}
<div className="mx-2 px-2 py-2 border border-transparent hover:border-white cursor-pointer duration-300 
hidden xl:inline-flex items-center justify-center h-[70%] gap-1">
    <SlLocationPin/>
  <div className='text-xs'>
  <p>Delever to</p>
    <p className='font-bold text-white uppercase'>USA</p>
  </div>
</div>
{/* Search */}
<div className='flex-1 hidden md:inline-flex h-10 items-center justify-between relative '>
    <input type="text" placeholder="Search next_amazon_yt products"
    className='w-full h-full rounded-md border-[3px] border-transparent outline-none focus-visible:border-amazon_yellow px-2 placeholder:text-sm text-base text-black' />
    <span className="w-12 h-full bg-amazon_yellow text-black text-2xl flex items-center justify-center absolute right-0 rounded-tr-md rounded-mr-md cursor-pointer hover:bg-amazon_yellow_shadow duration-500 hover:text-white">
        <HiOutlineSearch/>
    </span>
</div>
{/* signin */}
 {
  userInfo ? 
  <div onClick={()=>signIn()} className='
  px-2 text-xs text-gray-100 flex 
   items-center border border-transparent
 hover:border-white cursor-pointer duration-300   gap-1  h-[70%]'>
<img  src={userInfo.image} alt="user image "

className=' object-cover w-8 h-8 rounded-full'
/>
<div className='text-xs text-gray-100 flex flex-col justify-between'>
  <p className='text-[13px] text-white font-bold'> {userInfo.name.substring(0,15)} </p>
  <p className='text-[10px]'> {userInfo.email} </p>
</div>
</div>:
<div onClick={()=>signIn()} className='px-2 text-xs text-gray-100 flex  border border-transparent
 hover:border-white cursor-pointer duration-300  flex-col gap-1 justify-center h-[70%]'>
    <p>Hello, sign in</p>
    <p className='font-bold text-white flex items-center'>
        Account & Lists{" "}
        <span>
            <BiCaretDown/>
        </span>
    </p>
</div>
 }
{/* Faforites */}
<div className='px-2 text-xs text-gray-100 flex  border border-transparent
 hover:border-white cursor-pointer duration-300  flex-col gap-1 justify-center h-[70%] relative'>
    <p>Marked</p>
    <p className='font-bold text-white '>& Favorite</p>
    {
      favoriteData.length >0 && <span className=' absolute
       right-2 top-2 w-4 h-4 border-[1px] border-gray-400 flex items-center justify-center text-xs text-amazon_yellow'> {favoriteData.length}</span>
    }
</div>
{/* Cart */}
<Link href={'/Cart'} className='px-2 flex items-center border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative'>
    <Image src={cart} alt={'CartIcons'} className='w-auto object-cover h-8 '/>
    <p className='text-xs text-white font-bold mt-3'>Cart</p>
    <span className=' absolute text-amazon_yellow text-xs top-2 left-[29px] font-semibold'> {cartlength ?cartlength :0}</span>
</Link>
        </div>
    </div>
  )
}

export default Header
