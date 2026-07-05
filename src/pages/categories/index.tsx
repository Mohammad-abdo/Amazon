import Head from 'next/head'
import { GetStaticProps } from 'next'
import { Category } from '../../../type'
import { getCategories } from '@/lib/api'
import CategoryCard from '@/Components/Products/CategoryCard'

interface props {
  categories: Category[]
}

const Categories = ({ categories }: props) => {
  return (
    <>
      <Head>
        <title>Shop by Category - Nexis Premium E-Commerce</title>
        <meta name="description" content="Browse the full Nexis catalog by category." />
      </Head>
      <div className="max-w-screen-2xl mx-auto py-8 px-4 sm:px-6 min-h-[70vh] bg-slate-50">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Shop by Category</h1>
        {categories.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} {...cat} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400">No categories available right now.</p>
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
