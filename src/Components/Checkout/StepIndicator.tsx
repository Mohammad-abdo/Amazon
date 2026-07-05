import React from 'react'

interface props {
  step: 'address' | 'review'
}

const steps: { key: props['step']; label: string }[] = [
  { key: 'address', label: 'Shipping Address' },
  { key: 'review', label: 'Review & Place Order' },
]

const StepIndicator = ({ step }: props) => {
  const activeIndex = steps.findIndex((s) => s.key === step)

  return (
    <div className="flex items-center gap-3 mb-8">
      {steps.map((s, idx) => (
        <React.Fragment key={s.key}>
          <div className="flex items-center gap-2">
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                idx <= activeIndex ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'
              }`}
            >
              {idx + 1}
            </span>
            <span className={`text-xs font-semibold ${idx <= activeIndex ? 'text-slate-800' : 'text-slate-400'}`}>
              {s.label}
            </span>
          </div>
          {idx < steps.length - 1 && <div className="flex-1 h-px bg-slate-200" />}
        </React.Fragment>
      ))}
    </div>
  )
}

export default StepIndicator
