import Head from 'next/head'

const faqs = [
  {
    q: 'What payment methods do you accept?',
    a: 'This is a demo storefront — checkout simulates order placement and does not process real payments.',
  },
  {
    q: 'How do I track my order?',
    a: 'Visit "Account > Order History" after checking out to see all orders you have placed.',
  },
  {
    q: 'Can I return a product?',
    a: 'Since this is a demonstration site with simulated orders, returns are not applicable.',
  },
  {
    q: 'How do I save items for later?',
    a: 'Click the heart icon on any product to add it to your Wishlist, accessible from the header or your account page.',
  },
  {
    q: 'Where does the product catalog come from?',
    a: 'Product and category data is pulled live from a public demo API, so availability and content may change over time.',
  },
]

const Faq = () => {
  return (
    <>
      <Head>
        <title>FAQ - Nexis Premium E-Commerce</title>
        <meta name="description" content="Frequently asked questions about shopping at Nexis." />
      </Head>
      <div className="max-w-screen-2xl mx-auto py-12 px-4 sm:px-6 min-h-[70vh] bg-slate-50">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h1>
          <div className="flex flex-col gap-4">
            {faqs.map((item) => (
              <div key={item.q} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                <h3 className="text-sm font-bold text-slate-800 mb-1.5">{item.q}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Faq
