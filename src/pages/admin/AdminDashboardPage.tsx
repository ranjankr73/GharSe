import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { adminGetAllShops } from "../../features/admin/adminThunks";
import { adminGetAllOrders } from "../../features/admin/adminThunks";
import { adminGetAllCategories } from "../../features/admin/adminThunks";
import AdminStatCard from "../../components/admin/AdminStatCard";
import Badge from "../../components/ui/Badge";
import Spinner from "../../components/ui/Spinner";
import type { AdminShop } from "../../features/admin/adminTypes";
import type { AdminOrder } from "../../features/admin/adminTypes";
import { Store, ShoppingBag, ArrowRight } from "lucide-react";

const AdminDashboardPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { shops, orders, categories, status } = useAppSelector(
        (s) => s.admin
    );

    useEffect(() => {
        dispatch(adminGetAllShops({ limit: 5, page: 1 }));
        dispatch(adminGetAllOrders({ limit: 5, page: 1 }));
        dispatch(adminGetAllCategories());
    }, [dispatch]);

    const pendingShops = shops.filter((s) => !s.isVerified);
    const verifiedShops = shops.filter((s) => s.isVerified);
    const totalRevenue = orders.reduce(
        (sum, o) =>
            o.status !== "CANCELLED" ? sum + o.pricing.total : sum,
        0
    );

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <AdminStatCard
                    label="Total Shops"
                    value={shops.length}
                    icon="🏪"
                    sub={`${pendingShops.length} pending verification`}
                    color="blue"
                />
                <AdminStatCard
                    label="Total Orders"
                    value={orders.length}
                    icon="📦"
                    color="green"
                />
                <AdminStatCard
                    label="Platform Revenue"
                    value={`₹${totalRevenue.toLocaleString("en-IN")}`}
                    icon="💰"
                    color="purple"
                />
                <AdminStatCard
                    label="Categories"
                    value={categories.length}
                    icon="🏷️"
                    sub={`${categories.filter((c) => c.isActive).length} active`}
                    color="yellow"
                />
            </div>

            <div className="grid lg:grid-cols-2 gap-5">
                {/* Pending verification shops */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                            <span className="w-7 h-7 bg-yellow-50 rounded-lg flex items-center justify-center text-sm">
                                ⏳
                            </span>
                            Pending Verification
                        </h2>
                        <button
                            onClick={() => navigate("shops")}
                            className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 cursor-pointer"
                        >
                            View all
                            <ArrowRight size={12} />
                        </button>
                    </div>

                    {status === "loading" ? (
                        <div className="flex justify-center py-8">
                            <Spinner />
                        </div>
                    ) : pendingShops.length === 0 ? (
                        <p className="text-xs text-slate-400 text-center py-8">
                            All shops are verified ✅
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {pendingShops.slice(0, 5).map((shop) => (
                                <PendingShopRow
                                    key={shop._id}
                                    shop={shop}
                                    onView={() =>
                                        navigate(`/admin/shops/${shop._id}`)
                                    }
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent orders */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                            <span className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center text-sm">
                                📦
                            </span>
                            Recent Orders
                        </h2>
                        <button
                            onClick={() => navigate("orders")}
                            className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 cursor-pointer"
                        >
                            View all
                            <ArrowRight size={12} />
                        </button>
                    </div>

                    {status === "loading" ? (
                        <div className="flex justify-center py-8">
                            <Spinner />
                        </div>
                    ) : orders.length === 0 ? (
                        <p className="text-xs text-slate-400 text-center py-8">
                            No orders yet
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {orders.slice(0, 5).map((order) => (
                                <RecentOrderRow key={order._id} order={order} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const STATUS_BADGE: Record<
    string,
    "green" | "yellow" | "red" | "blue" | "gray" | "orange"
> = {
    PENDING: "yellow",
    CONFIRMED: "blue",
    PREPARING: "orange",
    READY: "green",
    PICKED_UP: "blue",
    OUT_FOR_DELIVERY: "blue",
    DELIVERED: "green",
    CANCELLED: "red",
};

const PendingShopRow = ({
    shop,
    onView,
}: {
    shop: AdminShop;
    onView: () => void;
}) => (
    <div className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-sm">
                {shop.logo ? (
                    <img
                        src={shop.logo}
                        alt={shop.name}
                        className="w-8 h-8 rounded-xl object-cover"
                    />
                ) : (
                    "🏪"
                )}
            </div>
            <div>
                <p className="text-xs font-semibold text-slate-700">
                    {shop.name}
                </p>
                <p className="text-xs text-slate-400">
                    {typeof shop.owner === "object"
                        ? shop.owner.email
                        : ""}
                </p>
            </div>
        </div>
        <button
            onClick={onView}
            className="text-xs text-red-500 hover:text-red-600 font-medium cursor-pointer"
        >
            Review
        </button>
    </div>
);

const RecentOrderRow = ({ order }: { order: AdminOrder }) => (
    <div className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
        <div>
            <p className="text-xs font-semibold text-slate-700">
                #{order._id.slice(-6).toUpperCase()}
            </p>
            <p className="text-xs text-slate-400">
                {typeof order.shop === "object" ? order.shop.name : ""}
            </p>
        </div>
        <div className="flex items-center gap-3">
            <Badge
                label={order.status.replace(/_/g, " ")}
                variant={STATUS_BADGE[order.status] ?? "gray"}
            />
            <span className="text-xs font-semibold text-slate-700">
                ₹{order.pricing.total}
            </span>
        </div>
    </div>
);

export default AdminDashboardPage;