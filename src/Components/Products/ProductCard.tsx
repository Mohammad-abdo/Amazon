import React from 'react'
import Link from 'next/link'
import FormattedPrice from './FormattedPrice'
import ProductImage from './ProductImage'
import { HiShoppingCart } from 'react-icons/hi'
import { FaHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, addToFavorite } from '@/store/nextslice'
import { useLanguage } from '@/contexts/LanguageContext'
import { productProps, StateProps, storeProduct } from '../../../type'

const ProductCard = ({
  _id,
  slug,
  title,
  description,
  price,
  oldPrice,
  category,
  categorySlug,
  categoryId,
  image,
  images,
  isNew,
}: productProps) => {
  const dispatch = useDispatch()
  const { favoriteData } = useSelector((state: StateProps) => state.next)
  const { t } = useLanguage()

  // Check if item is already in favorites to color the heart icon
  const isFavorited = favoriteData.some((item: storeProduct) => item._id === _id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(
      addToCart({
        _id,
        slug,
        category,
        categorySlug,
        categoryId,
        image,
        images,
        description,
        isNew,
        oldPrice,
        price,
        title,
        quantaty: 1,
      })
    )
  }

  const handleAddToFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(
      addToFavorite({
        _id,
        slug,
        category,
        categorySlug,
        categoryId,
        image,
        images,
        description,
        isNew,
        oldPrice,
        price,
        title,
        quantaty: 1,
      })
    )
  }

  const discountAmount = oldPrice - price

  return (
    <div className="group relative bg-white border border-cream hover:border-brand-200 rounded-3xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-500 flex flex-col h-full">
      <div className="relative w-full pt-[85%] bg-cream/40 overflow-hidden cursor-pointer">
        <Link href={`/product/${_id}`}>
          <ProductImage
            src={image}
            alt={title}
            fill
            sizes="(max-w-700px) 100vw, 300px"
            priority={isNew}
            className="object-contain p-6 transform group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Hover Quick Actions Drawer */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button
            onClick={handleAddToFavorite}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md bg-white hover:bg-cream transition-colors ${
              isFavorited ? 'text-red-500' : 'text-neutral-400 hover:text-red-500'
            }`}
            title={t('product.saveToWishlist')}
          >
            <FaHeart className="text-lg" />
          </button>
          <button
            onClick={handleAddToCart}
            className="w-10 h-10 rounded-full flex items-center justify-center shadow-md bg-white hover:bg-cream text-neutral-400 hover:text-brand-600 transition-colors"
            title={t('product.addToCart')}
          >
            <HiShoppingCart className="text-lg" />
          </button>
        </div>

        {/* Save/Discount Badge */}
        {oldPrice > price && (
          <span className="absolute top-4 left-4 bg-brand-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Save <FormattedPrice amount={discountAmount} />
          </span>
        )}
      </div>

      {/* Product Description Panel */}
      <div className="p-5 flex flex-col flex-1">
        <span className="text-[11px] text-brand-500 font-bold uppercase tracking-wider mb-1.5">
          {category}
        </span>
        
        <Link href={`/product/${_id}`} className="hover:text-brand-600 transition-colors duration-200">
          <h3 className="font-semibold text-brand-950 text-base line-clamp-1 mb-1">
            {title}
          </h3>
        </Link>
        
        <p className="text-xs text-neutral-500 line-clamp-2 mb-4 leading-relaxed flex-1">
          {description}
        </p>

        {/* Price & CTA */}
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-brand-950">
              <FormattedPrice amount={price} />
            </span>
            {oldPrice > price && (
              <span className="text-xs text-neutral-400 line-through">
                <FormattedPrice amount={oldPrice} />
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full h-11 bg-brand-600 text-white rounded-2xl font-medium text-sm transition-all duration-300 hover:bg-brand-500 active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:shadow-brand-600/20"
          >
            <HiShoppingCart className="text-base" />
            {t('product.addToCart')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
