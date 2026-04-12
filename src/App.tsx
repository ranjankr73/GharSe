import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { useAppSelector } from './hooks';

// Customer Pages
import ShopPage from './pages/customer/ShopPage';
import CartPage from './pages/customer/CartPage';
import CheckoutPage from './pages/customer/CheckoutPage';
import { OrderSuccessPage, OrderTrackingPage } from './pages/customer/OrderPages';
import OrderHistoryPage from './pages/customer/OrderHistoryPage';

// Admin Pages
import ShopLoginPage from './pages/admin/ShopLoginPage';
import ShopDashboard from './pages/admin/ShopDashboardPage';
import AdminOrdersPage from './pages/admin/ShopOrdersPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import ShopDashboardLayout from './components/layout/ShopDashboardLayout';

// ─── Protected Route ──────────────────────────────────────────────────────────
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

// ─── App ──────────────────────────────────────────────────────────────────────
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontWeight: 600,
            fontSize: '13px',
            borderRadius: '12px',
            padding: '10px 16px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          },
          success: {
            style: { background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0' },
            iconTheme: { primary: '#22c55e', secondary: '#fff' },
          },
          error: {
            style: { background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca' },
            iconTheme: { primary: '#ef4444', secondary: '#fff' },
          },
        }}
      />
      <Routes>
        {/* ─── Customer Routes ─────────────────────────── */}
        <Route path="/" element={<Navigate to="/shop/shop-001" replace />} />
        <Route path="/shop/:shopId" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/success" element={<OrderSuccessPage />} />
        <Route path="/track/:orderId" element={<OrderTrackingPage />} />
        <Route path="/orders" element={<OrderHistoryPage />} />

        {/* ─── Admin Routes ────────────────────────────── */}
        <Route path="/admin/login" element={<ShopLoginPage />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><ShopDashboardLayout title='Dashboard'><ShopDashboard /></ShopDashboardLayout></ProtectedRoute>} />
        <Route path="/admin/orders" element=  {<ProtectedRoute><ShopDashboardLayout title='Orders'><AdminOrdersPage /></ShopDashboardLayout></ProtectedRoute>} />
        <Route path="/admin/products" element={<ProtectedRoute><ShopDashboardLayout title='Products'><AdminProductsPage /></ShopDashboardLayout></ProtectedRoute>} />
        <Route path="/admin/categories" element={<ProtectedRoute><ShopDashboardLayout title='Categories'><AdminCategoriesPage /></ShopDashboardLayout></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><ShopDashboardLayout title='Settings'><AdminSettingsPage /></ShopDashboardLayout></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;