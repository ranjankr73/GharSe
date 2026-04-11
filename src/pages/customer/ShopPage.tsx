import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchShop } from '../../redux/slices/shopSlice';
import { fetchProducts } from '../../redux/slices/productSlice';
import { selectCartCount, selectCartTotal } from '../../redux/slices/cartSlice';
import ProductCard from '../../components/customer/ProductCard';
import { StickyCartBar } from '../../components/customer/OrderCard';
import { CustomerNav } from '../../components/layout';
import { ProductCardSkeleton } from '../../components/ui';

const ShopPage: React.FC = () => {
  const { shopId = 'shop-001' } = useParams();
  const dispatch = useAppDispatch();
  const { shop, loading: shopLoading } = useAppSelector((s) => s.shop);
  const { products, categories, loading: productLoading } = useAppSelector((s) => s.products);
  const cartCount = useAppSelector(selectCartCount);
  const cartTotal = useAppSelector(selectCartTotal);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchShop(shopId));
    dispatch(fetchProducts(shopId));
  }, [dispatch, shopId]);

  const filteredProducts = useMemo(() => {
    let list = products;
    if (activeCategory !== 'all') list = list.filter((p) => p.categoryId === activeCategory);
    if (search) list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [products, activeCategory, search]);

  const loading = shopLoading || productLoading;

  return (
    <div className="min-h-screen bg-slate-50 pb-40">
      {/* Hero / Shop Info */}
      <div className="relative bg-slate-900 text-white">
        <div className="absolute inset-0 bg-linear-to-b from-slate-900/60 to-slate-900/90 z-10" />
        {shop?.coverImage && (
          <img src={shop.coverImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        )}
        <div className="relative z-20 px-4 pt-10 pb-6 max-w-lg mx-auto">
          {shopLoading ? (
            <div className="space-y-2 animate-pulse">
              <div className="h-7 bg-white/20 rounded-xl w-1/2" />
              <div className="h-4 bg-white/20 rounded-xl w-3/4" />
            </div>
          ) : shop ? (
            <>
              <div className="flex items-start gap-4">
                <img src={shop.logo} alt={shop.name} className="w-14 h-14 rounded-2xl border-2 border-white/20 shrink-0" />
                <div className="flex-1">
                  <h1 className="font-display font-bold text-2xl leading-tight">{shop.name}</h1>
                  <p className="text-white/70 text-sm mt-0.5">{shop.tagline}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full
                  ${shop.isOpen ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full bg-white ${shop.isOpen ? 'animate-pulse' : ''}`} />
                  {shop.isOpen ? 'Open Now' : 'Closed'}
                </span>
                <span className="text-xs text-white/70 flex items-center gap-1">🕐 {shop.deliveryTime}</span>
                <span className="text-xs text-white/70 flex items-center gap-1">⭐ {shop.rating} ({shop.reviewCount})</span>
                <span className="text-xs text-white/70 flex items-center gap-1">🛵 {shop.deliveryFee === 0 ? 'Free delivery' : `₹${shop.deliveryFee} delivery`}</span>
              </div>
            </>
          ) : null}
        </div>
      </div>

      {/* Search bar */}
      <div className="px-4 -mt-4 max-w-lg mx-auto relative z-20">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white rounded-2xl px-5 py-3.5 pl-12 text-sm shadow-card border border-slate-100
              focus:outline-none focus:ring-2 focus:ring-brand-400 transition-all"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base">🔍</span>
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">✕</button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mt-4 px-4 max-w-lg mx-auto overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 pb-1">
          <button
            onClick={() => setActiveCategory('all')}
            className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all
              ${activeCategory === 'all' ? 'bg-brand-500 text-white shadow-brand' : 'bg-white text-slate-600 shadow-card hover:shadow-card-hover'}`}
          >
            All Items
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all
                ${activeCategory === cat.id ? 'bg-brand-500 text-white shadow-brand' : 'bg-white text-slate-600 shadow-card hover:shadow-card-hover'}`}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="mt-4 px-4 max-w-lg mx-auto">
        {loading ? (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-display font-bold text-slate-800 text-lg">No products found</h3>
            <p className="text-slate-400 text-sm mt-1">Try a different category or search term</p>
            <button onClick={() => { setSearch(''); setActiveCategory('all'); }} className="mt-4 text-brand-500 font-semibold text-sm">Clear filters</button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-400 font-semibold">
                {filteredProducts.length} items
                {activeCategory !== 'all' && ` in ${categories.find(c => c.id === activeCategory)?.name}`}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>

      <StickyCartBar itemCount={cartCount} total={cartTotal} shopId={shopId} />
      <CustomerNav />
    </div>
  );
};

export default ShopPage;