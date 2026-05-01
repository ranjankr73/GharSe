import { useEffect } from "react";

import { useAppDispatch } from "./hooks/useAppDispatch";
import { useAppSelector } from "./hooks/useAppSelector";

import { initializeAuth } from "./features/auth/authThunks";
import { getMyShops } from "./features/shop/shopThunks";

import Spinner from "./components/ui/Spinner";
import { BrowserRouter, Routes, Route } from "react-router";
import LandingLayout from "./components/layout/LandingLayout";
import CustomerLandingPage from "./pages/landing/CustomerLandingPage";
import PartnerLandingPage from "./pages/landing/PartnerLandingPage";
import DriverLandingPage from "./pages/landing/DriverLandingPage";
import AdminLoginPage from "./pages/auth/AdminLoginPage";
import ShopBrowsePage from "./pages/customer/ShopBrowsePage";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import AdminDashboardLayout from "./components/layout/AdminDashboardLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminShopsPage from "./pages/admin/AdminShopsPage";
import AdminShopDetailPage from "./pages/admin/AdminShopDetailPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminCategoriesPage from "./pages/admin/AdminCategoriesPage";
import ShopDashboardLayout from "./components/layout/ShopDashboardLayout";
import ShopDashboardPage from "./pages/shop/ShopDashboardPage";
import ShopOrdersPage from "./pages/shop/ShopOrdersPage";
import ShopProductsPage from "./pages/shop/ShopProductsPage";
import ShopCategoriesPage from "./pages/shop/ShopCategoriesPage";
import ShopSettingsPage from "./pages/shop/ShopSettingsPage";
import ShopCreatePage from "./pages/shop/ShopCreatePage";
import ShopDetailPage from "./pages/customer/ShopDetailPage";
import CartPage from "./pages/customer/CartPage";
import CheckoutPage from "./pages/customer/CheckoutPage";
import OrderSuccessPage from "./pages/customer/OrderSuccessPage";
import OrderTrackingPage from "./pages/customer/OrderTrackingPage";
import OrderHistoryPage from "./pages/customer/OrderHistoryPage";
import CustomerDashboardLayout from "./components/layout/CustomerDashboardLayout";
import AuthLayout from "./components/layout/AuthLayout";
import AuthRoleSelector from "./components/auth/AuthRoleSelector";
import AuthForm from "./components/auth/AuthForm";

const App = () => {
    const dispatch = useAppDispatch();
    const { isInitialized, isAuthenticated, user } = useAppSelector(
        (s) => s.auth,
    );

    useEffect(() => {
        dispatch(initializeAuth());
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated && user?.role === "partner") {
            dispatch(getMyShops());
        }
    }, [isAuthenticated, user, dispatch]);

    if (!isInitialized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                {/* Public Pages */}
                <Route path="/" element={<LandingLayout />}>
                    <Route index element={<CustomerLandingPage />} />
                    <Route path="partner" element={<PartnerLandingPage />} />
                    <Route path="rider" element={<DriverLandingPage />} />
                </Route>

                {/* Auth Routes */}
                <Route path="/login" element={<AuthLayout />}>
                    <Route index element={<AuthRoleSelector />} />
                    <Route path=":role" element={<AuthForm />} />
                    <Route path="admin" element={<AdminLoginPage />} />
                </Route>
                <Route path="/register" element={<AuthLayout />}>
                    <Route index element={<AuthRoleSelector />} />
                    <Route path=":role" element={<AuthForm />} />
                </Route>

                {/* Customer Public Routes */}
                <Route path="/browse-shops" element={<ShopBrowsePage />} />
                <Route path="/shop/:shopId" element={<ShopDetailPage />} />
                
                {/* Protected Admin Routes */}
                <Route
                    element={
                        <ProtectedRoute
                            allowedRoles={["admin"]}
                            loginPath="/login/admin"
                        />
                    }
                >
                    <Route
                        path="/admin/dashboard"
                        element={<AdminDashboardLayout />}
                    >
                        <Route index element={<AdminDashboardPage />} />
                        <Route path="shops" element={<AdminShopsPage />} />
                        <Route
                            path="shops/:shopId"
                            element={<AdminShopDetailPage />}
                        />
                        <Route path="orders" element={<AdminOrdersPage />} />
                        <Route
                            path="products"
                            element={<AdminProductsPage />}
                        />
                        <Route
                            path="categories"
                            element={<AdminCategoriesPage />}
                        />
                    </Route>
                </Route>

                {/* Protected Shop Owner Pages */}
                <Route
                    element={
                        <ProtectedRoute
                            allowedRoles={["partner"]}
                            loginPath="/login/partner"
                        />
                    }
                >
                    <Route
                        path="/partner/dashboard"
                        element={<ShopDashboardLayout />}
                    >
                        <Route index element={<ShopDashboardPage />} />
                        <Route path="orders" element={<ShopOrdersPage />} />
                        <Route path="products" element={<ShopProductsPage />} />
                        <Route
                            path="categories"
                            element={<ShopCategoriesPage />}
                        />
                        <Route path="settings" element={<ShopSettingsPage />} />
                        <Route path="create" element={<ShopCreatePage />} />
                    </Route>
                </Route>

                {/* Protected Customer Pages */}
                <Route
                    element={
                        <ProtectedRoute
                            allowedRoles={["customer"]}
                            loginPath="/login/customer"
                        />
                    }
                >
                    <Route
                        path="/customer"
                        element={<CustomerDashboardLayout />}
                    >
                        <Route
                            path="browse-shops"
                            element={<ShopBrowsePage />}
                        />
                        <Route path="cart" element={<CartPage />} />
                        <Route path="checkout" element={<CheckoutPage />} />
                        <Route path="orders" element={<OrderHistoryPage />} />
                    </Route>
                    <Route
                        path="/customer/shop/:shopId"
                        element={<ShopDetailPage />}
                    />
                    <Route
                        path="/customer/orders/:orderId/success"
                        element={<OrderSuccessPage />}
                    />
                    <Route
                        path="/customer/orders/:orderId/track"
                        element={<OrderTrackingPage />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
