import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getShopStats, getShopOrders } from "../../features/order/orderThunks";
import { toggleShopStatus } from "../../features/shop/shopThunks";
import { updateOrderStatus } from "../../features/order/orderThunks";
import type { OrderStatus } from "../../features/order/orderTypes";
import OrderCard from "../../components/shop/OrderCard";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";
import toast from "react-hot-toast";
import {
    TrendingUp,
    ShoppingBag,
    IndianRupee,
    Clock,
    ToggleLeft,
    ToggleRight,
} from "lucide-react";

const STAT_PERIODS = ["today", "week", "month"] as const;

const ShopDashboardPage = () => {
    const dispatch = useAppDispatch();
    const { activeShop } = useAppSelector((s) => s.shop);
    const { stats, orders, status } = useAppSelector((s) => s.order);
    const [period, setPeriod] = useState<"today" | "week" | "month">("today");

    useEffect(() => {
        if (!activeShop) return;
        dispatch(getShopStats({ shopId: activeShop._id, period }));
        dispatch(getShopOrders({
            shopId: activeShop._id,
            params: { status: "PENDING", limit: 5 },
        }));
    }, [activeShop, period, dispatch]);

    const handleToggleStatus = async () => {
        if (!activeShop) return;
        if (!activeShop.isVerified) {
            toast.error("Shop must be verified before going live");
            return;
        }
        const result = await dispatch(toggleShopStatus(activeShop._id));
        if (toggleShopStatus.fulfilled.match(result)) {
            toast.success(result.payload.isOpen ? "Shop is now Open 🟢" : "Shop is now Closed 🔴");
        }
    };

    const handleStatusUpdate = async (
        orderId: string,
        newStatus: OrderStatus
    ) => {
        if (!activeShop) return;
        const result = await dispatch(
            updateOrderStatus({ shopId: activeShop._id, orderId, status: newStatus })
        );
        if (updateOrderStatus.fulfilled.match(result)) {
            toast.success(`Order ${newStatus.toLowerCase()}`);
        } else {
            toast.error("Failed to update order");
        }
    };

    if (!activeShop) {
        return (
            <EmptyState
                icon="🏪"
                title="No shop found"
                description="Create your first shop to get started"
            />
        );
    }

    return (
        <div className="space-y-6">
            {/* Shop status toggle */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-sm font-semibold text-slate-800">
                            {activeShop.name}
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                            {activeShop.isVerified
                                ? "Verified shop"
                                : "Pending admin verification"}
                        </p>
                    </div>
                    <button
                        onClick={handleToggleStatus}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        {activeShop.isOpen ? (
                            <ToggleRight size={32} className="text-green-500" />
                        ) : (
                            <ToggleLeft size={32} className="text-slate-300" />
                        )}
                        <span
                            className={`text-sm font-medium ${
                                activeShop.isOpen ? "text-green-600" : "text-slate-400"
                            }`}
                        >
                            {activeShop.isOpen ? "Open" : "Closed"}
                        </span>
                    </button>
                </div>
            </div>

            {/* Period selector */}
            <div className="flex gap-2">
                {STAT_PERIODS.map((p) => (
                    <button
                        key={p}
                        onClick={() => setPeriod(p)}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition cursor-pointer ${
                            period === p
                                ? "bg-red-500 text-white"
                                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                    >
                        {p}
                    </button>
                ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    {
                        label: "Total Orders",
                        value: stats?.totalOrders ?? 0,
                        icon: ShoppingBag,
                        color: "text-blue-500",
                        bg: "bg-blue-50",
                    },
                    {
                        label: "Revenue",
                        value: `₹${stats?.totalRevenue ?? 0}`,
                        icon: IndianRupee,
                        color: "text-green-500",
                        bg: "bg-green-50",
                    },
                    {
                        label: "Avg. Order",
                        value: `₹${stats?.avgOrderValue ?? 0}`,
                        icon: TrendingUp,
                        color: "text-purple-500",
                        bg: "bg-purple-50",
                    },
                    {
                        label: "Pending",
                        value: stats?.activeOrders?.PENDING ?? 0,
                        icon: Clock,
                        color: "text-orange-500",
                        bg: "bg-orange-50",
                    },
                ].map(({ label, value, icon: Icon, color, bg }) => (
                    <div
                        key={label}
                        className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5"
                    >
                        <div
                            className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mb-3`}
                        >
                            <Icon size={16} className={color} />
                        </div>
                        <p className="text-xs text-slate-400">{label}</p>
                        <p className="text-lg font-bold text-slate-800 mt-0.5">
                            {value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Active order breakdown */}
            {stats && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                    <h3 className="text-sm font-semibold text-slate-800 mb-4">
                        Active Orders
                    </h3>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                        {(
                            [
                                "PENDING",
                                "CONFIRMED",
                                "PREPARING",
                                "READY",
                                "PICKED_UP",
                                "OUT_FOR_DELIVERY",
                            ] as const
                        ).map((s) => (
                            <div
                                key={s}
                                className="text-center bg-slate-50 rounded-xl p-3"
                            >
                                <p className="text-lg font-bold text-slate-800">
                                    {stats.activeOrders[s] ?? 0}
                                </p>
                                <p className="text-xs text-slate-400 mt-0.5 capitalize">
                                    {s.replace(/_/g, " ").toLowerCase()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Pending orders */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <h3 className="text-sm font-semibold text-slate-800 mb-4">
                    Pending Orders
                </h3>
                {status === "loading" ? (
                    <div className="flex justify-center py-8">
                        <Spinner />
                    </div>
                ) : orders.length === 0 ? (
                    <EmptyState
                        icon="🎉"
                        title="No pending orders"
                        description="All caught up!"
                    />
                ) : (
                    <div className="space-y-3">
                        {orders.map((order) => (
                            <OrderCard
                                key={order._id}
                                order={order}
                                onStatusUpdate={handleStatusUpdate}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopDashboardPage;