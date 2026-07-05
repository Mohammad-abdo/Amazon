import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { productProps } from '../../type'
import { getProducts } from '@/lib/api'
import Products from '@/Components/Products/Products'

const Search = () => {
  const router = useRouter()
  const query = typeof router.query.q === 'string' ? router.query.q : ''

  const [results, setResults] = useState<productProps[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!query) {
      setResults([])
      return
    }

    let cancelled = false
    setLoading(true)
    setError(false)

    getProducts({ title: query, limit: 24 })
      .then((data) => {
        if (!cancelled) setResults(data)
      })
      .catch((err) => {
        console.error('Search failed:', err)
        if (!cancelled) setError(true)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [query])

  return (
    <>
      <Head>
        <title>{query ? `Search results for "${query}"` : 'Search'} - Nexis Premium E-Commerce</title>
      </Head>
      <div className="max-w-screen-2xl mx-auto py-8 px-4 sm:px-6 min-h-[70vh] bg-slate-50">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">
          {query ? `Search results for "${query}"` : 'Search'}
        </h1>

        {!query && (
          <p className="text-sm text-slate-400">Enter a search term above to find products.</p>
        )}

        {loading && <p className="text-sm text-slate-400">Searching...</p>}

        {error && (
          <p className="text-sm text-red-500">Something went wrong while searching. Please try again.</p>
        )}

        {!loading && !error && query && results.length === 0 && (
          <p className="text-sm text-slate-400">No products found for &quot;{query}&quot;.</p>
        )}

        {!loading && !error && results.length > 0 && <Products productData={results} />}
      </div>
    </>
  )
}

export default Search
