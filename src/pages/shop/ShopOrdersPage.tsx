import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getShopOrders, updateOrderStatus } from "../../features/order/orderThunks";
import type { OrderStatus } from "../../features/order/orderTypes";
import OrderCard from "../../components/shop/OrderCard";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";
import toast from "react-hot-toast";

const STATUS_FILTERS: { label: string; value: string }[] = [
    { label: "All", value: "" },
    { label: "Pending", value: "PENDING" },
    { label: "Confirmed", value: "CONFIRMED" },
    { label: "Preparing", value: "PREPARING" },
    { label: "Ready", value: "READY" },
    { label: "Picked Up", value: "PICKED_UP" },
    { label: "Out for Delivery", value: "OUT_FOR_DELIVERY" },
    { label: "Delivered", value: "DELIVERED" },
    { label: "Cancelled", value: "CANCELLED" },
];

const ShopOrdersPage = () => {
    const dispatch = useAppDispatch();
    const { activeShop } = useAppSelector((s) => s.shop);
    const { orders, status, stats, totalPages, page } = useAppSelector(
        (s) => s.order
    );
    const [activeFilter, setActiveFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (!activeShop) return;
        dispatch(
            getShopOrders({
                shopId: activeShop._id,
                params: {
                    ...(activeFilter && { status: activeFilter }),
                    page: currentPage,
                    limit: 10,
                },
            })
        );
    }, [activeShop, activeFilter, currentPage, dispatch]);

    const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
        if (!activeShop) return;
        const result = await dispatch(
            updateOrderStatus({ shopId: activeShop._id, orderId, status: newStatus })
        );
        if (updateOrderStatus.fulfilled.match(result)) {
            toast.success(`Order updated to ${newStatus}`);
        } else {
            toast.error("Failed to update order");
        }
    };

    return (
        <div className="space-y-5">
            {/* Filters */}
            <div className="flex gap-2 flex-wrap">
                {STATUS_FILTERS.map((f) => (
                    <button
                        key={f.value}
                        onClick={() => {
                            setActiveFilter(f.value);
                            setCurrentPage(1);
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                            activeFilter === f.value
                                ? "bg-red-500 text-white"
                                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Orders */}
            {status === "loading" ? (
                <div className="flex justify-center py-16">
                    <Spinner />
                </div>
            ) : orders.length === 0 ? (
                <EmptyState
                    icon="📦"
                    title="No orders found"
                    description="Orders will appear here once customers place them"
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

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between pt-2">
                    <p className="text-xs text-slate-400">
                        Showing page {page} of {totalPages} ({stats?.totalOrders} orders)
                    </p>
                    <div className="flex gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => p - 1)}
                            className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 disabled:opacity-40 cursor-pointer hover:bg-slate-50"
                        >
                            Previous
                        </button>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((p) => p + 1)}
                            className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 disabled:opacity-40 cursor-pointer hover:bg-slate-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShopOrdersPage;