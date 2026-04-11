// ─── Product & Category ──────────────────────────────────────────────────────
export interface Category {
  id: string;
  name: string;
  icon: string;
  shopId: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  shopId: string;
  inStock: boolean;
  isVeg?: boolean;
  rating?: number;
  reviewCount?: number;
}

// ─── Shop ────────────────────────────────────────────────────────────────────
export interface Shop {
  id: string;
  name: string;
  tagline: string;
  description: string;
  phone: string;
  address: string;
  logo: string;
  coverImage: string;
  isOpen: boolean;
  deliveryTime: string;
  minOrder: number;
  deliveryFee: number;
  rating: number;
  reviewCount: number;
}

// ─── Cart ────────────────────────────────────────────────────────────────────
export interface CartItem {
  product: Product;
  quantity: number;
}

// ─── Order ───────────────────────────────────────────────────────────────────
export type OrderStatus =
  | 'pending'
  | 'accepted'
  | 'preparing'
  | 'out_for_delivery'
  | 'delivered'
  | 'rejected';

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  shopId: string;
  customerName: string;
  phone: string;
  address: string;
  note?: string;
  items: OrderItem[];
  totalAmount: number;
  deliveryFee: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
}

// ─── Auth ────────────────────────────────────────────────────────────────────
export interface Admin {
  id: string;
  name: string;
  email: string;
  shopId: string;
}

// ─── API Response ─────────────────────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// ─── Redux State Shapes ───────────────────────────────────────────────────────
export interface CartState {
  items: CartItem[];
  shopId: string | null;
}

export interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
}

export interface ProductState {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export interface ShopState {
  shop: Shop | null;
  loading: boolean;
  error: string | null;
}

export interface AuthState {
  admin: Admin | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// ─── Form Types ───────────────────────────────────────────────────────────────
export interface CheckoutForm {
  customerName: string;
  phone: string;
  address: string;
  note: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface ProductForm {
  name: string;
  description: string;
  price: string;
  categoryId: string;
  image: string;
  inStock: boolean;
  isVeg: boolean;
}