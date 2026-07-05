import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import Banner from '@/Components/Banner'
import Products from '@/Components/Products/Products'
import { Category, productProps } from '../../type'
import { getCategories, getProducts } from '@/lib/api'

interface props {
  productData: productProps[]
  categories: Category[]
}

export default function Home({ productData, categories }: props) {
  return (
    <>
      <Head>
        <title>Nexis Premium - Curated Luxury Tech, Accessories & Lifestyle</title>
        <meta name="description" content="Explore a curated selection of tech, accessories, apparel and lifestyle products at Nexis E-Shop." />
      </Head>
      <main className="bg-slate-50 min-h-screen pb-20">
        <div className="max-w-screen-2xl mx-auto">
          <Banner />

          {/* Category Nav */}
          <div className="relative z-30 max-w-7xl mx-auto px-6 -mt-8 md:-mt-16 xl:-mt-36 mb-8">
            <div className="bg-white/90 backdrop-blur-md border border-slate-100 rounded-2xl p-4 shadow-lg flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/categories"
                className="px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold flex items-center gap-2 transition-all duration-300 bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
              >
                <span>🛍️</span>
                <span>All Categories</span>
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold flex items-center gap-2 transition-all duration-300 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                >
                  <span>📦</span>
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Product Catalog */}
          <div className="relative z-20 mb-10 max-w-7xl mx-auto">
            <Products productData={productData} />
          </div>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const [productData, categories] = await Promise.all([
      getProducts({ limit: 20 }),
      getCategories(),
    ])

    return {
      props: { productData, categories },
      revalidate: 300,
    }
  } catch (error) {
    console.error('Error fetching home page data:', error)
    return {
      props: { productData: [], categories: [] },
      revalidate: 60,
    }
  }
}
