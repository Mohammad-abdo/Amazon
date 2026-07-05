import React, { useMemo, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Category, productProps } from '../../../type'
import { getCategories, getProductsByCategoryId } from '@/lib/api'
import Products from '@/Components/Products/Products'
import ProductListItem from '@/Components/Products/ProductListItem'
import ProductImage from '@/Components/Products/ProductImage'
import CategoryFilterSidebar from '@/Components/Shop/CategoryFilterSidebar'
import SortAndViewBar, { SortOption, ViewMode } from '@/Components/Shop/SortAndViewBar'
import Pagination from '@/Components/Shop/Pagination'
import { useLanguage } from '@/contexts/LanguageContext'
import { IoMdArrowBack } from 'react-icons/io'

const PAGE_SIZE = 12

interface props {
  category: Category
  categories: Category[]
  productData: productProps[]
}

const CategoryPage = ({ category, categories, productData }: props) => {
  const { t } = useLanguage()
  const [products, setProducts] = useState(productData)
  const [page, setPage] = useState(1)
  const [maxKnownPage, setMaxKnownPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(productData.length === PAGE_SIZE)
  const [loading, setLoading] = useState(false)
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [sort, setSort] = useState<SortOption>('default')
  const [view, setView] = useState<ViewMode>('grid')

  const loadPage = async (pageNum: number, min: string, max: string) => {
    setLoading(true)
    try {
      const results = await getProductsByCategoryId(category.id, {
        offset: (pageNum - 1) * PAGE_SIZE,
        limit: PAGE_SIZE,
        priceMin: min ? Number(min) : undefined,
        priceMax: max ? Number(max) : undefined,
      })
      setProducts(results)
      setPage(pageNum)
      setMaxKnownPage((prev) => Math.max(prev, pageNum))
      setHasNextPage(results.length === PAGE_SIZE)
    } catch (error) {
      console.error('Error loading category products:', error)
      setHasNextPage(false)
    } finally {
      setLoading(false)
    }
  }

  const handleApplyPrice = (min: string, max: string) => {
    setPriceRange({ min, max })
    setMaxKnownPage(1)
    loadPage(1, min, max)
  }

  const handlePageChange = (pageNum: number) => {
    if (pageNum < 1) return
    loadPage(pageNum, priceRange.min, priceRange.max)
  }

  const sortedProducts = useMemo(() => {
    const list = [...products]
    switch (sort) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price)
      case 'newest':
        return list.sort((a, b) => Number(b.isNew) - Number(a.isNew))
      default:
        return list
    }
  }, [products, sort])

  return (
    <>
      <Head>
        <title>{category.name} - Souqi</title>
        <meta name="description" content={`Shop ${category.name} at Souqi.`} />
      </Head>
      <div className="page-container py-8 min-h-[70vh] bg-surface">
        <div className="flex items-center justify-between mb-6">
          <Link href="/categories" className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-neutral-500 hover:text-brand-950 transition-colors">
            <IoMdArrowBack className="text-base" />
            <span>{t('shop.allCategories')}</span>
          </Link>
          <h1 className="text-2xl font-bold text-brand-950">{category.name}</h1>
        </div>

        {/* Category quick-nav row */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className={`flex flex-col items-center gap-1.5 flex-shrink-0 w-20 ${cat.id === category.id ? 'text-brand-600' : 'text-neutral-500'}`}
            >
              <span className={`relative w-14 h-14 rounded-full overflow-hidden border-2 ${cat.id === category.id ? 'border-brand-500' : 'border-cream'} bg-white`}>
                <ProductImage src={cat.image} alt={cat.name} fill className="object-cover" />
              </span>
              <span className="text-[10px] font-semibold text-center line-clamp-1">{cat.name}</span>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr] 2xl:grid-cols-[320px_1fr] gap-6 xl:gap-8">
          <CategoryFilterSidebar
            categories={categories}
            activeCategoryId={category.id}
            priceMin={priceRange.min}
            priceMax={priceRange.max}
            onApplyPrice={handleApplyPrice}
          />

          <div>
            <SortAndViewBar
              resultCount={sortedProducts.length}
              sort={sort}
              onSortChange={setSort}
              view={view}
              onViewChange={setView}
            />

            {loading ? (
              <p className="text-sm text-neutral-400 text-center py-12">{t('common.loading')}</p>
            ) : sortedProducts.length > 0 ? (
              <>
                {view === 'grid' ? (
                  <Products productData={sortedProducts} />
                ) : (
                  <div className="flex flex-col gap-3">
                    {sortedProducts.map((p) => (
                      <ProductListItem key={p._id} {...p} />
                    ))}
                  </div>
                )}
                <Pagination
                  currentPage={page}
                  maxKnownPage={maxKnownPage}
                  hasNextPage={hasNextPage}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <p className="text-sm text-neutral-400 text-center py-12">{t('shop.noProductsFiltered')}</p>
            )}
          </div>
        </div>
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
    props: { category, categories, productData },
    revalidate: 300,
  }
}

export default CategoryPage
