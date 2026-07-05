import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StateProps, storeProduct } from '../../type'
import Link from 'next/link'
import Head from 'next/head'
import FormattedPrice from '@/Components/Products/FormattedPrice'
import ProductImage from '@/Components/Products/ProductImage'
import { deleteFavorite, addToCart } from '@/store/nextslice'
import { FaHeartBroken } from 'react-icons/fa'
import { HiOutlineHeart as HeartIcon, HiShoppingCart } from 'react-icons/hi'
import { IoMdClose as CloseIcon } from 'react-icons/io'

const Favorites = () => {
  const { favoriteData } = useSelector((state: StateProps) => state.next)
  const dispatch = useDispatch()

  const handleAddToCart = (item: storeProduct) => {
    dispatch(
      addToCart({
        ...item,
        quantaty: 1,
      })
    )
  }

  return (
    <>
      <Head>
        <title>My Wishlist & Favorites - Souqi</title>
        <meta name="description" content="View your saved items, move items to cart, and manage your custom Souqi shopping wishlist." />
      </Head>
      <div className="page-container py-8 min-h-[70vh] bg-surface">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between border-b border-cream pb-4 mb-6">
          <h1 className="text-2xl font-bold text-brand-950 flex items-center gap-2">
            Favorites & Wishlist
          </h1>
          <p className="text-sm font-semibold text-brand-600">
            {favoriteData.length} {favoriteData.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        {favoriteData.length > 0 ? (
          <div className="flex flex-col gap-4">
            {favoriteData.map((item: storeProduct) => (
              <div 
                key={item._id} 
                className="bg-white border border-cream rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-soft hover:shadow-card transition-shadow duration-300"
              >
                {/* Product Image */}
                <div className="relative w-28 h-28 bg-cream/40 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center border border-cream p-2">
                  <Link href={`/product/${item._id}`}>
                    <ProductImage
                      width={100}
                      height={100}
                      src={item.image}
                      alt={item.title}
                      className="object-contain w-full h-full transform hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </div>

                {/* Details Panel */}
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-brand-600 font-bold uppercase tracking-wider">
                      {item.category}
                    </span>
                    <Link href={`/product/${item._id}`} className="hover:text-brand-700 transition-colors">
                      <h4 className="text-base font-semibold text-brand-950 line-clamp-1">
                        {item.title}
                      </h4>
                    </Link>
                    <p className="text-xs text-neutral-500 line-clamp-1 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-sm font-bold text-brand-950">
                        <FormattedPrice amount={item.price} />
                      </span>
                      {item.oldPrice > item.price && (
                        <span className="text-xs text-neutral-400 line-through">
                          <FormattedPrice amount={item.oldPrice} />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end sm:justify-start">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="h-10 px-4 bg-brand-600 text-white rounded-xl font-medium text-xs transition-all duration-300 hover:bg-brand-500 active:scale-[0.98] flex items-center gap-1.5 shadow-sm hover:shadow-md"
                    >
                      <HiShoppingCart className="text-sm" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => dispatch(deleteFavorite(item._id))}
                      className="h-10 px-3 border border-cream text-neutral-400 hover:text-red-500 hover:border-red-200 bg-white rounded-xl text-xs transition-all flex items-center gap-1"
                      title="Remove from Wishlist"
                    >
                      <CloseIcon className="text-base" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Wishlist State */
          <div className="max-w-md mx-auto bg-white border border-cream rounded-2xl p-8 text-center shadow-soft flex flex-col items-center justify-center my-12">
            <div className="w-20 h-20 rounded-full bg-brand-50 flex items-center justify-center mb-6 text-brand-300">
              <HeartIcon className="text-4xl text-brand-200" />
            </div>
            <h2 className="text-xl font-bold text-brand-950 mb-2">Your wishlist is empty</h2>
            <p className="text-xs text-neutral-500 max-w-xs mb-6 leading-relaxed">
              Explore our catalogue and tap the heart icon on your favorite items to save them here for later!
            </p>
            <Link href="/">
              <button className="h-11 px-8 bg-brand-600 text-white rounded-xl font-medium text-sm transition-all duration-300 hover:bg-brand-500 active:scale-[0.98] shadow-sm hover:shadow-md">
                Discover Products
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default Favorites
