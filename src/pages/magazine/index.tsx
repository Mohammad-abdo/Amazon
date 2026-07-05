import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { BlogPost, getBlogPosts } from '@/lib/externalApi'
import { useLanguage } from '@/contexts/LanguageContext'
import { HiOutlineHeart } from 'react-icons/hi'

interface props {
  posts: BlogPost[]
}

const Magazine = ({ posts }: props) => {
  const { t } = useLanguage()

  const gradients = [
    'from-brand-600 to-brand-800',
    'from-brand-800 to-brand-950',
    'from-brand-400 to-brand-700',
    'from-brand-700 to-brand-900',
    'from-brand-500 to-brand-800',
    'from-brand-900 to-brand-700',
  ]

  return (
    <>
      <Head>
        <title>{t('magazine.pageTitle')} - Souqi</title>
        <meta name="description" content={t('magazine.pageDescription')} />
      </Head>
      <main className="bg-surface min-h-screen pb-20">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-600">{t('magazine.eyebrow')}</span>
            <h1 className="text-3xl font-extrabold text-brand-950 mt-1">{t('magazine.title')}</h1>
            <p className="text-sm text-neutral-500 mt-2 max-w-lg">{t('magazine.subtitle')}</p>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, idx) => (
                <Link
                  key={post.id}
                  href={`/magazine/${post.id}`}
                  className="group bg-white border border-cream rounded-3xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 flex flex-col"
                >
                  <div className={`h-44 bg-gradient-to-br ${gradients[idx % gradients.length]} p-5 flex flex-col justify-between`}>
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="flex items-center gap-1 text-xs text-white/80">
                      <HiOutlineHeart /> {post.reactions} {t('magazine.reactions')}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h2 className="font-bold text-brand-950 text-base line-clamp-2 group-hover:text-brand-600 transition-colors mb-2">
                      {post.title}
                    </h2>
                    <p className="text-xs text-neutral-500 line-clamp-4 leading-relaxed flex-1">{post.body}</p>
                    <span className="text-xs font-semibold text-brand-600 mt-4 group-hover:underline">{t('home.readMore')} →</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-neutral-500 text-center py-20">{t('magazine.noPosts')}</p>
          )}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getBlogPosts(12)
  return { props: { posts }, revalidate: 600 }
}

export default Magazine
