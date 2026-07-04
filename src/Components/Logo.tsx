import React from 'react'

const Logo = ({className}:{className?:string}) => {
  return (
    <div className={`flex items-center gap-2.5 ${className || ''}`}>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform hover:scale-105 transition-transform duration-300">
        <defs>
          <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <rect width="36" height="36" rx="10" fill="url(#logo-grad)" />
        {/* Modern clean intersecting geometric lines forming an 'N' */}
        <path d="M10 26V10H14.5L21.5 20.5V10H25.5V26H21.2L14 15.2V26H10Z" fill="#ffffff" />
      </svg>
      <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent font-sans">
        Nexis
      </span>
    </div>
  )
}

export default Logo