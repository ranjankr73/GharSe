import type { Shop, Category, Product, Order } from '../types';

export const MOCK_SHOP: Shop = {
  id: 'shop-001',
  name: 'Fresh Basket',
  tagline: 'Your neighbourhood grocery, delivered fast.',
  description: 'A curated selection of fresh produce, daily essentials, and artisan goods from your local community.',
  phone: '+91 98765 43210',
  address: '12, Market Lane, Civil Lines, Bareilly – 243001',
  logo: 'https://api.dicebear.com/8.x/shapes/svg?seed=freshbasket&backgroundColor=f97316',
  coverImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
  isOpen: true,
  deliveryTime: '25–40 min',
  minOrder: 100,
  deliveryFee: 20,
  rating: 4.7,
  reviewCount: 328,
};

export const MOCK_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Fruits & Veggies', icon: '🥦', shopId: 'shop-001' },
  { id: 'cat-2', name: 'Dairy & Eggs', icon: '🥛', shopId: 'shop-001' },
  { id: 'cat-3', name: 'Bakery', icon: '🍞', shopId: 'shop-001' },
  { id: 'cat-4', name: 'Snacks', icon: '🍿', shopId: 'shop-001' },
  { id: 'cat-5', name: 'Beverages', icon: '☕', shopId: 'shop-001' },
  { id: 'cat-6', name: 'Pantry', icon: '🫙', shopId: 'shop-001' },
];

