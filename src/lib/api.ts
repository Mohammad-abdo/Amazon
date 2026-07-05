import { Category, productProps } from "../../type";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.escuelajs.co/api/v1";

export const PLACEHOLDER_IMAGE = "/placeholder-product.svg";

const DEAD_IMAGE_HOSTS = ["placeimg.com", "example.com"];

const JUNK_CATEGORY_NAME = /test|update/i;

const isValidImageUrl = (url: unknown): url is string => {
  if (typeof url !== "string") return false;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false;
    return !DEAD_IMAGE_HOSTS.some((host) => parsed.hostname.includes(host));
  } catch {
    return false;
  }
};

const pickImage = (images: unknown): { image: string; images: string[] } => {
  const list = Array.isArray(images) ? images.filter(isValidImageUrl) : [];
  return {
    image: list[0] || PLACEHOLDER_IMAGE,
    images: list.length ? list : [PLACEHOLDER_IMAGE],
  };
};

// Deterministic (id-derived) so server-rendered HTML and client hydration always agree.
const computeOldPrice = (id: number, price: number): number =>
  id % 5 === 0 ? Math.round(price * 1.2) : price;

const computeIsNew = (creationAt: string): boolean => {
  const created = new Date(creationAt).getTime();
  if (Number.isNaN(created)) return false;
  return Date.now() - created < 30 * 24 * 60 * 60 * 1000;
};

interface RawCategory {
  id: number;
  name: string;
  slug: string;
  image: string;
}

interface RawProduct {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: RawCategory;
  images: string[];
  creationAt: string;
}

export const normalizeCategory = (raw: RawCategory): Category => ({
  id: raw.id,
  name: raw.name,
  slug: raw.slug,
  image: isValidImageUrl(raw.image) ? raw.image : PLACEHOLDER_IMAGE,
});

export const normalizeProduct = (raw: RawProduct): productProps => {
  const { image, images } = pickImage(raw.images);
  return {
    _id: raw.id,
    slug: raw.slug,
    title: raw.title,
    description: raw.description,
    price: raw.price,
    oldPrice: computeOldPrice(raw.id, raw.price),
    isNew: computeIsNew(raw.creationAt),
    category: raw.category?.name || "General",
    categorySlug: raw.category?.slug || "general",
    categoryId: raw.category?.id ?? 0,
    image,
    images,
  };
};

const isJunkCategory = (raw: RawCategory): boolean =>
  JUNK_CATEGORY_NAME.test(raw.name) || !isValidImageUrl(raw.image);

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    throw new Error(`Platzi API request failed (${res.status}): ${path}`);
  }
  return res.json();
}

export interface GetProductsParams {
  offset?: number;
  limit?: number;
  title?: string;
  categoryId?: number;
  priceMin?: number;
  priceMax?: number;
}

const QUERY_KEY_MAP: Record<keyof GetProductsParams, string> = {
  offset: "offset",
  limit: "limit",
  title: "title",
  categoryId: "categoryId",
  priceMin: "price_min",
  priceMax: "price_max",
};

const buildQuery = (params: GetProductsParams): string => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(QUERY_KEY_MAP[key as keyof GetProductsParams], String(value));
    }
  });
  const str = query.toString();
  return str ? `?${str}` : "";
};

export async function getProducts(
  params: GetProductsParams = {}
): Promise<productProps[]> {
  const raw = await request<RawProduct[]>(`/products${buildQuery(params)}`);
  return raw.map(normalizeProduct);
}

export async function getProductById(id: number): Promise<productProps | null> {
  try {
    const raw = await request<RawProduct>(`/products/${id}`);
    if (!raw || !raw.id) return null;
    return normalizeProduct(raw);
  } catch {
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  const raw = await request<RawCategory[]>(`/categories`);
  return raw.filter((c) => !isJunkCategory(c)).map(normalizeCategory);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) || null;
}

export async function getProductsByCategoryId(
  categoryId: number,
  params: GetProductsParams = {}
): Promise<productProps[]> {
  return getProducts({ ...params, categoryId });
}

export async function getRelatedProducts(
  categoryId: number,
  excludeId: number,
  limit = 4
): Promise<productProps[]> {
  const products = await getProductsByCategoryId(categoryId, { limit: limit + 1 });
  return products.filter((p) => p._id !== excludeId).slice(0, limit);
}
