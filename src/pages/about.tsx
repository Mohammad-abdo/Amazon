import Head from 'next/head'
import { useLanguage } from '@/contexts/LanguageContext'

const About = () => {
  const { t } = useLanguage()

  return (
    <>
      <Head>
        <title>About Us - Souqi</title>
        <meta name="description" content="Learn more about Souqi." />
      </Head>
      <div className="max-w-screen-2xl mx-auto py-12 px-4 sm:px-6 min-h-[70vh] bg-surface">
        <div className="max-w-2xl mx-auto bg-white border border-cream rounded-2xl p-8 shadow-soft">
          <h1 className="text-2xl font-bold text-brand-950 mb-4">{t('about.title')}</h1>
          <p className="text-sm text-neutral-500 leading-relaxed mb-4">
            Souqi is a curated storefront demo showcasing a modern shopping
            experience — browse by category, search the catalog, save favorites, check out, and
            track your order history, all built on Next.js, Redux, and Tailwind CSS.
          </p>
          <p className="text-sm text-neutral-500 leading-relaxed">
            Product data is sourced from a public demo API, so catalog contents may vary. This
            site is intended as a showcase project rather than a production storefront.
          </p>
        </div>
      </div>
    </>
  )
}

export default About
