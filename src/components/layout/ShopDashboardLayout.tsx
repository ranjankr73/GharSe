import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { logout } from "../../redux/slices/authSlice";
import Logo from "../ui/Logo";

const ADMIN_NAV = [
    { to: "/admin/dashboard", icon: "📊", label: "Dashboard" },
    { to: "/admin/orders", icon: "📦", label: "Orders" },
    { to: "/admin/products", icon: "🛍️", label: "Products" },
    { to: "/admin/categories", icon: "📂", label: "Categories" },
    { to: "/admin/settings", icon: "⚙️", label: "Settings" },
];

interface Props {
    children: React.ReactNode;
    title: string;
}

const ShopDashboardLayout: React.FC<Props> = ({ children, title }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const shop = useAppSelector((s) => s.auth.admin);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/admin/login");
    };

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* OVERLAY (mobile) */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-white z-50 flex flex-col
        border-r border-gray-100 shadow-sm
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
            >
                {/* Logo */}
                <div className="p-6 border-b border-gray-100 flex flex-col items-start gap-6">
                    <Link to="/shop/shop-001">
                        <Logo size="sm" />
                    </Link>

                    <h2 className="text-xl font-bold text-gray-600 tracking-tight self-center">
                        Shop Panel
                    </h2>
                </div>

                {/* NAV */}
                <nav className="flex-1 p-3 space-y-1">
                    {ADMIN_NAV.map((item) => {
                        const isActive = location.pathname === item.to;

                        return (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                ${
                    isActive
                        ? "bg-red-50 text-red-600"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                }`}
                            >
                                <span>{item.icon}</span>
                                {item.label}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* USER */}
                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {shop?.name?.[0] || "S"}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-800">
                                {shop?.name || "Shop"}
                            </p>
                            <p className="text-xs text-gray-400">
                                {shop?.email}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-gray-500 hover:text-red-500 hover:bg-red-50 transition cursor-pointer"
                    >
                        🚪 Logout
                    </button>
                </div>
            </aside>

            {/* MAIN */}
            <div className="flex-1 lg:ml-64 flex flex-col">
                {/* TOPBAR */}
                <header className="bg-white border-b border-gray-100 px-4 lg:px-8 py-4 flex items-center justify-between sticky top-0 z-20">
                    {/* LEFT */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 cursor-pointer"
                        >
                            ☰
                        </button>

                        <h1 className="text-lg font-semibold text-gray-800">
                            {title}
                        </h1>
                    </div>

                    {/* RIGHT */}
                    <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                        🍔 {shop?.name || "Shop"}
                    </div>
                </header>

                {/* CONTENT */}
                <main className="flex-1 p-4 lg:p-8">{children}</main>
            </div>
        </div>
    );
};

export default ShopDashboardLayout;
