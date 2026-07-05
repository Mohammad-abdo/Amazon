import React from 'react'
import Link from 'next/link'
import ProductImage from './ProductImage'
import FormattedPrice from './FormattedPrice'
import { HiShoppingCart } from 'react-icons/hi'
import { FaHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, addToFavorite } from '@/store/nextslice'
import { useLanguage } from '@/contexts/LanguageContext'
import { productProps, StateProps, storeProduct } from '../../../type'

const ProductListItem = (product: productProps) => {
  const { _id, title, description, price, oldPrice, category, image } = product
  const dispatch = useDispatch()
  const { favoriteData } = useSelector((state: StateProps) => state.next)
  const { t } = useLanguage()
  const isFavorited = favoriteData.some((item: storeProduct) => item._id === _id)

  const handleAddToCart = () => dispatch(addToCart({ ...product, quantaty: 1 }))
  const handleAddToFavorite = () => dispatch(addToFavorite({ ...product, quantaty: 1 }))

  return (
    <div className="flex items-center gap-4 bg-white border border-cream rounded-2xl p-4 shadow-soft hover:shadow-md transition-shadow duration-300">
      <Link href={`/product/${_id}`} className="relative w-24 h-24 flex-shrink-0 bg-surface rounded-xl overflow-hidden">
        <ProductImage src={image} alt={title} fill className="object-contain p-2" />
      </Link>

      <div className="flex-1 min-w-0">
        <span className="text-[10px] text-brand-500 font-bold uppercase tracking-wider">{category}</span>
        <Link href={`/product/${_id}`}>
          <h3 className="font-semibold text-brand-950 text-sm line-clamp-1 hover:text-brand-600 transition-colors">{title}</h3>
        </Link>
        <p className="text-xs text-neutral-400 line-clamp-2 mt-1">{description}</p>
      </div>

      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold text-brand-950"><FormattedPrice amount={price} /></span>
          {oldPrice > price && (
            <span className="text-xs text-neutral-400 line-through"><FormattedPrice amount={oldPrice} /></span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleAddToFavorite}
            className={`w-9 h-9 rounded-full flex items-center justify-center border ${isFavorited ? 'text-red-500 border-red-200 bg-red-50' : 'text-neutral-400 border-cream hover:text-red-500'}`}
            title={t('product.saveToWishlist')}
          >
            <FaHeart className="text-sm" />
          </button>
          <button
            onClick={handleAddToCart}
            className="h-9 px-4 bg-brand-600 text-white rounded-xl text-xs font-semibold hover:bg-brand-500 transition-colors flex items-center gap-1.5"
          >
            <HiShoppingCart /> {t('product.addToCart')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductListItem
