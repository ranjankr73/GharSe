import { NavLink, Outlet, useNavigate } from "react-router";
import {
    LayoutDashboard,
    Store,
    ShoppingBag,
    Package,
    Tag,
    LogOut,
    Shield,
} from "lucide-react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { logoutUser } from "../../features/auth/authThunks";
import toast from "react-hot-toast";

const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, to: "." },
    { label: "Shops", icon: Store, to: "shops" },
    { label: "Orders", icon: ShoppingBag, to: "orders" },
    { label: "Products", icon: Package, to: "products" },
    { label: "Categories", icon: Tag, to: "categories" },
];

const AdminDashboardLayout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector((s) => s.auth);

    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate("/login/admin");
        toast.success("Logged out");
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="w-60 min-h-screen bg-white border-r border-slate-100 flex flex-col">
                {/* Logo */}
                <div className="px-5 py-5 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-red-500 rounded-lg flex items-center justify-center">
                            <Shield size={14} className="text-white" />
                        </div>

                        <span className="text-lg font-bold">
                            <span className="text-slate-800">Ghar</span>
                            <span className="text-red-500">Se</span>
                        </span>
                    </div>

                    <p className="text-xs text-slate-400 mt-0.5 ml-9">
                        Admin Panel
                    </p>
                </div>

                {/* Navigation */}
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
                </nav>

                {/* User section */}
                <div className="px-4 py-4 border-t border-slate-100">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-xs font-semibold text-red-600">
                            {user?.fullName?.[0]?.toUpperCase()}
                        </div>

                        <div className="min-w-0">
                            <p className="text-xs font-semibold text-slate-700 truncate">
                                {user?.fullName}
                            </p>

                            <p className="text-xs text-red-500 font-medium">
                                Admin
                            </p>
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

            {/* Route content renders here */}
            <main className="flex-1 overflow-auto">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminDashboardLayout;