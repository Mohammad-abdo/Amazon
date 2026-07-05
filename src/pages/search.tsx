import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { productProps } from '../../type'
import { getProducts } from '@/lib/api'
import Products from '@/Components/Products/Products'
import { useLanguage } from '@/contexts/LanguageContext'

const Search = () => {
  const router = useRouter()
  const { t } = useLanguage()
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
        <title>{query ? `Search results for "${query}"` : 'Search'} - Souqi</title>
      </Head>
      <div className="page-container py-8 min-h-[70vh] bg-surface">
        <h1 className="text-2xl font-bold text-brand-950 mb-6">
          {query ? `${t('search.resultsForPrefix')} "${query}"` : t('search.title')}
        </h1>

        {!query && (
          <p className="text-sm text-neutral-500">{t('search.enterTerm')}</p>
        )}

        {loading && <p className="text-sm text-neutral-500">{t('search.searching')}</p>}

        {error && (
          <p className="text-sm text-red-500">{t('search.error')}</p>
        )}

        {!loading && !error && query && results.length === 0 && (
          <p className="text-sm text-neutral-500">{t('search.noResults')} &quot;{query}&quot;.</p>
        )}

        {!loading && !error && results.length > 0 && <Products productData={results} />}
      </div>
    </>
  )
}

export default Search
