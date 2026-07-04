
import { useState } from 'react'
import Head from 'next/head'
import Banner from '@/Components/Banner'
import Products from '@/Components/Products/Products'
import { productProps } from '../../type'

interface props {
  productData: productProps[]
}

const categoryIcons: Record<string, string> = {
  All: '🛍️',
  Headphones: '🎧',
  'Mobiles & Tablets': '📱',
  'Smart Watches': '⌚',
  Bluetooth: '🔌',
  'CPU Heat Pipes': '💻',
  Shoes: '👟',
  'Discover Skincare': '🧴',
  'Awesome Lip Care': '💄',
  Bracelets: '✨',
  Earrings: '💎',
}

export default function Home({ productData }: props) {
  const [activeCategory, setActiveCategory] = useState('All')

  // Generate unique categories dynamically from the data
  const categories = ['All', ...Array.from(new Set(productData.map((item) => {
    // Normalize category naming slightly
    if (item.category.toLowerCase().includes('watch')) return 'Smart Watches'
    if (item.category.toLowerCase().includes('mobile') || item.category.toLowerCase().includes('tablet') || item.category.toLowerCase().includes('ipad')) return 'Mobiles & Tablets'
    return item.category
  })))]

  // Filter products by category
  const filteredProducts = activeCategory === 'All' 
    ? productData 
    : productData.filter((item) => {
        const cat = item.category.toLowerCase()
        if (activeCategory === 'Smart Watches') return cat.includes('watch')
        if (activeCategory === 'Mobiles & Tablets') return cat.includes('mobile') || cat.includes('tablet') || cat.includes('ipad')
        return item.category === activeCategory
      })

  return (
    <>
      <Head>
        <title>Nexis Premium - Curated Luxury Tech, Accessories & Lifestyle</title>
        <meta name="description" content="Explore a curated selection of smart watches, audio gear, phones, fine shoes, and advanced organic cosmetics at Nexis E-Shop." />
      </Head>
      <main className="bg-slate-50 min-h-screen pb-20">
        <div className="max-w-screen-2xl mx-auto">
          <Banner />
          
          {/* Dynamic Category Tabs */}
          <div className="relative z-30 max-w-7xl mx-auto px-6 -mt-8 md:-mt-16 xl:-mt-36 mb-8">
            <div className="bg-white/90 backdrop-blur-md border border-slate-100 rounded-2xl p-4 shadow-lg flex flex-wrap items-center justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold flex items-center gap-2 transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{categoryIcons[category] || '📦'}</span>
                  <span>{category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Catalog */}
          <div className="relative z-20 mb-10 max-w-7xl mx-auto">
            <Products productData={filteredProducts} />
          </div>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps=async () => {
  const res=await fetch("https://fakestoreapiserver.reactbd.com/tech")
 const productData=await res.json()

 return {props:{productData}}
  
}
