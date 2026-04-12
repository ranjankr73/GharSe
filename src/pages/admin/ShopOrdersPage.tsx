import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchOrders, updateOrderStatus } from "../../redux/slices/orderSlice";

import StatusBadge from "../../components/ui/StatusBadge";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import Skeleton from "../../components/ui/Skeleton";

import { formatCurrency, formatTimeAgo } from "../../utils";
import type { Order, OrderStatus } from "../../types";

import toast from "react-hot-toast";

const STATUS_ACTIONS: { status: OrderStatus; label: string }[] = [
  { status: "accepted", label: "Accept" },
  { status: "preparing", label: "Preparing" },
  { status: "out_for_delivery", label: "Dispatch" },
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
      <div className="flex gap-2 overflow-x-auto p-2">
        {filterTabs.map((tab) => (
          <Button
            key={tab.value}
            size="sm"
            variant={filterStatus === tab.value ? "primary" : "outline"}
            onClick={() => setFilterStatus(tab.value as any)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* 📦 ORDERS */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon="📭"
          title="No orders found"
          description="Orders will appear here once customers place them."
        />
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
                className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
              >
                {/* ROW */}
                <div
                  className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition"
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
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>{order.phone}</p>
                      {order.note && (
                        <p className="text-gray-500">{order.note}</p>
                      )}
                    </div>

                    {/* ACTIONS */}
                    {availableActions.length > 0 && (
                      <div className="flex gap-2">
                        {availableActions.map((action) => (
                          <Button
                            key={action.status}
                            fullWidth
                            size="sm"
                            loading={updatingId === order.id}
                            variant={
                              action.status === "rejected"
                                ? "danger"
                                : "primary"
                            }
                            onClick={() =>
                              handleStatusUpdate(order, action.status)
                            }
                          >
                            {action.label}
                          </Button>
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