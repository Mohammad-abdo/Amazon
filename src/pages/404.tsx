import Head from 'next/head'
import Link from 'next/link'
import { HiHome } from 'react-icons/hi'
import { HiOutlineSearch } from 'react-icons/hi'

const NotFound = () => {
  return (
    <>
      <Head>
        <title>Page Not Found - Nexis Premium E-Commerce</title>
      </Head>
      <div className="min-h-[70vh] bg-slate-50 flex flex-col items-center justify-center px-4 text-center">
        <span className="text-6xl font-extrabold text-slate-200 mb-2">404</span>
        <h1 className="text-xl font-bold text-slate-800 mb-2">Page not found</h1>
        <p className="text-sm text-slate-400 max-w-sm mb-8">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <div className="flex gap-3">
          <Link href="/">
            <button className="h-11 px-6 bg-slate-900 text-white rounded-xl font-medium text-sm hover:bg-indigo-600 transition-all duration-300 flex items-center gap-2">
              <HiHome /> Go Home
            </button>
          </Link>
          <Link href="/search">
            <button className="h-11 px-6 border border-slate-200 text-slate-700 rounded-xl font-medium text-sm hover:bg-slate-100 transition-all duration-300 flex items-center gap-2">
              <HiOutlineSearch /> Search Products
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default NotFound
