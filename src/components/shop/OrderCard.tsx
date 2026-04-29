// components/shop/OrderCard.tsx
import { useNavigate } from "react-router";
import type { Order, OrderStatus } from "../../features/order/orderTypes";
import Badge from "../ui/Badge";
import { Clock, MapPin, ChevronRight } from "lucide-react";

const STATUS_CONFIG: Record<
    OrderStatus,
    { label: string; variant: "green" | "yellow" | "red" | "blue" | "gray" | "orange" }
> = {
    PENDING: { label: "Pending", variant: "yellow" },
    CONFIRMED: { label: "Confirmed", variant: "blue" },
    PREPARING: { label: "Preparing", variant: "orange" },
    READY: { label: "Ready", variant: "green" },
    PICKED_UP: { label: "Picked Up", variant: "blue" },
    OUT_FOR_DELIVERY: { label: "Out for Delivery", variant: "blue" },
    DELIVERED: { label: "Delivered", variant: "green" },
    CANCELLED: { label: "Cancelled", variant: "red" },
};

const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
    PENDING: "CONFIRMED",
    CONFIRMED: "PREPARING",
    PREPARING: "READY",
    READY: "PICKED_UP",
    PICKED_UP: "OUT_FOR_DELIVERY",
    OUT_FOR_DELIVERY: "DELIVERED",
};

const NEXT_STATUS_LABEL: Partial<Record<OrderStatus, string>> = {
    PENDING: "Accept Order",
    CONFIRMED: "Start Preparing",
    PREPARING: "Mark Ready",
    READY: "Mark Picked Up",
    PICKED_UP: "Out for Delivery",
    OUT_FOR_DELIVERY: "Mark Delivered",
};

interface Props {
    order: Order;
    onStatusUpdate: (orderId: string, status: OrderStatus) => void;
}

const OrderCard = ({ order, onStatusUpdate }: Props) => {
    const navigate = useNavigate();
    const config = STATUS_CONFIG[order.status];
    const nextStatus = NEXT_STATUS[order.status];
    const nextLabel = NEXT_STATUS_LABEL[order.status];

    const customer = typeof order.customer === "object" ? order.customer : null;

    return (
        <div className="border border-slate-100 rounded-xl p-4 hover:border-slate-200 transition">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold text-slate-800">
                        #{order._id.slice(-6).toUpperCase()}
                    </p>
                    <Badge label={config.label} variant={config.variant} />
                </div>
                <p className="text-xs font-semibold text-slate-800">
                    ₹{order.pricing.total}
                </p>
            </div>

            {/* Customer + address */}
            <div className="space-y-1 mb-3">
                {customer && (
                    <p className="text-xs text-slate-600 font-medium">
                        {customer.fullName} · {customer.phone}
                    </p>
                )}
                <div className="flex items-center gap-1 text-xs text-slate-400">
                    <MapPin size={11} />
                    <span>
                        {order.deliveryAddress.addressLine},{" "}
                        {order.deliveryAddress.city}
                    </span>
                </div>
            </div>

            {/* Items */}
            <div className="text-xs text-slate-500 mb-3">
                {order.items.map((item, i) => (
                    <span key={item._id}>
                        {item.snapshot.name} × {item.quantity}
                        {i < order.items.length - 1 ? ", " : ""}
                    </span>
                ))}
            </div>

            {/* Payment + time */}
            <div className="flex items-center justify-between mb-4">
                <span className="text-xs bg-slate-50 text-slate-600 px-2 py-0.5 rounded-full">
                    {order.payment.method}
                </span>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock size={11} />
                    <span>
                        {new Date(order.createdAt).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                {nextStatus && nextLabel && order.status !== "CANCELLED" && (
                    <button
                        onClick={() => onStatusUpdate(order._id, nextStatus)}
                        className="flex-1 bg-red-500 text-white text-xs font-medium py-2 rounded-xl hover:bg-red-600 transition cursor-pointer"
                    >
                        {nextLabel}
                    </button>
                )}

                {/* Cancel — only on cancellable statuses */}
                {["PENDING", "CONFIRMED", "PREPARING"].includes(order.status) && (
                    <button
                        onClick={() => onStatusUpdate(order._id, "CANCELLED")}
                        className="px-3 py-2 text-xs font-medium text-red-500 border border-red-100 rounded-xl hover:bg-red-50 transition cursor-pointer"
                    >
                        Cancel
                    </button>
                )}

                <button
                    onClick={() => navigate(`/shops/orders/${order._id}`)}
                    className="p-2 rounded-xl border border-slate-100 hover:bg-slate-50 transition cursor-pointer"
                >
                    <ChevronRight size={14} className="text-slate-400" />
                </button>
            </div>
        </div>
    );
};

export default OrderCard;