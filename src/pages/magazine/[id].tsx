import Head from 'next/head'
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps } from 'next'
import { BlogPost, getBlogPostById, getBlogPosts } from '@/lib/externalApi'
import { useLanguage } from '@/contexts/LanguageContext'
import { HiOutlineArrowLeft, HiOutlineHeart } from 'react-icons/hi'

interface props {
  post: BlogPost
}

const MagazineArticle = ({ post }: props) => {
  const { t } = useLanguage()

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-surface gap-3">
        <p className="text-neutral-500">{t('magazine.notFound')}</p>
        <Link href="/magazine" className="text-brand-600 text-sm font-semibold hover:underline">
          ← {t('magazine.backToMagazine')}
        </Link>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{post.title} - Souqi Magazine</title>
        <meta name="description" content={post.body.slice(0, 160)} />
      </Head>
      <main className="bg-surface min-h-screen pb-20">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <Link
            href="/magazine"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-brand-600 transition-colors mb-8"
          >
            <HiOutlineArrowLeft /> {t('magazine.backToMagazine')}
          </Link>

          <div className="bg-gradient-to-br from-brand-700 to-brand-950 rounded-3xl p-8 sm:p-10 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(212,122,1,0.25),transparent_60%)]" />
            <div className="relative">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-white/15 text-brand-100 px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">{post.title}</h1>
              <div className="flex items-center gap-3 mt-4 text-brand-200 text-xs">
                <span className="flex items-center gap-1">
                  <HiOutlineHeart /> {post.reactions} {t('magazine.reactions')}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-cream rounded-3xl p-6 sm:p-10 shadow-soft">
            <div className="prose prose-sm max-w-none">
              {post.body.split('\n').map((paragraph, i) => (
                <p key={i} className="text-sm text-neutral-600 leading-relaxed mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getBlogPosts(20)
  return {
    paths: posts.map((p) => ({ params: { id: String(p.id) } })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = Number(ctx.params?.id)
  const post = await getBlogPostById(id)

  if (!post) return { notFound: true, revalidate: 60 }

  return { props: { post }, revalidate: 600 }
}

export default MagazineArticle
