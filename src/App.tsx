import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Toaster } from 'react-hot-toast';

import { useAppDispatch } from './hooks/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector';
import { initializeAuth } from './features/auth/authThunks';

// Pages
import LandingPage from './pages/LandingPage';
import ShopBrowsePage from './pages/customer/ShopBrowsePage';
import SignupPage from './pages/auth/SignupPage';
import LoginPage from './pages/auth/LoginPage';

// Protected Route
import ProtectedRoute from './components/layout/ProtectedRoute';

// Customer Pages
// import ShopPage from './pages/customer/ShopPage';
// import CartPage from './pages/customer/CartPage';
// import CheckoutPage from './pages/customer/CheckoutPage';
// import OrderTrackingPage from './pages/customer/OrderTrackingPage';
// import OrderSuccessPage from './pages/customer/OrderSuccessPage';
// import OrderHistoryPage from './pages/customer/OrderHistoryPage';


// Shops Pages
import ShopDashboardLayout from './components/layout/ShopDashboardLayout';
import ShopDashboard from './pages/shop/ShopDashboardPage';
import AdminSettingsPage from './pages/shop/ShopSettingsPage';
// import ShopDashboard from './pages/shop/ShopDashboardPage';
// import AdminOrdersPage from './pages/shop/ShopOrdersPage';
// import AdminProductsPage from './pages/shop/ShopProductsPage';
// import AdminCategoriesPage from './pages/shop/ShopCategoriesPage';

// ─── App ─────────────────────────────────────────────────────────────────
const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isInitialized } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initializeAuth());
  }, []);

  if(!isInitialized){
    return (
      <div className="h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
            </div>
    )
  };

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
        {/* Public */}
        <Route path="/" element={<LandingPage/>} index/>
        <Route path="/customers/browse-shops" element={<ShopBrowsePage/>} />

        {/* Auth */}
        <Route path="/shops/register" element={<SignupPage/>} />
        <Route path="/customers/register" element={<SignupPage/>} />
        <Route path="/shops/login" element={<LoginPage/>} />
        <Route path="/customers/login" element={<LoginPage/>} />

        {/* ─── Customer Routes ─────────────────────────── */}
        {/* <Route path='/browse-shops' element={<ShopBrowsePage/>} />
        <Route path="/shops/:shopId" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/success" element={<OrderSuccessPage />} />
        <Route path="/track/:orderId" element={<OrderTrackingPage />} />
        <Route path="/orders" element={<OrderHistoryPage />} /> */}

          {/* ─── Shop Routes ────────────────────────────── */}
          <Route path="/shops/dashboard" element={<ProtectedRoute><ShopDashboardLayout title='Dashboard'><ShopDashboard/></ShopDashboardLayout></ProtectedRoute>} />
          <Route path="/shops/settings" element={<ProtectedRoute><ShopDashboardLayout title='Settings'><AdminSettingsPage /></ShopDashboardLayout></ProtectedRoute>} />
          {/* <Route path="/shops/orders" element=  {<ProtectedRoute><ShopDashboardLayout title='Orders'><AdminOrdersPage /></ShopDashboardLayout></ProtectedRoute>} />
        <Route path="/shops/products" element={<ProtectedRoute><ShopDashboardLayout title='Products'><AdminProductsPage /></ShopDashboardLayout></ProtectedRoute>} />
        <Route path="/shops/categories" element={<ProtectedRoute><ShopDashboardLayout title='Categories'><AdminCategoriesPage /></ShopDashboardLayout></ProtectedRoute>} />
         */}


        {/* Fallback */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;