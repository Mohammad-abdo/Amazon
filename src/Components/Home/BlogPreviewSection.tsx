import React from 'react'
import Link from 'next/link'
import { BlogPost } from '@/lib/externalApi'
import { useLanguage } from '@/contexts/LanguageContext'
import { HiOutlineArrowRight, HiOutlineHeart } from 'react-icons/hi'

interface props {
  posts: BlogPost[]
}

const BlogPreviewSection = ({ posts }: props) => {
  const { t } = useLanguage()

  if (posts.length === 0) return null

  return (
    <section className="mt-12 px-4 sm:px-6">
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-600">{t('home.magazineEyebrow')}</span>
          <h2 className="text-2xl font-bold text-brand-950 mt-1">{t('home.magazineTitle')}</h2>
        </div>
        <Link
          href="/magazine"
          className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-500 transition-colors"
        >
          {t('home.viewAllArticles')} <HiOutlineArrowRight />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.slice(0, 3).map((post, idx) => (
          <Link
            key={post.id}
            href={`/magazine/${post.id}`}
            className="group bg-white border border-cream rounded-3xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 flex flex-col"
          >
            <div
              className={`h-36 flex items-end p-5 ${
                idx === 0
                  ? 'bg-gradient-to-br from-brand-600 to-brand-800'
                  : idx === 1
                    ? 'bg-gradient-to-br from-brand-800 to-brand-950'
                    : 'bg-gradient-to-br from-brand-400 to-brand-700'
              }`}
            >
              {post.tags[0] && (
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-sm text-white px-2.5 py-1 rounded-full">
                  {post.tags[0]}
                </span>
              )}
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-bold text-brand-950 text-sm line-clamp-2 group-hover:text-brand-600 transition-colors mb-2">
                {post.title}
              </h3>
              <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed flex-1">{post.body}</p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-cream">
                <span className="flex items-center gap-1 text-[11px] text-neutral-400">
                  <HiOutlineHeart className="text-brand-400" /> {post.reactions}
                </span>
                <span className="text-[11px] font-semibold text-brand-600 group-hover:underline">{t('home.readMore')}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="/magazine"
        className="sm:hidden mt-4 flex items-center justify-center gap-1.5 text-xs font-semibold text-brand-600"
      >
        {t('home.viewAllArticles')} <HiOutlineArrowRight />
      </Link>
    </section>
  )
}

export default BlogPreviewSection
