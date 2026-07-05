import React from 'react'
import { HiOutlineTruck, HiOutlineSupport, HiOutlineCreditCard, HiOutlineThumbUp, HiOutlineShieldCheck } from 'react-icons/hi'

const features = [
  { icon: HiOutlineTruck, title: 'Free Delivery', subtitle: 'Free shipping for orders over $20' },
  { icon: HiOutlineSupport, title: 'Support 24/7', subtitle: '24 hours a day, 7 days a week' },
  { icon: HiOutlineCreditCard, title: 'Secure Payment', subtitle: 'Pay with multiple methods' },
  { icon: HiOutlineThumbUp, title: 'Reliable', subtitle: 'Trusted by thousands of shoppers' },
  { icon: HiOutlineShieldCheck, title: 'Guarantee', subtitle: 'Within 30 days for an exchange' },
]

const FeatureStrip = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 px-4 sm:px-6 mt-6">
      {features.map(({ icon: Icon, title, subtitle }) => (
        <div key={title} className="bg-white border border-cream rounded-2xl p-4 flex items-center gap-3 shadow-soft hover:shadow-card transition-shadow duration-300">
          <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
            <Icon className="text-xl text-brand-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-brand-950">{title}</p>
            <p className="text-[11px] text-neutral-500 leading-snug">{subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FeatureStrip
