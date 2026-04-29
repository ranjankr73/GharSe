// pages/admin/AdminOrdersPage.tsx
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
    adminGetAllOrders,
    adminCancelOrder,
} from "../../features/admin/adminThunks";
import Badge from "../../components/ui/Badge";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";
import toast from "react-hot-toast";
import { Search, XCircle } from "lucide-react";

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

const STATUS_FILTERS = [
    { label: "All", value: "" },
    { label: "Pending", value: "PENDING" },
    { label: "Confirmed", value: "CONFIRMED" },
    { label: "Preparing", value: "PREPARING" },
    { label: "Ready", value: "READY" },
    { label: "Out for Delivery", value: "OUT_FOR_DELIVERY" },
    { label: "Delivered", value: "DELIVERED" },
    { label: "Cancelled", value: "CANCELLED" },
];

const AdminOrdersPage = () => {
    const dispatch = useAppDispatch();
    const { orders, status, total, totalPages, page } = useAppSelector(
        (s) => s.admin
    );

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const params: Record<string, string | number> = {
            page: currentPage,
            limit: 15,
        };
        if (statusFilter) params.status = statusFilter;
        dispatch(adminGetAllOrders(params));
    }, [currentPage, statusFilter, dispatch]);

    const handleCancel = async (orderId: string) => {
        const reason = prompt("Reason for cancellation:");
        if (reason === null) return;
        const result = await dispatch(
            adminCancelOrder({ orderId, reason: reason || "Cancelled by admin" })
        );
        if (adminCancelOrder.fulfilled.match(result)) {
            toast.success("Order cancelled");
        } else {
            toast.error("Failed to cancel order");
        }
    };

    const filteredOrders = search
        ? orders.filter(
              (o) =>
                  o._id.toLowerCase().includes(search.toLowerCase()) ||
                  (typeof o.shop === "object" &&
                      o.shop.name
                          .toLowerCase()
                          .includes(search.toLowerCase())) ||
                  (typeof o.customer === "object" &&
                      o.customer.fullName
                          .toLowerCase()
                          .includes(search.toLowerCase()))
          )
        : orders;

    return (
        <div className="space-y-5">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                        type="text"
                        placeholder="Search by order ID, shop or customer..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20"
                    />
                </div>
            </div>

            {/* Status filters */}
            <div className="flex gap-2 flex-wrap">
                {STATUS_FILTERS.map((f) => (
                    <button
                        key={f.value}
                        onClick={() => {
                            setStatusFilter(f.value);
                            setCurrentPage(1);
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                            statusFilter === f.value
                                ? "bg-red-500 text-white"
                                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            <p className="text-xs text-slate-400">{total} orders</p>

            {status === "loading" ? (
                <div className="flex justify-center py-16">
                    <Spinner />
                </div>
            ) : filteredOrders.length === 0 ? (
                <EmptyState icon="📦" title="No orders found" />
            ) : (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50">
                                {[
                                    "Order",
                                    "Shop",
                                    "Customer",
                                    "Total",
                                    "Payment",
                                    "Status",
                                    "Date",
                                    "Action",
                                ].map((h) => (
                                    <th
                                        key={h}
                                        className="text-left text-xs font-semibold text-slate-500 px-4 py-3"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredOrders.map((order) => (
                                <tr
                                    key={order._id}
                                    className="hover:bg-slate-50 transition"
                                >
                                    <td className="px-4 py-3">
                                        <p className="text-xs font-semibold text-slate-800">
                                            #{order._id.slice(-6).toUpperCase()}
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            {order.items.length} items
                                        </p>
                                    </td>
                                    <td className="px-4 py-3 text-xs text-slate-600">
                                        {typeof order.shop === "object"
                                            ? order.shop.name
                                            : "—"}
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="text-xs text-slate-700">
                                            {typeof order.customer === "object"
                                                ? order.customer.fullName
                                                : "—"}
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            {typeof order.customer === "object"
                                                ? order.customer.email
                                                : ""}
                                        </p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="text-xs font-semibold text-slate-800">
                                            ₹{order.pricing.total}
                                        </p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <Badge
                                            label={order.payment.status}
                                            variant={
                                                order.payment.status === "PAID"
                                                    ? "green"
                                                    : order.payment.status ===
                                                      "REFUNDED"
                                                    ? "blue"
                                                    : "yellow"
                                            }
                                        />
                                    </td>
                                    <td className="px-4 py-3">
                                        <Badge
                                            label={order.status.replace(/_/g, " ")}
                                            variant={
                                                STATUS_BADGE[order.status] ?? "gray"
                                            }
                                        />
                                    </td>
                                    <td className="px-4 py-3 text-xs text-slate-400">
                                        {new Date(order.createdAt).toLocaleDateString(
                                            "en-IN",
                                            {
                                                day: "numeric",
                                                month: "short",
                                            }
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        {![
                                            "DELIVERED",
                                            "CANCELLED",
                                        ].includes(order.status) && (
                                            <button
                                                onClick={() =>
                                                    handleCancel(order._id)
                                                }
                                                title="Cancel order"
                                                className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition cursor-pointer"
                                            >
                                                <XCircle size={14} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between pt-2">
                    <p className="text-xs text-slate-400">
                        Page {page} of {totalPages} ({total} orders)
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

export default AdminOrdersPage;