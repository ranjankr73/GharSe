import { useNavigate } from "react-router";
import type { Order } from "../../features/order/orderTypes";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { formatCurrency, formatTimeAgo } from "../../utils/formatCurrency";

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

interface Props {
    order: Order;
    onReorder?: (order: Order) => void;
}

const CustomerOrderCard = ({ order, onReorder }: Props) => {
    const navigate = useNavigate();
    const shop = typeof order.shop === "object" ? order.shop : null;
    const isActive = !["DELIVERED", "CANCELLED"].includes(order.status);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div>
                    <p className="text-xs text-gray-400 font-mono">
                        #{order._id.slice(-6).toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                        {formatTimeAgo(order.createdAt)}
                    </p>
                </div>
                <Badge
                    label={order.status.replace(/_/g, " ")}
                    variant={STATUS_BADGE[order.status] ?? "gray"}
                />
            </div>

            {/* Shop */}
            {shop && (
                <div className="px-4 pt-3 flex items-center gap-2">
                    {shop.logo && (
                        <img
                            src={shop.logo}
                            alt={shop.name}
                            className="w-6 h-6 rounded-lg object-cover"
                        />
                    )}
                    <p className="text-xs font-medium text-gray-700">
                        {shop.name}
                    </p>
                </div>
            )}

            {/* Items */}
            <div className="px-4 py-3 space-y-2">
                {order.items.slice(0, 2).map((item) => (
                    <div
                        key={item._id}
                        className="flex justify-between items-center text-sm"
                    >
                        <span className="text-gray-700 truncate">
                            {item.snapshot.name}{" "}
                            <span className="text-gray-400">
                                ×{item.quantity}
                            </span>
                        </span>
                        <span className="font-medium text-gray-900 shrink-0 ml-2">
                            {formatCurrency(item.snapshot.price * item.quantity)}
                        </span>
                    </div>
                ))}

                {order.items.length > 2 && (
                    <p className="text-xs text-gray-400">
                        +{order.items.length - 2} more items
                    </p>
                )}

                {/* Total */}
                <div className="border-t border-gray-100 pt-2 mt-2 flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">
                        Total
                    </span>
                    <span className="text-base font-semibold text-gray-900">
                        {formatCurrency(order.pricing.total)}
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="px-4 pb-4 flex gap-2">
                {isActive ? (
                    <Button
                        onClick={() => navigate(`/user/orders/${order._id}/track`)}
                        size="md"
                        fullWidth
                    >
                        Track Order
                    </Button>
                ) : (
                    <Button
                        onClick={() => navigate(`/user/orders/${order._id}`)}
                        variant="outline"
                        size="md"
                        fullWidth
                    >
                        View Details
                    </Button>
                )}

                {onReorder && order.status === "DELIVERED" && (
                    <Button
                        onClick={() => onReorder(order)}
                        size="md"
                        fullWidth
                    >
                        Reorder
                    </Button>
                )}
            </div>
        </div>
    );
};

export default CustomerOrderCard;