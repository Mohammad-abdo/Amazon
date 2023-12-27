import React from 'react'
import {LuMenu} from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import {  signOut } from "next-auth/react"
import { StateProps } from '../../../type'
import { removeUser } from '@/store/nextslice'
const links=[
    {
        id:1,
        title:'Todays Deals',
        path:"#"
    },
    {
        id:2,
        title:'Customer Service',
        path:"#"
    },
    {
        id:3,
        title:'Registry',
        path:"#"
    },
    {
        id:4,
        title:'Gift Cards',
        path:"#"
    },
    {
        id:5,
        title:'Sell',
        path:"#"
    },

]
const BottomHeader = () => {
  const {userInfo}=useSelector((state:StateProps)=>state.next)
  const dispatch =useDispatch()
const handelSignOut=()=>{
signOut()
dispatch(removeUser())
}
  return (
   
   <div className=' bg-amazon_light h-10 w-full text-sm text-white flex items-center px-4'>
    <a className='flex items-center  duration-300 gap-1 h-8 border cursor-pointer border-transparent hover:border-white px-2'>
        <LuMenu className='text-xl'/>All
    </a>
    {
        links.map((link,index)=>(
  <a href={link.path} key={link.id} className="hover:text-amazon_yellow hidden duration-300 md:inline-flex items-center  h-8 border cursor-pointer border-transparent hover:border-white px-2">
       {link.title}
    </a>
        ))
    }
  
  {
    userInfo && <button
    onClick={handelSignOut}
     className="hidden hover:text-red-400 text-amazon_yellow duration-300 md:inline-flex items-center 
      h-8 border cursor-pointer border-transparent hover:border-red-400 px-2"> Sign Out</button>

  }
    </div>
      
  )
}

export default BottomHeader
