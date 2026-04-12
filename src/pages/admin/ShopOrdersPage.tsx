import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchOrders, updateOrderStatus } from "../../redux/slices/orderSlice";
import StatusBadge from "../../components/ui/StatusBadge";
import { formatCurrency, formatTimeAgo } from "../../utils";
import type { Order, OrderStatus } from "../../types";
import toast from "react-hot-toast";

const STATUS_ACTIONS: { status: OrderStatus; label: string }[] = [
  { status: "accepted", label: "Accept" },
  { status: "preparing", label: "Preparing" },
  { status: "out_for_delivery", label: "Out for Delivery" },
  { status: "delivered", label: "Delivered" },
  { status: "rejected", label: "Reject" },
];

const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus[]>> = {
  pending: ["accepted", "rejected"],
  accepted: ["preparing"],
  preparing: ["out_for_delivery"],
  out_for_delivery: ["delivered"],
};

const ShopOrdersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { orders, loading } = useAppSelector((s) => s.orders);

  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchOrders("shop-001"));
  }, [dispatch]);

  const filtered =
    filterStatus === "all"
      ? orders
      : orders.filter((o) => o.status === filterStatus);

  const handleStatusUpdate = async (order: Order, newStatus: OrderStatus) => {
    setUpdatingId(order.id);
    try {
      await dispatch(
        updateOrderStatus({ orderId: order.id, status: newStatus })
      ).unwrap();

      toast.success(`Order #${order.id} updated`);
    } catch {
      toast.error("Failed to update");
    } finally {
      setUpdatingId(null);
    }
  };

  const filterTabs = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "accepted", label: "Accepted" },
    { value: "preparing", label: "Preparing" },
    { value: "out_for_delivery", label: "On the way" },
    { value: "delivered", label: "Delivered" },
    { value: "rejected", label: "Rejected" },
  ];

  return (
    <div className="space-y-5">

      {/* 🔥 FILTER TABS */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilterStatus(tab.value as any)}
            className={`
              px-4 py-2 rounded-full text-xs font-medium transition
              ${
                filterStatus === tab.value
                  ? "bg-red-500 text-white shadow-sm"
                  : "bg-white text-gray-500 border border-gray-100 hover:bg-gray-50"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 📦 ORDERS */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 py-16 text-center">
          <div className="text-4xl mb-2">📭</div>
          <p className="font-medium text-gray-700">No orders found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => {
            const isExpanded = expandedId === order.id;
            const nextActions = NEXT_STATUS[order.status] ?? [];
            const availableActions = STATUS_ACTIONS.filter((a) =>
              nextActions.includes(a.status)
            );

            return (
              <div
                key={order.id}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden transition"
              >
                {/* ROW */}
                <div
                  className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50"
                  onClick={() =>
                    setExpandedId(isExpanded ? null : order.id)
                  }
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 font-mono">
                        #{order.id}
                      </span>
                      <StatusBadge status={order.status} size="sm" />
                    </div>

                    <p className="text-sm font-medium text-gray-800 mt-1">
                      {order.customerName}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {formatCurrency(order.totalAmount + order.deliveryFee)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatTimeAgo(order.createdAt)}
                    </p>
                  </div>
                </div>

                {/* EXPANDED */}
                {isExpanded && (
                  <div className="border-t px-5 py-4 space-y-4 bg-gray-50">
                    
                    {/* ITEMS */}
                    <div className="space-y-1 text-sm">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between">
                          <span>
                            {item.productName} ×{item.quantity}
                          </span>
                          <span className="font-medium">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CONTACT */}
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{order.phone}</span>
                      {order.note && <span>{order.note}</span>}
                    </div>

                    {/* ACTIONS */}
                    {availableActions.length > 0 && (
                      <div className="flex gap-2">
                        {availableActions.map((action) => (
                          <button
                            key={action.status}
                            onClick={() =>
                              handleStatusUpdate(order, action.status)
                            }
                            disabled={updatingId === order.id}
                            className={`
                              flex-1 py-2 rounded-xl text-sm font-medium
                              transition active:scale-95
                              ${
                                action.status === "rejected"
                                  ? "bg-red-100 text-red-600"
                                  : "bg-red-500 text-white hover:bg-red-600"
                              }
                            `}
                          >
                            {updatingId === order.id
                              ? "Updating..."
                              : action.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ShopOrdersPage;