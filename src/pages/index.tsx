import Head from 'next/head'
import { GetStaticProps } from 'next'
import HeroSection from '@/Components/Home/HeroSection'
import FeatureStrip from '@/Components/Home/FeatureStrip'
import ProductSection from '@/Components/Home/ProductSection'
import ExchangeRateBar from '@/Components/Home/ExchangeRateBar'
import DealsBanner from '@/Components/Home/DealsBanner'
import StatsSection from '@/Components/Home/StatsSection'
import PromoCards from '@/Components/Home/PromoCards'
import CategoryShowcase from '@/Components/Home/CategoryShowcase'
import TopRatedSection from '@/Components/Home/TopRatedSection'
import ShippingCountriesSection from '@/Components/Home/ShippingCountriesSection'
import TestimonialsSection from '@/Components/Home/TestimonialsSection'
import QuoteBanner from '@/Components/Home/QuoteBanner'
import BlogPreviewSection from '@/Components/Home/BlogPreviewSection'
import NewsletterSection from '@/Components/Home/NewsletterSection'
import { Category, productProps } from '../../type'
import { getCategories, getProducts } from '@/lib/api'
import {
  getBlogPosts,
  getDailyQuote,
  getExchangeRates,
  getShippingCountries,
  getTestimonials,
  getTopRatedProducts,
  BlogPost,
  CountryInfo,
  DailyQuote,
  ExchangeRates,
  Testimonial,
  TopRatedItem,
} from '@/lib/externalApi'
import { useLanguage } from '@/contexts/LanguageContext'

interface props {
  featured: productProps[]
  newArrivals: productProps[]
  categories: Category[]
  rates: ExchangeRates | null
  testimonials: Testimonial[]
  blogPosts: BlogPost[]
  countries: CountryInfo[]
  topRated: TopRatedItem[]
  quote: DailyQuote | null
}

export default function Home({
  featured,
  newArrivals,
  categories,
  rates,
  testimonials,
  blogPosts,
  countries,
  topRated,
  quote,
}: props) {
  const { t } = useLanguage()

  return (
    <>
      <Head>
        <title>Souqi - Curated Luxury Tech, Accessories & Lifestyle</title>
        <meta name="description" content="Explore a curated selection of tech, accessories, apparel and lifestyle products at Souqi." />
      </Head>
      <main className="bg-surface min-h-screen pb-20">
        <div className="max-w-screen-2xl mx-auto">
          <HeroSection categories={categories} />
          <ExchangeRateBar rates={rates} />
          <StatsSection />
          <FeatureStrip />
          <PromoCards />
          <DealsBanner />
          <CategoryShowcase categories={categories} />
          <ProductSection title={t('home.featuredTitle')} viewAllHref="/categories" productData={featured} />
          <TopRatedSection items={topRated} />
          <ProductSection title={t('home.newArrivalsTitle')} viewAllHref="/categories" productData={newArrivals} />
          <ShippingCountriesSection countries={countries} />
          <QuoteBanner quote={quote} />
          <TestimonialsSection testimonials={testimonials} />
          <BlogPreviewSection posts={blogPosts} />
          <NewsletterSection />
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const [products, categories, rates, testimonials, blogPosts, countries, topRated, quote] = await Promise.all([
      getProducts({ limit: 24 }),
      getCategories(),
      getExchangeRates(),
      getTestimonials(6),
      getBlogPosts(3),
      getShippingCountries(),
      getTopRatedProducts(8),
      getDailyQuote(),
    ])

    const featured = products.slice(0, 8)
    const newArrivals = [...products]
      .sort((a, b) => Number(b.isNew) - Number(a.isNew))
      .filter((p) => !featured.some((f) => f._id === p._id))
      .slice(0, 8)

    return {
      props: { featured, newArrivals, categories, rates, testimonials, blogPosts, countries, topRated, quote },
      revalidate: 300,
    }
  } catch (error) {
    console.error('Error fetching home page data:', error)
    return {
      props: {
        featured: [],
        newArrivals: [],
        categories: [],
        rates: null,
        testimonials: [],
        blogPosts: [],
        countries: [],
        topRated: [],
        quote: null,
      },
      revalidate: 60,
    }
  }
}
