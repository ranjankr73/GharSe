import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getShopOrderById, updateOrderStatus } from "../../features/order/orderThunks";
import type { OrderStatus } from "../../features/order/orderTypes";
import Badge from "../../components/ui/Badge";
import Spinner from "../../components/ui/Spinner";
import { ArrowLeft, MapPin, Clock, CreditCard } from "lucide-react";
import toast from "react-hot-toast";

const STATUS_COLORS: Record<string, "green" | "yellow" | "red" | "blue" | "gray" | "orange"> = {
    PENDING: "yellow",
    CONFIRMED: "blue",
    PREPARING: "orange",
    READY: "green",
    PICKED_UP: "blue",
    OUT_FOR_DELIVERY: "blue",
    DELIVERED: "green",
    CANCELLED: "red",
};

const TIMELINE_STEPS: { key: string; label: string }[] = [
    { key: "placedAt", label: "Order Placed" },
    { key: "confirmedAt", label: "Order Confirmed" },
    { key: "preparingAt", label: "Preparing" },
    { key: "readyAt", label: "Ready for Pickup" },
    { key: "pickedUpAt", label: "Picked Up" },
    { key: "outForDeliveryAt", label: "Out for Delivery" },
    { key: "deliveredAt", label: "Delivered" },
];

const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
    PENDING: "CONFIRMED",
    CONFIRMED: "PREPARING",
    PREPARING: "READY",
    READY: "PICKED_UP",
    PICKED_UP: "OUT_FOR_DELIVERY",
    OUT_FOR_DELIVERY: "DELIVERED",
};

const NEXT_LABEL: Partial<Record<OrderStatus, string>> = {
    PENDING: "Accept Order",
    CONFIRMED: "Start Preparing",
    PREPARING: "Mark Ready",
    READY: "Mark Picked Up",
    PICKED_UP: "Out for Delivery",
    OUT_FOR_DELIVERY: "Mark Delivered",
};

const ShopOrderDetailPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { activeShop } = useAppSelector((s) => s.shop);
    const { activeOrder, status } = useAppSelector((s) => s.order);

    useEffect(() => {
        if (!activeShop || !orderId) return;
        dispatch(getShopOrderById({ shopId: activeShop._id, orderId }));
    }, [activeShop, orderId, dispatch]);

    const handleStatusUpdate = async (newStatus: OrderStatus) => {
        if (!activeShop || !orderId) return;
        const result = await dispatch(
            updateOrderStatus({ shopId: activeShop._id, orderId, status: newStatus })
        );
        if (updateOrderStatus.fulfilled.match(result)) {
            toast.success(`Order marked as ${newStatus}`);
        } else {
            toast.error("Failed to update");
        }
    };

    if (status === "loading" || !activeOrder) {
        return (
            <div className="flex justify-center py-16">
                <Spinner />
            </div>
        );
    }

    const order = activeOrder;
    const customer = typeof order.customer === "object" ? order.customer : null;
    const nextStatus = NEXT_STATUS[order.status];
    const nextLabel = NEXT_LABEL[order.status];

    return (
        <div className="space-y-5 max-w-2xl">
            {/* Back */}
            <button
                onClick={() => navigate("/shops/orders")}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 transition cursor-pointer"
            >
                <ArrowLeft size={13} />
                Back to Orders
            </button>

            {/* Header */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-sm font-semibold text-slate-800">
                        Order #{order._id.slice(-6).toUpperCase()}
                    </h2>
                    <Badge
                        label={order.status.replace(/_/g, " ")}
                        variant={STATUS_COLORS[order.status] ?? "gray"}
                    />
                </div>
                <p className="text-xs text-slate-400">
                    Placed on{" "}
                    {new Date(order.createdAt).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>

                {/* Action buttons */}
                {order.status !== "DELIVERED" && order.status !== "CANCELLED" && (
                    <div className="flex gap-2 mt-4">
                        {nextStatus && nextLabel && (
                            <button
                                onClick={() => handleStatusUpdate(nextStatus)}
                                className="flex-1 bg-red-500 text-white text-xs font-medium py-2.5 rounded-xl hover:bg-red-600 transition cursor-pointer"
                            >
                                {nextLabel}
                            </button>
                        )}
                        {["PENDING", "CONFIRMED", "PREPARING"].includes(order.status) && (
                            <button
                                onClick={() => handleStatusUpdate("CANCELLED")}
                                className="px-4 py-2.5 text-xs font-medium text-red-500 border border-red-100 rounded-xl hover:bg-red-50 transition cursor-pointer"
                            >
                                Cancel Order
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Order items */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <h3 className="text-xs font-semibold text-slate-700 mb-4">Items</h3>
                <div className="space-y-3">
                    {order.items.map((item) => (
                        <div key={item._id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {item.snapshot.image && (
                                    <img
                                        src={item.snapshot.image}
                                        alt={item.snapshot.name}
                                        className="w-10 h-10 rounded-xl object-cover border border-slate-100"
                                    />
                                )}
                                <div>
                                    <p className="text-xs font-medium text-slate-700">
                                        {item.snapshot.name}
                                        {item.snapshot.variantName && (
                                            <span className="text-slate-400">
                                                {" "}
                                                · {item.snapshot.variantName}
                                            </span>
                                        )}
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        × {item.quantity}
                                    </p>
                                </div>
                            </div>
                            <p className="text-xs font-semibold text-slate-800">
                                ₹{item.snapshot.price * item.quantity}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Pricing */}
                <div className="border-t border-slate-100 mt-4 pt-4 space-y-2">
                    {[
                        { label: "Subtotal", value: order.pricing.subtotal },
                        { label: "Delivery Fee", value: order.pricing.deliveryFee },
                        { label: "Platform Fee", value: order.pricing.platformFee },
                        ...(order.pricing.discount > 0 ? [{
                            label: "Discount",
                            value: -order.pricing.discount,
                        }] : []),
                    ]
                        .filter(Boolean)
                        .map((row: { label: string; value: number }) => (
                            <div key={row.label} className="flex justify-between text-xs text-slate-500">
                                <span>{row.label}</span>
                                <span>₹{row.value}</span>
                            </div>
                        ))}
                    <div className="flex justify-between text-sm font-semibold text-slate-800 pt-1 border-t border-slate-100">
                        <span>Total</span>
                        <span>₹{order.pricing.total}</span>
                    </div>
                </div>
            </div>

            {/* Customer + delivery */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
                <h3 className="text-xs font-semibold text-slate-700">
                    Customer & Delivery
                </h3>

                {customer && (
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs font-semibold">
                            {customer.fullName[0]}
                        </div>
                        <div>
                            <p className="font-medium">{customer.fullName}</p>
                            <p className="text-slate-400">{customer.phone}</p>
                        </div>
                    </div>
                )}

                <div className="flex items-start gap-2 text-xs text-slate-600">
                    <MapPin size={13} className="text-slate-400 mt-0.5 shrink-0" />
                    <span>
                        {order.deliveryAddress.addressLine},{" "}
                        {order.deliveryAddress.city},{" "}
                        {order.deliveryAddress.state} -{" "}
                        {order.deliveryAddress.pinCode}
                    </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-600">
                    <CreditCard size={13} className="text-slate-400" />
                    <span>
                        {order.payment.method} ·{" "}
                        <span
                            className={
                                order.payment.status === "PAID"
                                    ? "text-green-600"
                                    : "text-yellow-600"
                            }
                        >
                            {order.payment.status}
                        </span>
                    </span>
                </div>

                {order.customerNote && (
                    <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600">
                        <span className="font-medium">Note: </span>
                        {order.customerNote}
                    </div>
                )}
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <h3 className="text-xs font-semibold text-slate-700 mb-4">
                    Order Timeline
                </h3>
                <div className="space-y-3">
                    {TIMELINE_STEPS.map((step, i) => {
                        const time =
                            order.statusTimeline[
                                step.key as keyof typeof order.statusTimeline
                            ];
                        const isDone = !!time;
                        const isLast = i === TIMELINE_STEPS.length - 1;

                        return (
                            <div key={step.key} className="flex items-start gap-3">
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                                            isDone
                                                ? "bg-green-500"
                                                : "bg-slate-100"
                                        }`}
                                    >
                                        {isDone && (
                                            <div className="w-2 h-2 rounded-full bg-white" />
                                        )}
                                    </div>
                                    {!isLast && (
                                        <div
                                            className={`w-0.5 h-6 mt-1 ${
                                                isDone ? "bg-green-200" : "bg-slate-100"
                                            }`}
                                        />
                                    )}
                                </div>
                                <div className="pb-2">
                                    <p
                                        className={`text-xs font-medium ${
                                            isDone ? "text-slate-800" : "text-slate-300"
                                        }`}
                                    >
                                        {step.label}
                                    </p>
                                    {time && (
                                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                                            <Clock size={10} />
                                            {new Date(time).toLocaleTimeString("en-IN", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ShopOrderDetailPage;