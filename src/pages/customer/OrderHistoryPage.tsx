import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getMyOrders } from "../../features/customerOrder/customerOrderThunks";
import { addToCart } from "../../features/cart/cartThunks";
import CustomerOrderCard from "../../components/customer/CustomerOrderCard";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";
import Button from "../../components/ui/Button";
import type { Order } from "../../features/order/orderTypes";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

const STATUS_FILTERS = [
    { label: "All", value: "" },
    { label: "Active", value: "PENDING" },
    { label: "Delivered", value: "DELIVERED" },
    { label: "Cancelled", value: "CANCELLED" },
];

const OrderHistoryPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { orders, status, totalPages, page } = useAppSelector(
        (s) => s.customerOrder
    );
    const [statusFilter, setStatusFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const params: Record<string, string | number> = {
            page: currentPage,
            limit: 10,
        };
        if (statusFilter) params.status = statusFilter;
        dispatch(getMyOrders(params));
    }, [currentPage, statusFilter, dispatch]);

    const handleReorder = async (order: Order) => {
        // Add all items from the order back to cart
        let hasError = false;
        for (const item of order.items) {
            const result = await dispatch(
                addToCart({
                    productId:
                        typeof item.product === "object"
                            ? item.product._id
                            : item.product,
                    variantId: item.variantId ?? undefined,
                    quantity: item.quantity,
                })
            );
            if (!addToCart.fulfilled.match(result)) {
                hasError = true;
                break;
            }
        }
        if (!hasError) {
            toast.success("Items added to cart");
            navigate("/user/cart");
        } else {
            toast.error("Some items could not be added");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 cursor-pointer"
                    >
                        <ArrowLeft size={16} />
                    </button>
                    <h1 className="text-lg font-bold text-gray-900">
                        My Orders
                    </h1>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 py-5 space-y-5">
                {/* Filters */}
                <div className="flex gap-2">
                    {STATUS_FILTERS.map((f) => (
                        <button
                            key={f.value}
                            onClick={() => {
                                setStatusFilter(f.value);
                                setCurrentPage(1);
                            }}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                                statusFilter === f.value
                                    ? "bg-red-500 text-white"
                                    : "bg-white border border-gray-200 text-gray-600"
                            }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {status === "loading" ? (
                    <div className="flex justify-center py-16">
                        <Spinner />
                    </div>
                ) : orders.length === 0 ? (
                    <EmptyState
                        icon="📦"
                        title="No orders yet"
                        description="Your order history will appear here"
                        action={
                            <Button
                                onClick={() =>
                                    navigate("/user/browse-shops")
                                }
                            >
                                Browse Shops
                            </Button>
                        }
                    />
                ) : (
                    <>
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <CustomerOrderCard
                                    key={order._id}
                                    order={order}
                                    onReorder={handleReorder}
                                />
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="flex justify-center gap-2 pt-2">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((p) => p - 1)}
                                    className="px-4 py-2 text-sm rounded-xl border border-gray-200 disabled:opacity-40 cursor-pointer hover:bg-gray-50"
                                >
                                    Previous
                                </button>
                                <span className="px-4 py-2 text-sm text-gray-500">
                                    {page} / {totalPages}
                                </span>
                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage((p) => p + 1)}
                                    className="px-4 py-2 text-sm rounded-xl border border-gray-200 disabled:opacity-40 cursor-pointer hover:bg-gray-50"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default OrderHistoryPage;