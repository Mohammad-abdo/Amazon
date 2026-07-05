import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

interface props {
  step: 'address' | 'review'
}

const StepIndicator = ({ step }: props) => {
  const { t } = useLanguage()
  const steps: { key: props['step']; label: string }[] = [
    { key: 'address', label: t('checkout.shippingAddress') },
    { key: 'review', label: t('checkout.reviewPlace') },
  ]
  const activeIndex = steps.findIndex((s) => s.key === step)

  return (
    <div className="flex items-center gap-3 mb-8">
      {steps.map((s, idx) => (
        <React.Fragment key={s.key}>
          <div className="flex items-center gap-2">
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                idx <= activeIndex ? 'bg-brand-600 text-white' : 'bg-cream text-neutral-400'
              }`}
            >
              {idx + 1}
            </span>
            <span className={`text-xs font-semibold ${idx <= activeIndex ? 'text-brand-950' : 'text-neutral-400'}`}>
              {s.label}
            </span>
          </div>
          {idx < steps.length - 1 && <div className="flex-1 h-px bg-cream" />}
        </React.Fragment>
      ))}
    </div>
  )
}

export default StepIndicator
