import React from "react";
import { NavLink, Outlet } from "react-router";
import { useAppSelector } from "../../hooks/useAppSelector";
import Logo from "../ui/Logo";

const CustomerDashboardLayout: React.FC = () => {
    const { cart } = useAppSelector((s) => s.cart);

    const navItems = [
        {
            to: "/user/browse-shops",
            icon: "🏪",
            label: "Shops",
        },
        {
            to: "/user/cart",
            icon: "🛒",
            label: "Cart",
            badge: cart?.totalItems,
        },
        {
            to: "/user/orders",
            icon: "📦",
            label: "Orders",
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Desktop navbar */}
            <header className="hidden md:flex fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100">
                <div className="max-w-5xl mx-auto w-full flex items-center justify-between px-6 py-3">
                    <NavLink to="/">
                        <Logo />
                    </NavLink>

                    <div className="flex items-center gap-6">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.to === "/user/browse-shops"}
                                className={({ isActive }) =>
                                    `
                                    relative text-sm font-medium transition
                                    ${
                                        isActive
                                            ? "text-red-500"
                                            : "text-gray-500 hover:text-gray-900"
                                    }
                                `
                                }
                            >
                                {item.label}

                                {item.badge ? (
                                    <span className="ml-1 text-xs bg-red-500 text-white px-1.5 rounded-full">
                                        {item.badge > 9 ? "9+" : item.badge}
                                    </span>
                                ) : null}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="pt-16 pb-20 md:pb-6">
                <div className="max-w-5xl mx-auto px-4 md:px-6 py-6">
                    <Outlet />
                </div>
            </main>

            {/* Mobile navbar */}
            <nav className="fixed md:hidden bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100">
                <div className="flex items-center justify-around py-2 max-w-md mx-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.to === "/user/browse-shops"}
                            className="flex flex-col items-center gap-0.5 relative"
                        >
                            {({ isActive }) => (
                                <>
                                    <div
                                        className={`relative text-xl ${
                                            isActive
                                                ? "text-red-500"
                                                : "text-gray-400"
                                        }`}
                                    >
                                        {item.icon}

                                        {item.badge ? (
                                            <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
                                                {item.badge > 9
                                                    ? "9+"
                                                    : item.badge}
                                            </span>
                                        ) : null}
                                    </div>

                                    <span
                                        className={`text-[11px] font-medium ${
                                            isActive
                                                ? "text-red-500"
                                                : "text-gray-400"
                                        }`}
                                    >
                                        {item.label}
                                    </span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default CustomerDashboardLayout;