import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Category, productProps } from '../../../type'
import { getCategories, getProductsByCategoryId } from '@/lib/api'
import Products from '@/Components/Products/Products'
import { IoMdArrowBack } from 'react-icons/io'

const PAGE_SIZE = 12

interface props {
  category: Category
  productData: productProps[]
}

const CategoryPage = ({ category, productData }: props) => {
  const [products, setProducts] = useState(productData)
  const [offset, setOffset] = useState(productData.length)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(productData.length === PAGE_SIZE)

  const handleLoadMore = async () => {
    setLoadingMore(true)
    try {
      const more = await getProductsByCategoryId(category.id, { offset, limit: PAGE_SIZE })
      setProducts((prev) => [...prev, ...more])
      setOffset((prev) => prev + more.length)
      setHasMore(more.length === PAGE_SIZE)
    } catch (error) {
      console.error('Error loading more products:', error)
      setHasMore(false)
    } finally {
      setLoadingMore(false)
    }
  }

  return (
    <>
      <Head>
        <title>{category.name} - Nexis Premium E-Commerce</title>
        <meta name="description" content={`Shop ${category.name} at Nexis.`} />
      </Head>
      <div className="max-w-screen-2xl mx-auto py-8 px-4 sm:px-6 min-h-[70vh] bg-slate-50">
        <div className="flex items-center justify-between mb-6">
          <Link href="/categories" className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">
            <IoMdArrowBack className="text-base" />
            <span>All Categories</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">{category.name}</h1>
        </div>

        {products.length > 0 ? (
          <>
            <Products productData={products} />
            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="h-11 px-8 bg-slate-900 text-white rounded-xl font-medium text-sm transition-all duration-300 hover:bg-indigo-600 active:scale-[0.98] disabled:opacity-50"
                >
                  {loadingMore ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-sm text-slate-400 text-center py-12">No products found in this category yet.</p>
        )}
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const categories = await getCategories()
    return {
      paths: categories.map((c) => ({ params: { slug: c.slug } })),
      fallback: 'blocking',
    }
  } catch {
    return { paths: [], fallback: 'blocking' }
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = String(context.params?.slug)

  const categories = await getCategories()
  const category = categories.find((c) => c.slug === slug)
  if (!category) {
    return { notFound: true, revalidate: 60 }
  }

  let productData: productProps[] = []
  try {
    productData = await getProductsByCategoryId(category.id, { limit: PAGE_SIZE })
  } catch (error) {
    console.error('Error fetching category products:', error)
  }

  return {
    props: { category, productData },
    revalidate: 300,
  }
}

export default CategoryPage
