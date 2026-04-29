import { Outlet, useNavigate, NavLink } from "react-router";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { logoutUser } from "../../features/auth/authThunks";
import toast from "react-hot-toast";
import { setActiveShop } from "../../features/shop/shopSlice";
import { ChevronDown, LayoutDashboard, ShoppingBag, Package, Tag, Settings, Store, LogOut } from "lucide-react";

const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, to: "." },
    { label: "Orders", icon: ShoppingBag, to: "orders" },
    { label: "Products", icon: Package, to: "products" },
    { label: "Categories", icon: Tag, to: "categories" },
    { label: "Settings", icon: Settings, to: "settings" },
];

const ShopDashboardLayout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector((s) => s.auth);
    const { shops, activeShop } = useAppSelector((s) => s.shop);

    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate("/login/partner");
        toast.success("Logged out");
    };

    const handleShopSwitch = (shopId: string) => {
        const shop = shops.find((s) => s._id === shopId);
        if (shop) dispatch(setActiveShop(shop));
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            <aside className="w-60 min-h-screen bg-white border-r border-slate-100 flex flex-col">
            {/* Logo */}
            <div className="px-5 py-5 border-b border-slate-100">
                <span className="text-lg font-bold">
                    <span className="text-slate-800">Ghar</span>
                    <span className="text-red-500">Se</span>
                </span>
                <p className="text-xs text-slate-400 mt-0.5">Shop Dashboard</p>
            </div>

            {/* Shop Switcher */}
            {shops.length > 0 && (
                <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-xs text-slate-400 mb-1.5 font-medium">Active Shop</p>
                    <div className="relative">
                        <select
                            value={activeShop?._id ?? ""}
                            onChange={(e) => handleShopSwitch(e.target.value)}
                            className="w-full text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 pr-8 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500/20"
                        >
                            {shops.map((shop) => (
                                <option key={shop._id} value={shop._id}>
                                    {shop.name}
                                </option>
                            ))}
                        </select>
                        <ChevronDown
                            size={12}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                        />
                    </div>

                    {/* Open/Closed badge */}
                    {activeShop && (
                        <div className="mt-2 flex items-center gap-1.5">
                            <div
                                className={`w-1.5 h-1.5 rounded-full ${
                                    activeShop.isOpen ? "bg-green-500" : "bg-slate-300"
                                }`}
                            />
                            <span className="text-xs text-slate-500">
                                {activeShop.isOpen ? "Open" : "Closed"}
                            </span>
                            {!activeShop.isVerified && (
                                <span className="ml-auto text-xs bg-yellow-50 text-yellow-600 px-2 py-0.5 rounded-full border border-yellow-100">
                                    Pending verification
                                </span>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                {navItems.map(({ label, icon: Icon, to }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={to === "."}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                isActive
                                    ? "bg-red-50 text-red-600"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                            }`
                        }
                    >
                        <Icon size={16} />
                        {label}
                    </NavLink>
                ))}

                {/* Add new shop */}
                <NavLink
                    to="create"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all"
                >
                    <Store size={16} />
                    Add New Shop
                </NavLink>
            </nav>

            {/* User */}
            <div className="px-4 py-4 border-t border-slate-100">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-xs font-semibold text-red-600">
                        {user?.fullName?.[0]?.toUpperCase()}
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-700 truncate">
                            {user?.fullName}
                        </p>
                        <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-xs text-slate-500 hover:text-red-500 transition cursor-pointer w-full"
                >
                    <LogOut size={13} />
                    Logout
                </button>
            </div>
        </aside>

            <main className="flex-1 overflow-auto">
                <div className="max-w-6xl mx-auto px-6 py-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default ShopDashboardLayout;