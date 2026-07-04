import React from 'react'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import FormattedPrice from '@/Components/Products/FormattedPrice'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, addToFavorite } from '@/store/nextslice'
import { productProps, StateProps, storeProduct } from '../../../type'
import { HiShoppingCart } from 'react-icons/hi'
import { FaHeart, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import { IoMdArrowBack } from 'react-icons/io'
import { MdVerifiedUser, MdOutlineLocalShipping } from 'react-icons/md'

interface ProductPageProps {
  product: productProps
}

const ProductDetail = ({ product }: ProductPageProps) => {
  const dispatch = useDispatch()
  const { favoriteData } = useSelector((state: StateProps) => state.next)
  
  if (!product) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50">
      <h2 className="text-xl font-semibold text-slate-700">Product not found</h2>
      <Link href="/" className="mt-4 text-indigo-600 hover:underline">Back to shopping</Link>
    </div>
  )

  const isFavorited = favoriteData.some((item: storeProduct) => item._id === product._id)
  const discountAmount = product.oldPrice - product.price
  const percentSaved = Math.round((discountAmount / product.oldPrice) * 100)

  // Generate mock rating stars based on product id
  const rating = 4.2 + (product._id % 9) / 10
  const reviewsCount = 42 + (product._id % 200)

  const renderStars = (ratingVal: number) => {
    const stars = []
    const floor = Math.floor(ratingVal)
    for (let i = 1; i <= 5; i++) {
      if (i <= floor) {
        stars.push(<FaStar key={i} className="text-amber-400" />)
      } else if (i === floor + 1 && ratingVal % 1 >= 0.3) {
        stars.push(<FaStarHalfAlt key={i} className="text-amber-400" />)
      } else {
        stars.push(<FaRegStar key={i} className="text-slate-300" />)
      }
    }
    return stars
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantaty: 1
      })
    )
  }

  const handleAddToFavorite = () => {
    dispatch(
      addToFavorite({
        ...product,
        quantaty: 1
      })
    )
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Breadcrumb & Back button */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/" 
            className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <IoMdArrowBack className="text-base" />
            <span>Back to Products</span>
          </Link>
          <div className="text-xs text-slate-400 font-medium">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-slate-500">{product.category}</span>
          </div>
        </div>

        {/* Dynamic Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 bg-white border border-slate-100 p-6 md:p-10 rounded-3xl shadow-sm">
          
          {/* Left Column: Product Image Media */}
          <div className="relative bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center p-8 aspect-square overflow-hidden group">
            <Image 
              src={product.image} 
              alt={product.title} 
              fill
              sizes="(max-w-768px) 100vw, 500px"
              priority
              className="object-contain p-8 transform group-hover:scale-105 transition-transform duration-500"
            />
            {percentSaved > 0 && (
              <span className="absolute top-4 left-4 bg-red-500 text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm animate-pulse">
                {percentSaved}% OFF
              </span>
            )}
          </div>

          {/* Right Column: Specifications & CTAs */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Category, Brand, & Title */}
              <span className="text-xs text-indigo-650 font-bold uppercase tracking-widest block mb-1">
                {product.category}
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight mb-2">
                {product.title}
              </h1>
              
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                  Brand: {product.brand}
                </span>
                
                {/* Rating display */}
                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  <div className="flex items-center">{renderStars(rating)}</div>
                  <span className="text-slate-500">({reviewsCount} reviews)</span>
                </div>
              </div>

              <hr className="border-slate-100 my-4" />

              {/* Price block */}
              <div className="mb-5">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-slate-900">
                    <FormattedPrice amount={product.price} />
                  </span>
                  {product.oldPrice > product.price && (
                    <span className="text-base text-slate-400 line-through">
                      <FormattedPrice amount={product.oldPrice} />
                    </span>
                  )}
                </div>
                {product.oldPrice > product.price && (
                  <p className="text-xs text-green-600 font-bold mt-1">
                    You save <FormattedPrice amount={discountAmount} /> ({percentSaved}%)
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-slate-800 mb-2">Overview</h3>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed text-justify">
                  {product.description}
                </p>
              </div>

              {/* Service Badges */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50/50 border border-slate-100 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2">
                  <MdOutlineLocalShipping className="text-indigo-600 text-lg" />
                  <div className="text-[11px] text-slate-600">
                    <span className="font-bold block">Free Shipping</span>
                    <span>For members/orders</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MdVerifiedUser className="text-indigo-600 text-lg" />
                  <div className="text-[11px] text-slate-600">
                    <span className="font-bold block">1-Year Warranty</span>
                    <span>100% Genuine product</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={handleAddToCart}
                className="flex-1 h-12 bg-slate-900 text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-indigo-600 active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
              >
                <HiShoppingCart className="text-lg" />
                Add to Shopping Cart
              </button>
              
              <button
                onClick={handleAddToFavorite}
                className={`h-12 px-6 border rounded-xl flex items-center justify-center transition-all duration-300 font-semibold text-sm ${
                  isFavorited 
                    ? 'border-red-200 bg-red-50 text-red-500 hover:bg-red-100/55' 
                    : 'border-slate-200 bg-white text-slate-500 hover:text-red-500 hover:border-red-200'
                }`}
                title="Save to Favorites"
              >
                <FaHeart className="mr-2" />
                {isFavorited ? 'Favorited' : 'Save to Wishlist'}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query

  try {
    const res = await fetch("https://fakestoreapiserver.reactbd.com/tech")
    const products: productProps[] = await res.json()
    
    // Find the product matching the ID
    const product = products.find((item) => item._id === Number(id)) || null

    return {
      props: {
        product,
      },
    }
  } catch (error) {
    console.error('Error fetching product details:', error)
    return {
      props: {
        product: null,
      },
    }
  }
}

export default ProductDetail
