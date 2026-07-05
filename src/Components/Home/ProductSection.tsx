import React from 'react'
import Link from 'next/link'
import Products from '@/Components/Products/Products'
import { useLanguage } from '@/contexts/LanguageContext'
import { productProps } from '../../../type'

interface props {
  title: string
  viewAllHref: string
  productData: productProps[]
}

const ProductSection = ({ title, viewAllHref, productData }: props) => {
  const { t } = useLanguage()
  if (productData.length === 0) return null

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-5 px-6">
        <h2 className="text-xl font-bold text-brand-950">{title}</h2>
        <Link href={viewAllHref} className="text-xs font-semibold text-brand-600 hover:text-brand-500 transition-colors">
          {t('home.viewAll')}
        </Link>
      </div>
      <Products productData={productData} />
    </section>
  )
}

export default ProductSection
