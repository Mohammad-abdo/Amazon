import React from 'react'
import { HiOutlineTruck, HiOutlineSupport, HiOutlineCreditCard, HiOutlineThumbUp, HiOutlineShieldCheck } from 'react-icons/hi'

const features = [
  { icon: HiOutlineTruck, title: 'Free Delivery', subtitle: 'Orders over $20' },
  { icon: HiOutlineSupport, title: 'Support 24/7', subtitle: 'Always here for you' },
  { icon: HiOutlineCreditCard, title: 'Secure Payment', subtitle: 'Multiple methods' },
  { icon: HiOutlineThumbUp, title: 'Reliable', subtitle: 'Trusted shoppers' },
  { icon: HiOutlineShieldCheck, title: 'Guarantee', subtitle: '30-day exchange' },
]

const FeatureStrip = () => {
  return (
    <div className="w-full mt-8 py-5 border-y border-brand-50">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 xl:gap-6">
        {features.map(({ icon: Icon, title, subtitle }) => (
          <div key={title} className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 text-center sm:text-left">
            <div className="w-11 h-11 rounded-full bg-pastel-sand flex items-center justify-center flex-shrink-0">
              <Icon className="text-xl text-brand-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-brand-950">{title}</p>
              <p className="text-[10px] text-neutral-500 leading-snug hidden sm:block">{subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeatureStrip
