import React from "react";
import { useNavigate } from "react-router";
import type { Order } from "../../types";

import StatusBadge from "../ui/StatusBadge";
import Button from "../ui/Button";

import { formatCurrency, formatTimeAgo } from "../../utils";

interface OrderCardProps {
  order: Order;
  showActions?: boolean;
  onReorder?: (order: Order) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  showActions = true,
  onReorder,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      
      {/* 🔥 HEADER */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        
        <div>
          <p className="text-xs text-gray-400 font-mono">
            #{order.id}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {formatTimeAgo(order.createdAt)}
          </p>
        </div>

        <StatusBadge status={order.status} />
      </div>

      {/* 📦 ITEMS */}
      <div className="px-4 py-3 space-y-2">
        
        {order.items.slice(0, 2).map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-center text-sm"
          >
            <span className="text-gray-700 truncate">
              {item.productName}{" "}
              <span className="text-gray-400">
                ×{item.quantity}
              </span>
            </span>

            <span className="font-medium text-gray-900">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </div>
        ))}

        {/* Show more indicator */}
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
            {formatCurrency(
              order.totalAmount + order.deliveryFee
            )}
          </span>
        </div>
      </div>

      {/* 🚀 ACTIONS */}
      {showActions && (
        <div className="px-4 pb-4 flex gap-2">
          
          <Button
            onClick={() => navigate(`/track/${order.id}`)}
            variant="outline"
            size="md"
            fullWidth
          >
            Track
          </Button>

          {onReorder && (
            <Button
              onClick={() => onReorder(order)}
              size="md"
              fullWidth
            >
              Reorder
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderCard;