import React from 'react';
import { Link, useLocation } from 'react-router';
import { useAppSelector } from '../../hooks';
import { selectCartCount } from '../../redux/slices/cartSlice';

// ─── Customer Nav ─────────────────────────────────────────────────────────────
export const CustomerNav: React.FC = () => {
  const cartCount = useAppSelector(selectCartCount);
  const location = useLocation();

  const navItems = [
    { to: '/shop/shop-001', icon: '🏪', label: 'Shop' },
    { to: '/cart', icon: '🛒', label: 'Cart', badge: cartCount },
    { to: '/orders', icon: '📦', label: 'Orders' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 z-30 safe-area-inset-bottom">
      <div className="flex items-center justify-around py-2 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.to.split('?')[0]);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-0.5 px-6 py-1.5 rounded-xl transition-colors relative
                ${isActive ? 'text-brand-600' : 'text-slate-400'}`}
            >
              <span className="text-xl relative">
                {item.icon}
                {item.badge ? (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-brand-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                ) : null}
              </span>
              <span className={`text-xs font-semibold ${isActive ? 'text-brand-600' : 'text-slate-400'}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="absolute -top-0.5 w-8 h-0.5 bg-brand-500 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

