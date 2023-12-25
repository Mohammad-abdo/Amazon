import React from 'react'
import Image from 'next/image'
import logo from '@/images/logo.png'
const Header = () => {
  return (
    <div className=' bg-amazon_blue h-20 w-full text-lightText sticky top-0 z-50'>
        <div className="h-full w-full mx-auto inline-flex items-center justify-between gap-1 mdl:gap-3 px-4 ">
      <Image className='w-28 object-cover' src={logo} alt="Logo"/>

        </div>
    </div>
  )
}

export default Header