export const MOCK_PRODUCTS: Product[] = [
  // Fruits & Veggies
  {
    id: 'p-001', name: 'Fresh Tomatoes', description: 'Farm-fresh red tomatoes, perfect for cooking or salads.', price: 35,
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&q=80',
    categoryId: 'cat-1', shopId: 'shop-001', inStock: true, isVeg: true, rating: 4.5, reviewCount: 42,
  },
  {
    id: 'p-002', name: 'Organic Spinach', description: 'Tender baby spinach leaves, washed and ready to eat.', price: 45,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80',
    categoryId: 'cat-1', shopId: 'shop-001', inStock: true, isVeg: true, rating: 4.8, reviewCount: 19,
  },
  {
    id: 'p-003', name: 'Alphonso Mangoes (6 pcs)', description: 'The king of mangoes — sweet, fragrant, and luscious.', price: 220,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&q=80',
    categoryId: 'cat-1', shopId: 'shop-001', inStock: true, isVeg: true, rating: 4.9, reviewCount: 87,
  },
  {
    id: 'p-004', name: 'Bananas (Dozen)', description: 'Ripe Cavendish bananas. Great for breakfast or smoothies.', price: 50,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=80',
    categoryId: 'cat-1', shopId: 'shop-001', inStock: true, isVeg: true, rating: 4.3, reviewCount: 65,
  },
  // Dairy & Eggs
  {
    id: 'p-005', name: 'Full Cream Milk (1L)', description: 'Fresh pasteurized cow milk. Rich and creamy taste.', price: 65,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',
    categoryId: 'cat-2', shopId: 'shop-001', inStock: true, isVeg: true, rating: 4.6, reviewCount: 120,
  },
  {
    id: 'p-006', name: 'Free-Range Eggs (12 pcs)', description: 'Farm-fresh eggs from free-range hens. Rich orange yolks.', price: 110,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&q=80',
    categoryId: 'cat-2', shopId: 'shop-001', inStock: true, isVeg: true, rating: 4.7, reviewCount: 95,
  },
  {
    id: 'p-007', name: 'Amul Butter (500g)', description: 'Classic salted butter. Perfect for toast, baking, and cooking.', price: 240,
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&q=80',
    categoryId: 'cat-2', shopId: 'shop-001', inStock: false, isVeg: true, rating: 4.8, reviewCount: 200,
  },
  // Bakery
  {
    id: 'p-008', name: 'Sourdough Loaf', description: 'Artisan sourdough, slow-fermented for 48 hours. Crispy crust, soft crumb.', price: 180,
    image: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=400&q=80',
    categoryId: 'cat-3', shopId: 'shop-001', inStock: true, isVeg: true, rating: 4.9, reviewCount: 55,
  },
  {
    id: 'p-009', name: 'Whole Wheat Bread', description: 'Nutritious whole wheat sandwich bread baked fresh daily.', price: 60,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
    categoryId: 'cat-3', shopId: 'shop-001', inStock: true, isVeg: true, rating: 4.4, reviewCount: 78,
  },
  {
    id: 'p-010', name: 'Blueberry Muffins (4 pcs)', description: 'Moist, fluffy muffins bursting with fresh blueberries.', price: 140,
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&q=80',
    categoryId: 'cat-3', shopId: 'shop-001', inStock: true, isVeg: true, rating: 4.7, reviewCount: 34,
  },
  // Snacks
  {
    id: 'p-011', name: 'Mixed Nuts (250g)', description: 'A premium blend of cashews, almonds, walnuts, and pistachios.', price: 320,
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&q=80',
    categoryId: 'cat-4', shopId: 'shop-001', inStock: true, isVeg: true, rating: 4.6, reviewCount: 48,
  },
  {
    id: 'p-012', name: 'Dark Chocolate (72%)', description: 'Single-origin dark chocolate. Rich and complex flavour.', price: 195,
    image: 'https://images.unsplash.com/photo-1548907040-4bea42b4bccc?w=400&q=80',
    categoryId: 'cat-4', shopId: 'shop-001', inStock: true, isVeg: true, rating: 4.8, reviewCount: 102,
  },
  // Beverages
  {
    id: 'p-013', name: 'Cold Brew Coffee (500ml)', description: 'Slow-steeped for 18 hours. Smooth, never bitter.', price: 185,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80',
    categoryId: 'cat-5', shopId: 'shop-001', inStock: true, isVeg: true, rating: 4.9, reviewCount: 61,
  },
  {
    id: 'p-014', name: 'Orange Juice (1L)', description: 'Freshly squeezed, no added sugar. Pure citrus goodness.', price: 120,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',
    categoryId: 'cat-5', shopId: 'shop-001', inStock: true, isVeg: true, rating: 4.5, reviewCount: 88,
  },
  // Pantry
  {
    id: 'p-015', name: 'Extra Virgin Olive Oil', description: 'Cold-pressed from hand-picked olives. First press quality.', price: 450,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80',
    categoryId: 'cat-6', shopId: 'shop-001', inStock: true, isVeg: true, rating: 4.7, reviewCount: 29,
  },
  {
    id: 'p-016', name: 'Basmati Rice (5kg)', description: 'Long-grain aromatic basmati. Aged for perfect texture.', price: 380,
    image: 'https://images.unsplash.com/photo-1536304993881-ff86e6c02f21?w=400&q=80',
    categoryId: 'cat-6', shopId: 'shop-001', inStock: true, isVeg: true, rating: 4.6, reviewCount: 143,
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-7281',
    shopId: 'shop-001',
    customerName: 'Priya Sharma',
    phone: '9876543210',
    address: '45, Subhash Nagar, Bareilly',
    note: 'Please leave at door',
    items: [
      { productId: 'p-001', productName: 'Fresh Tomatoes', price: 35, quantity: 2 },
      { productId: 'p-006', productName: 'Free-Range Eggs (12 pcs)', price: 110, quantity: 1 },
    ],
    totalAmount: 200,
    deliveryFee: 20,
    status: 'delivered',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'ORD-7282',
    shopId: 'shop-001',
    customerName: 'Rahul Gupta',
    phone: '9812345678',
    address: '8, Railway Colony, Bareilly',
    items: [
      { productId: 'p-008', productName: 'Sourdough Loaf', price: 180, quantity: 1 },
      { productId: 'p-013', productName: 'Cold Brew Coffee (500ml)', price: 185, quantity: 2 },
    ],
    totalAmount: 570,
    deliveryFee: 20,
    status: 'preparing',
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    updatedAt: new Date(Date.now() - 900000).toISOString(),
  },
  {
    id: 'ORD-7283',
    shopId: 'shop-001',
    customerName: 'Anita Verma',
    phone: '9801234567',
    address: '33, Pilibhit Road, Bareilly',
    note: 'Ring bell twice',
    items: [
      { productId: 'p-003', productName: 'Alphonso Mangoes (6 pcs)', price: 220, quantity: 1 },
      { productId: 'p-011', productName: 'Mixed Nuts (250g)', price: 320, quantity: 1 },
      { productId: 'p-005', productName: 'Full Cream Milk (1L)', price: 65, quantity: 2 },
    ],
    totalAmount: 690,
    deliveryFee: 20,
    status: 'pending',
    createdAt: new Date(Date.now() - 600000).toISOString(),
    updatedAt: new Date(Date.now() - 600000).toISOString(),
  },
  {
    id: 'ORD-7284',
    shopId: 'shop-001',
    customerName: 'Deepak Singh',
    phone: '9823456789',
    address: '77, Cantonment Area, Bareilly',
    items: [
      { productId: 'p-016', productName: 'Basmati Rice (5kg)', price: 380, quantity: 1 },
      { productId: 'p-015', productName: 'Extra Virgin Olive Oil', price: 450, quantity: 1 },
    ],
    totalAmount: 850,
    deliveryFee: 20,
    status: 'accepted',
    createdAt: new Date(Date.now() - 1200000).toISOString(),
    updatedAt: new Date(Date.now() - 700000).toISOString(),
  },
];