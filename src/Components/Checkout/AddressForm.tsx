import React, { useState } from 'react'
import { Address } from '../../../type'

interface props {
  initialAddress: Address
  onSubmit: (address: Address) => void
}

const emptyAddress: Address = {
  name: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  zip: '',
  country: '',
  phone: '',
}

const AddressForm = ({ initialAddress, onSubmit }: props) => {
  const [address, setAddress] = useState<Address>(initialAddress || emptyAddress)

  const handleChange = (field: keyof Address) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(address)
  }

  const inputClass = 'h-11 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:border-indigo-500 w-full'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg">
      <input required placeholder="Full name" value={address.name} onChange={handleChange('name')} className={inputClass} />
      <input required placeholder="Address line 1" value={address.line1} onChange={handleChange('line1')} className={inputClass} />
      <input placeholder="Address line 2 (optional)" value={address.line2} onChange={handleChange('line2')} className={inputClass} />
      <div className="grid grid-cols-2 gap-4">
        <input required placeholder="City" value={address.city} onChange={handleChange('city')} className={inputClass} />
        <input required placeholder="State / Province" value={address.state} onChange={handleChange('state')} className={inputClass} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input required placeholder="ZIP / Postal code" value={address.zip} onChange={handleChange('zip')} className={inputClass} />
        <input required placeholder="Country" value={address.country} onChange={handleChange('country')} className={inputClass} />
      </div>
      <input required placeholder="Phone number" value={address.phone} onChange={handleChange('phone')} className={inputClass} />

      <button
        type="submit"
        className="h-11 mt-2 bg-slate-900 text-white rounded-xl font-medium text-sm transition-all duration-300 hover:bg-indigo-600 active:scale-[0.98] self-start px-8"
      >
        Continue to Review
      </button>
    </form>
  )
}

export default AddressForm
