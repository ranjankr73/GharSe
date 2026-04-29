# GharSe — Frontend

> Quick commerce web app for local shops. Browse nearby stores, add to cart, and track your order in real time.

**Live:** https://ghar-se-food.vercel.app  
**Backend:** https://gharse-backend.onrender.com  
**Backend Repo:** https://github.com/ranjankr73/gharse-backend

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| State Management | Redux Toolkit |
| Routing | React Router DOM v7 |
| Styling | Tailwind CSS v4 |
| HTTP Client | Axios (with interceptors) |
| Forms | React Hook Form |
| Animations | Framer Motion |
| Notifications | React Hot Toast |
| Icons | Lucide React + React Icons |
| Build Tool | Vite |

---

## Features

### Three Separate UIs

**Customer**
- Browse and search verified nearby shops
- Filter by category, open now
- Shop detail page with subcategory tabs and full product menu
- Add to cart (locked per shop, price snapshots)
- Checkout with delivery address and COD payment
- Order success page with order summary
- Order history with filter by status
- Live order tracking with 7-stage timeline
- Reorder from past orders
- Cancel order (before pickup)
- Submit review after delivery

**Shop Owner**
- 5-step guided onboarding with progress tracker
- Dashboard with revenue stats, active order breakdown (per status), pending orders queue
- Orders page — filter by status, update order through full lifecycle
- Order detail with full timeline and customer info
- Products — search, filter, add/edit with variant support, stock bar, toggle availability
- Categories — grouped subcategory management per global category
- Settings — logo/cover upload, profile, address, delivery settings, business details (GST/PAN/FSSAI)
- Multi-shop support with shop switcher in sidebar

**Admin**
- Dashboard with platform stats and pending verification queue
- Shops — table view, verify/unverify, suspend/restore, full detail page
- Orders — full order table with status + payment filters, cancel any order
- Products — activate/deactivate any product
- Categories — create/edit/delete global categories with slug, display order, image

### Auth
- Silent refresh on app load (HttpOnly cookie → new access token)
- Access token stored in Redux (in-memory only, never localStorage)
- Role-aware redirects (customer / shopOwner / admin)
- Protected routes with loading state

---

## Project Structure

```
src/
├── app/
│   └── store.ts
├── components/
│   ├── ui/                    — Button, InputField, TextareaField, Badge, Modal, Spinner, EmptyState, Logo
│   ├── layout/                — ProtectedRoute, ShopDashboardLayout, Sidebar, AdminDashboardLayout
│   ├── customer/              — ProductCard, CartItem, CustomerOrderCard, ShopCard, StickyCartBar
│   ├── shop/                  — OrderCard, ProductFormModal
│   └── admin/                 — AdminStatCard, CategoryFormModal
├── features/
│   ├── auth/                  — authSlice, authThunks, authTypes
│   ├── shop/                  — shopSlice, shopThunks, shopTypes
│   ├── product/               — productSlice, productThunks, productTypes
│   ├── order/                 — orderSlice, orderThunks, orderTypes
│   ├── category/              — categorySlice, categoryThunks, categoryTypes
│   ├── cart/                  — cartSlice, cartThunks, cartTypes
│   ├── customerOrder/         — customerOrderSlice, customerOrderThunks, customerOrderTypes
│   ├── publicShop/            — publicShopSlice, publicShopThunks, publicShopTypes
│   └── admin/                 — adminSlice, adminThunks, adminTypes
├── hooks/
│   ├── useAppDispatch.ts
│   └── useAppSelector.ts
├── pages/
│   ├── auth/                  — LoginPage, SignupPage, AdminLoginPage
│   ├── landing/               — LandingPage
│   ├── customer/              — ShopBrowsePage, ShopDetailPage, CartPage, CheckoutPage,
│   │                            OrderSuccessPage, OrderHistoryPage, OrderTrackingPage
│   ├── shop/                  — ShopCreatePage, ShopDashboardPage, ShopOrdersPage,
│   │                            ShopOrderDetailPage, ShopProductsPage, ShopCategoriesPage, ShopSettingsPage
│   └── admin/                 — AdminDashboardPage, AdminShopsPage, AdminShopDetailPage,
│                                AdminOrdersPage, AdminProductsPage, AdminCategoriesPage
├── services/
│   ├── axiosInstance.ts       — Axios with request/response interceptors + token rotation
│   ├── authApi.ts
│   ├── shopApi.ts
│   ├── productApi.ts
│   ├── orderApi.ts
│   ├── categoryApi.ts
│   ├── cartApi.ts
│   ├── customerOrderApi.ts
│   ├── publicShopApi.ts
│   └── adminApi.ts
└── utils/
    ├── tokenManager.ts        — In-memory access token store
    └── formatCurrency.ts      — INR formatter + time ago helper
```

---

## Route Map

### Public
| Route | Page |
|-------|------|
| `/` | Landing page |
| `/customers/browse-shops` | Shop browse + search |
| `/shops/:shopId` | Shop detail + menu |

### Auth
| Route | Page |
|-------|------|
| `/customers/login` | Customer login |
| `/customers/register` | Customer signup |
| `/shops/login` | Shop owner login |
| `/shops/register` | Shop owner signup |
| `/admin/login` | Admin login |

### Customer (Protected)
| Route | Page |
|-------|------|
| `/cart` | Cart |
| `/checkout` | Checkout |
| `/orders/:orderId/success` | Order success |
| `/orders` | Order history |
| `/track/:orderId` | Order tracking |

### Shop Owner (Protected)
| Route | Page |
|-------|------|
| `/shops/create` | Create shop |
| `/shops/dashboard` | Dashboard + stats |
| `/shops/orders` | All orders |
| `/shops/orders/:orderId` | Order detail |
| `/shops/products` | Product management |
| `/shops/categories` | Subcategory management |
| `/shops/settings` | Shop settings |

### Admin (Protected)
| Route | Page |
|-------|------|
| `/admin/dashboard` | Admin dashboard |
| `/admin/shops` | All shops |
| `/admin/shops/:shopId` | Shop detail |
| `/admin/orders` | All orders |
| `/admin/products` | All products |
| `/admin/categories` | Global categories |

---

## Getting Started

### Prerequisites
- Node.js 18+
- Backend running (see [gharse-backend](https://github.com/ranjankr73/gharse-backend))

### Installation

```bash
git clone https://github.com/ranjankr73/GharSe.git
cd GharSe
npm install
```

### Environment Variables

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

### Run

```bash
# Development
npm run dev

# Build
npm run build

# Preview build
npm run preview
```

---

## Key Design Decisions

**Token storage** — Access token lives only in Redux store (in-memory). Never written to localStorage or sessionStorage. On page refresh, a silent `POST /auth/rotate-token` call uses the HttpOnly cookie to get a new access token before the app renders.

**Cart locking** — Cart is locked to one shop. Adding a product from a different shop prompts to clear the current cart first — same UX as Swiggy/Blinkit.

**Price snapshots** — Prices are snapshotted at cart add time and again at order placement. The order bill never changes even if the shop updates prices after.

**Axios interceptors** — All 401 responses trigger a silent token rotation. If rotation fails (cookie expired/revoked), user is redirected to login automatically.