export interface BlogPost {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: number
}

interface RawBlogPost {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: number | { likes: number; dislikes: number }
}

const normalizeReactions = (reactions: RawBlogPost['reactions']): number => {
  if (typeof reactions === 'number') return reactions
  if (reactions && typeof reactions === 'object') {
    return (reactions.likes ?? 0) + (reactions.dislikes ?? 0)
  }
  return 0
}

const normalizeBlogPost = (raw: RawBlogPost): BlogPost => ({
  id: raw.id,
  title: raw.title,
  body: raw.body,
  userId: raw.userId,
  tags: raw.tags ?? [],
  reactions: normalizeReactions(raw.reactions),
})

export interface Testimonial {
  id: string
  name: string
  location: string
  avatar: string
  rating: number
}

export interface CountryInfo {
  code: string
  name: string
  flag: string
}

export interface ExchangeRates {
  base: string
  date: string
  rates: Record<string, number>
}

const SHIPPING_COUNTRY_CODES = ['SA', 'AE', 'EG', 'US', 'GB', 'FR', 'DE', 'TR', 'IN', 'PK', 'JO', 'KW']

async function safeFetch<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url)
    if (!res.ok) return fallback
    return (await res.json()) as T
  } catch {
    return fallback
  }
}

export async function getBlogPosts(limit = 6): Promise<BlogPost[]> {
  const data = await safeFetch<{ posts: RawBlogPost[] }>(
    `https://dummyjson.com/posts?limit=${limit}&select=title,body,userId,tags,reactions`,
    { posts: [] }
  )
  return (data.posts || []).map(normalizeBlogPost)
}

export async function getBlogPostById(id: number): Promise<BlogPost | null> {
  const raw = await safeFetch<RawBlogPost | null>(`https://dummyjson.com/posts/${id}`, null)
  return raw ? normalizeBlogPost(raw) : null
}

interface RandomUserResult {
  results: {
    login: { uuid: string }
    name: { first: string; last: string }
    location: { city: string; country: string }
    picture: { medium: string }
  }[]
}

export async function getTestimonials(count = 6): Promise<Testimonial[]> {
  const data = await safeFetch<RandomUserResult>(
    `https://randomuser.me/api/?results=${count}&inc=name,picture,location,login`,
    { results: [] }
  )
  return data.results.map((u) => ({
    id: u.login.uuid,
    name: `${u.name.first} ${u.name.last}`,
    location: `${u.location.city}, ${u.location.country}`,
    avatar: u.picture.medium,
    rating: 4 + (u.login.uuid.charCodeAt(0) % 2),
  }))
}

interface RawCountry {
  cca2: string
  name: { common: string }
  flags: { png: string }
}

export async function getShippingCountries(): Promise<CountryInfo[]> {
  const codes = SHIPPING_COUNTRY_CODES.join(',')
  const data = await safeFetch<RawCountry[]>(
    `https://restcountries.com/v3.1/alpha?codes=${codes}&fields=name,flags,cca2`,
    []
  )
  if (!Array.isArray(data)) return []
  return data.map((c) => ({
    code: c.cca2,
    name: c.name.common,
    flag: c.flags.png,
  }))
}

export async function getExchangeRates(): Promise<ExchangeRates | null> {
  return safeFetch<ExchangeRates | null>(
    'https://api.frankfurter.app/latest?from=USD&to=SAR,EUR,GBP,AED,EGP',
    null
  )
}

export async function getStoreCategories(): Promise<string[]> {
  return safeFetch<string[]>('https://fakestoreapi.com/products/categories', [])
}

export interface DailyQuote {
  content: string
  author: string
}

export async function getDailyQuote(): Promise<DailyQuote | null> {
  return safeFetch<DailyQuote | null>(
    'https://api.quotable.io/random?maxLength=120&tags=business|success|wisdom',
    null
  )
}

interface FakeStoreProduct {
  id: number
  title: string
  price: number
  category: string
  rating: { rate: number; count: number }
}

export interface TopRatedItem {
  id: number
  title: string
  category: string
  price: number
  rating: number
  reviews: number
}

export async function getTopRatedProducts(limit = 8): Promise<TopRatedItem[]> {
  const data = await safeFetch<FakeStoreProduct[]>('https://fakestoreapi.com/products?limit=20', [])
  if (!Array.isArray(data)) return []
  return data
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, limit)
    .map((p) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      price: p.price,
      rating: p.rating.rate,
      reviews: p.rating.count,
    }))
}
