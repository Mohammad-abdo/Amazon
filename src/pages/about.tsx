import Head from 'next/head'

const About = () => {
  return (
    <>
      <Head>
        <title>About Us - Nexis Premium E-Commerce</title>
        <meta name="description" content="Learn more about Nexis Premium E-Commerce." />
      </Head>
      <div className="max-w-screen-2xl mx-auto py-12 px-4 sm:px-6 min-h-[70vh] bg-slate-50">
        <div className="max-w-2xl mx-auto bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">About Nexis</h1>
          <p className="text-sm text-slate-500 leading-relaxed mb-4">
            Nexis Premium E-Commerce is a curated storefront demo showcasing a modern shopping
            experience — browse by category, search the catalog, save favorites, check out, and
            track your order history, all built on Next.js, Redux, and Tailwind CSS.
          </p>
          <p className="text-sm text-slate-500 leading-relaxed">
            Product data is sourced from a public demo API, so catalog contents may vary. This
            site is intended as a showcase project rather than a production storefront.
          </p>
        </div>
      </div>
    </>
  )
}

export default About
