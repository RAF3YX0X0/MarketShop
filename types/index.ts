export interface Product {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  coverImage: string;
  badge?: string;
  badgeType?: 'hot' | 'deal' | 'exclusive' | 'bestseller';
  category: string;
  description: string;
  format?: 'Hardcover' | 'Paperback' | 'Collector Edition' | 'Illustrated Deluxe';
  pages?: number;
  publishYear?: number;
  inStock: boolean;
  stockCount?: number;
  sellerName: string;
  highlights?: string[];
  couponCode?: string;
  discountPercentage?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  location?: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  avatarUrl?: string;
  bookPurchased?: string;
}

export interface TrustGuarantee {
  id: string;
  title: string;
  subtitle: string;
  iconName: 'truck' | 'shield-check' | 'undo-2' | 'award' | 'headphones' | 'badge-percent';
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  iconName: 'book-open-check' | 'users' | 'badge-percent' | 'leaf' | 'sparkles' | 'globe';
  badgeText?: string;
}

export interface SellerStat {
  value: string;
  label: string;
  subtext: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedFormat?: string;
}
