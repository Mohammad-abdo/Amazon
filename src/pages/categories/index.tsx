import Head from 'next/head'
import { GetStaticProps } from 'next'
import { Category } from '../../../type'
import { getCategories } from '@/lib/api'
import CategoryCard from '@/Components/Products/CategoryCard'
import { useLanguage } from '@/contexts/LanguageContext'

interface props {
  categories: Category[]
}

const Categories = ({ categories }: props) => {
  const { t } = useLanguage()

  return (
    <>
      <Head>
        <title>Shop by Category - Souqi</title>
        <meta name="description" content="Browse the full Souqi catalog by category." />
      </Head>
      <div className="page-container py-8 min-h-[70vh] bg-surface">
        <h1 className="text-2xl font-bold text-brand-950 mb-6">{t('shop.shopByCategory')}</h1>
        {categories.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} {...cat} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-neutral-400">{t('shop.noCategories')}</p>
        )}
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const categories = await getCategories()
    return { props: { categories }, revalidate: 3600 }
  } catch (error) {
    console.error('Error fetching categories:', error)
    return { props: { categories: [] }, revalidate: 60 }
  }
}

export default Categories
