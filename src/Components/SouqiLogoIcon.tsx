import React from 'react'

interface SouqiLogoIconProps {
  className?: string
  color?: string
}

const SouqiLogoIcon = ({ className = 'w-9 h-9', color = '#D47A01' }: SouqiLogoIconProps) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M18 24c0-6.627 5.373-12 12-12h4c6.627 0 12 5.373 12 12v2H18v-2z" fill={color} />
    <path d="M14 28h36l-2 24H16L14 28z" fill={color} />
    <path d="M26 22h12v2H26v-2z" fill="#FDFDFD" />
    <path d="M30 34c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" fill="#FDFDFD" />
    <path
      d="M31 36.5c0 .83.67 1.5 1.5 1.5h1c.83 0 1.5-.67 1.5-1.5"
      stroke="#FDFDFD"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path d="M10 44c4-8 12-14 22-14s18 6 22 14" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <path d="M48 30l8-6-4 10" fill={color} />
  </svg>
)

export default SouqiLogoIcon
