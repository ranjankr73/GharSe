import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getMyOrderById, cancelMyOrder } from "../../features/customerOrder/customerOrderThunks";
import Badge from "../../components/ui/Badge";
import Spinner from "../../components/ui/Spinner";
import { formatCurrency } from "../../utils/formatCurrency";
import { ArrowLeft, MapPin, Phone } from "lucide-react";
import toast from "react-hot-toast";

const TIMELINE_STEPS = [
    { key: "placedAt", label: "Order Placed", icon: "📋" },
    { key: "confirmedAt", label: "Confirmed", icon: "✅" },
    { key: "preparingAt", label: "Preparing", icon: "👨‍🍳" },
    { key: "readyAt", label: "Ready", icon: "📦" },
    { key: "pickedUpAt", label: "Picked Up", icon: "🛵" },
    { key: "outForDeliveryAt", label: "Out for Delivery", icon: "🚀" },
    { key: "deliveredAt", label: "Delivered", icon: "🎉" },
];

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

const OrderTrackingPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { activeOrder, status } = useAppSelector((s) => s.customerOrder);

    useEffect(() => {
        if (!orderId) return;
        dispatch(getMyOrderById(orderId));

        // Poll every 30s for status updates
        const interval = setInterval(() => {
            dispatch(getMyOrderById(orderId));
        }, 30000);

        return () => clearInterval(interval);
    }, [orderId, dispatch]);

    const handleCancel = async () => {
        if (!orderId) return;
        const reason = prompt("Why do you want to cancel?");
        if (reason === null) return;
        const result = await dispatch(
            cancelMyOrder({ orderId, reason: reason || "Cancelled by customer" })
        );
        if (cancelMyOrder.fulfilled.match(result)) {
            toast.success("Order cancelled");
        } else {
            toast.error(result.payload as string ?? "Cannot cancel at this stage");
        }
    };

    if (status === "loading" || !activeOrder) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner size="lg" />
            </div>
        );
    }

    const order = activeOrder;
    const shop = typeof order.shop === "object" ? order.shop : null;
    const canCancel = ["PENDING", "CONFIRMED", "PREPARING"].includes(
        order.status
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
                    <button
                        onClick={() => navigate("/customer/orders")}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 cursor-pointer"
                    >
                        <ArrowLeft size={16} />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-base font-bold text-gray-900">
                            Track Order
                        </h1>
                        <p className="text-xs text-gray-400 font-mono">
                            #{order._id.slice(-6).toUpperCase()}
                        </p>
                    </div>
                    <Badge
                        label={order.status.replace(/_/g, " ")}
                        variant={STATUS_BADGE[order.status] ?? "gray"}
                    />
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
                {/* Status timeline */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <h2 className="text-sm font-semibold text-gray-800 mb-5">
                        Order Status
                    </h2>
                    <div className="space-y-4">
                        {TIMELINE_STEPS.map((step, i) => {
                            const time =
                                order.statusTimeline[
                                    step.key as keyof typeof order.statusTimeline
                                ];
                            const isDone = !!time;
                            const isLast = i === TIMELINE_STEPS.length - 1;

                            return (
                                <div key={step.key} className="flex items-start gap-4">
                                    <div className="flex flex-col items-center">
                                        <div
                                            className={`w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0 ${
                                                isDone
                                                    ? "bg-green-100"
                                                    : "bg-gray-100"
                                            }`}
                                        >
                                            {isDone ? step.icon : (
                                                <div className="w-3 h-3 rounded-full bg-gray-300" />
                                            )}
                                        </div>
                                        {!isLast && (
                                            <div
                                                className={`w-0.5 h-6 mt-1 ${
                                                    isDone
                                                        ? "bg-green-300"
                                                        : "bg-gray-200"
                                                }`}
                                            />
                                        )}
                                    </div>
                                    <div className="pt-1.5">
                                        <p
                                            className={`text-sm font-medium ${
                                                isDone
                                                    ? "text-gray-800"
                                                    : "text-gray-400"
                                            }`}
                                        >
                                            {step.label}
                                        </p>
                                        {time && (
                                            <p className="text-xs text-gray-400 mt-0.5">
                                                {new Date(time).toLocaleTimeString(
                                                    "en-IN",
                                                    {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    }
                                                )}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Shop info */}
                {shop && (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                        <h2 className="text-sm font-semibold text-gray-800 mb-3">
                            Shop Details
                        </h2>
                        <div className="flex items-center gap-3">
                            {shop.logo && (
                                <img
                                    src={shop.logo}
                                    alt={shop.name}
                                    className="w-10 h-10 rounded-xl object-cover"
                                />
                            )}
                            <div>
                                <p className="text-sm font-medium text-gray-800">
                                    {shop.name}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delivery address */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <h2 className="text-sm font-semibold text-gray-800 mb-3">
                        Delivery Address
                    </h2>
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                        <MapPin size={14} className="text-gray-400 mt-0.5 shrink-0" />
                        <span>
                            {order.deliveryAddress.addressLine},{" "}
                            {order.deliveryAddress.city},{" "}
                            {order.deliveryAddress.state} -{" "}
                            {order.deliveryAddress.pinCode}
                        </span>
                    </div>
                </div>

                {/* Order items */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <h2 className="text-sm font-semibold text-gray-800 mb-3">
                        Order Items
                    </h2>
                    <div className="space-y-3">
                        {order.items.map((item) => (
                            <div
                                key={item._id}
                                className="flex justify-between text-sm"
                            >
                                <span className="text-gray-700">
                                    {item.snapshot.name}{" "}
                                    <span className="text-gray-400">
                                        ×{item.quantity}
                                    </span>
                                </span>
                                <span className="font-medium">
                                    {formatCurrency(
                                        item.snapshot.price * item.quantity
                                    )}
                                </span>
                            </div>
                        ))}
                        <div className="border-t border-gray-100 pt-3 flex justify-between font-semibold text-gray-900">
                            <span>Total</span>
                            <span>{formatCurrency(order.pricing.total)}</span>
                        </div>
                    </div>
                </div>

                {/* Cancel button */}
                {canCancel && (
                    <button
                        onClick={handleCancel}
                        className="w-full py-3 text-sm font-medium text-red-500 border border-red-200 rounded-2xl hover:bg-red-50 transition cursor-pointer"
                    >
                        Cancel Order
                    </button>
                )}

                {/* Review button */}
                {order.status === "DELIVERED" && !order.isReviewed && (
                    <button
                        onClick={() => navigate(`/customer/review/${order._id}`)}
                        className="w-full py-3 text-sm font-medium text-white bg-red-500 rounded-2xl hover:bg-red-600 transition cursor-pointer"
                    >
                        Rate Your Order ⭐
                    </button>
                )}
            </div>
        </div>
    );
};

export default OrderTrackingPage;