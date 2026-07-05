export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export interface productProps {
  _id: number;
  slug: string;
  title: string;
  description: string;
  price: number;
  oldPrice: number;
  isNew: boolean;
  category: string;
  categorySlug: string;
  categoryId: number;
  image: string;
  images: string[];
}

export interface storeProduct extends productProps {
  quantaty: number;
}

export interface Address {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

export interface Order {
  id: string;
  items: storeProduct[];
  address: Address;
  subtotal: number;
  total: number;
  createdAt: string;
  status: "placed";
}

export interface Review {
  id: string;
  productId: number;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  createdAt: string;
}

export interface StateProps {
  next: {
    productData: storeProduct[];
    favoriteData: storeProduct[];
    allProducts: storeProduct[];
    userInfo: null | { name: string; email: string; image: string };
  };
  orders: {
    orders: Order[];
  };
  reviews: {
    reviews: Review[];
  };
}
