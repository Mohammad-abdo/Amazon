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
   
    <div className='bg-slate-900 text-slate-300 border-b border-slate-800 h-10 w-full text-xs sm:text-sm flex items-center px-4 justify-between'>
      <div className="flex items-center gap-1 sm:gap-2">
        <a className='flex items-center gap-1 h-8 cursor-pointer hover:bg-slate-800 hover:text-white px-3.5 rounded-lg transition-all duration-200 font-medium'>
          <LuMenu className='text-lg'/> All Categories
        </a>
        {
          links.map((link)=>(
            <a 
              href={link.path} 
              key={link.id} 
              className="hover:bg-slate-800 hover:text-white hidden md:inline-flex items-center h-8 cursor-pointer px-3.5 rounded-lg transition-all duration-200 font-medium"
            >
              {link.title}
            </a>
          ))
        }
      </div>
      
      {
        userInfo && (
          <button
            onClick={handelSignOut}
            className="hover:bg-red-950/30 hover:text-red-400 text-red-500 duration-200 md:inline-flex items-center h-8 cursor-pointer px-3.5 rounded-lg transition-all font-semibold text-xs uppercase tracking-wider"
          >
            Sign Out
          </button>
        )
      }
    </div>
      
  )
}

export default BottomHeader
