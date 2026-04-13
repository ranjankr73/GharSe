import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import StatusBadge from "../../components/ui/StatusBadge";
import Button from "../../components/ui/Button";
import { formatCurrency } from "../../utils";
import type { Order } from "../../types";

const OrderSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const order = location.state?.order as Order | undefined;

  useEffect(() => {
    if (!order) navigate("/shop/shop-001");
  }, [order, navigate]);

  if (!order) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-10 md:pt-20">
      
      {/* 🎉 SUCCESS ICON */}
      <div className="text-5xl mb-4 animate-fade-in">
  🎉
</div>

      {/* HEADING */}
      <h1 className="text-2xl font-semibold text-gray-900 text-center">
        Order Placed!
      </h1>

      <p className="text-sm text-gray-500 text-center mt-2 max-w-xs">
        Your order has been successfully placed. Sit tight, we’re preparing your food!
      </p>

      {/* 📦 ORDER CARD */}
      <div className="w-full max-w-md mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <p className="text-xs text-gray-400">Order ID</p>
            <p className="font-mono font-semibold text-gray-800">
              #{order.id}
            </p>
          </div>

          <StatusBadge status={order.status} />
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-sm">

          {/* Customer */}
          <div className="flex gap-3">
            <span>👤</span>
            <div>
              <p className="text-gray-400 text-xs">Customer</p>
              <p className="font-medium text-gray-800">
                {order.customerName}
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="flex gap-3">
            <span>📍</span>
            <div>
              <p className="text-gray-400 text-xs">Delivery to</p>
              <p className="font-medium text-gray-800">
                {order.address}
              </p>
            </div>
          </div>

          {/* ETA */}
          <div className="flex gap-3">
            <span>🕐</span>
            <div>
              <p className="text-gray-400 text-xs">
                Estimated delivery
              </p>
              <p className="font-medium text-gray-800">
                {order.estimatedDelivery ?? "30–45 min"}
              </p>
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">
              Total
            </span>
            <span className="text-lg font-semibold text-gray-900">
              {formatCurrency(order.totalAmount + order.deliveryFee)}
            </span>
          </div>
        </div>
      </div>

      {/* 🚀 ACTIONS */}
      <div className="w-full max-w-md mt-6 space-y-3">
        
        <Button
          onClick={() => navigate(`/track/${order.id}`)}
          size="lg"
          fullWidth
        >
          Track Order <img src="/emojis/scooter.png" alt="Scooter" className="w-6 h-6"/>
        </Button>

        <Button
          onClick={() => navigate("/shop/shop-001")}
          variant="outline"
          size="lg"
          fullWidth
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default OrderSuccessPage;