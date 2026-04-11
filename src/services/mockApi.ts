import type { Shop, Product, Category, Order, OrderStatus } from '../types';
import { MOCK_SHOP, MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_ORDERS } from '../data/mockData';

// Simulate network delay
const delay = (ms = 600) => new Promise((res) => setTimeout(res, ms));

// In-memory store (mutable for CRUD)
let _products: Product[] = [...MOCK_PRODUCTS];
let _categories: Category[] = [...MOCK_CATEGORIES];
let _orders: Order[] = [...MOCK_ORDERS];
let _shop: Shop = { ...MOCK_SHOP };

// ─── Shop API ────────────────────────────────────────────────────────────────
export const shopApi = {
  getShop: async (_shopId: string): Promise<Shop> => {
    await delay();
    return { ..._shop };
  },
  updateShop: async (updates: Partial<Shop>): Promise<Shop> => {
    await delay(400);
    _shop = { ..._shop, ...updates };
    return { ..._shop };
  },
};

// ─── Product API ─────────────────────────────────────────────────────────────
export const productApi = {
  getProducts: async (shopId: string): Promise<Product[]> => {
    await delay();
    return _products.filter((p) => p.shopId === shopId);
  },
  getCategories: async (shopId: string): Promise<Category[]> => {
    await delay(300);
    return _categories.filter((c) => c.shopId === shopId);
  },
  createProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
    await delay(500);
    const newProduct: Product = { ...product, id: `p-${Date.now()}` };
    _products = [newProduct, ..._products];
    return newProduct;
  },
  updateProduct: async (id: string, updates: Partial<Product>): Promise<Product> => {
    await delay(400);
    _products = _products.map((p) => (p.id === id ? { ...p, ...updates } : p));
    return _products.find((p) => p.id === id)!;
  },
  deleteProduct: async (id: string): Promise<void> => {
    await delay(400);
    _products = _products.filter((p) => p.id !== id);
  },
  createCategory: async (category: Omit<Category, 'id'>): Promise<Category> => {
    await delay(400);
    const newCat: Category = { ...category, id: `cat-${Date.now()}` };
    _categories = [..._categories, newCat];
    return newCat;
  },
  deleteCategory: async (id: string): Promise<void> => {
    await delay(400);
    _categories = _categories.filter((c) => c.id !== id);
  },
};

// ─── Order API ───────────────────────────────────────────────────────────────
export const orderApi = {
  getOrders: async (shopId: string): Promise<Order[]> => {
    await delay();
    return [..._orders].filter((o) => o.shopId === shopId).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },
  getOrder: async (orderId: string): Promise<Order> => {
    await delay(400);
    const order = _orders.find((o) => o.id === orderId);
    if (!order) throw new Error('Order not found');
    return { ...order };
  },
  createOrder: async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
    await delay(800);
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();
    const newOrder: Order = {
      ...orderData,
      id: orderId,
      createdAt: now,
      updatedAt: now,
      estimatedDelivery: '30–45 minutes',
    };
    _orders = [newOrder, ..._orders];
    return newOrder;
  },
  updateOrderStatus: async (orderId: string, status: OrderStatus): Promise<Order> => {
    await delay(500);
    _orders = _orders.map((o) =>
      o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o
    );
    return _orders.find((o) => o.id === orderId)!;
  },
};

// ─── Auth API ─────────────────────────────────────────────────────────────────
export const authApi = {
  login: async (email: string, password: string) => {
    await delay(700);
    if (email === 'admin@freshbasket.com' && password === 'admin123') {
      return {
        id: 'admin-001',
        name: 'Rajesh Kumar',
        email,
        shopId: 'shop-001',
      };
    }
    throw new Error('Invalid email or password');
  },
};