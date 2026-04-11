import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logout } from '../../redux/slices/authSlice';
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

// ─── Admin Sidebar ────────────────────────────────────────────────────────────
const ADMIN_NAV = [
  { to: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/admin/orders', icon: '📦', label: 'Orders' },
  { to: '/admin/products', icon: '🛍️', label: 'Products' },
  { to: '/admin/categories', icon: '📂', label: 'Categories' },
  { to: '/admin/settings', icon: '⚙️', label: 'Settings' },
];

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const admin = useAppSelector((s) => s.auth.admin);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-slate-950 z-50 flex flex-col
        transform transition-transform duration-300 lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <Link to="/shop/shop-001" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center text-lg">🛒</div>
            <div>
              <p className="font-display font-bold text-white text-sm">Fresh Basket</p>
              <p className="text-xs text-slate-500">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {ADMIN_NAV.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm
                  ${isActive
                    ? 'bg-brand-500 text-white shadow-brand'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {admin?.name[0] ?? 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate">{admin?.name ?? 'Admin'}</p>
              <p className="text-slate-500 text-xs truncate">{admin?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-all text-sm font-semibold"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-100 px-4 lg:px-8 py-4 flex items-center gap-4 sticky top-0 z-20">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors text-slate-600"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="font-display font-bold text-slate-900 text-xl">{title}</h1>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};