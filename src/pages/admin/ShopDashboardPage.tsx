import React, { useEffect } from "react";
import { useNavigate } from "react-router";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchOrders } from "../../redux/slices/orderSlice";

import StatusBadge from "../../components/ui/StatusBadge";
import StatCard from "../../components/ui/StatCard";
import EmptyState from "../../components/ui/EmptyState";
import Skeleton from "../../components/ui/Skeleton";
import Button from "../../components/ui/Button";

import {
  formatCurrency,
  formatTimeAgo,
  ORDER_STATUS_CONFIG,
} from "../../utils";

const ShopDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { orders, loading } = useAppSelector((s) => s.orders);
  const shop = useAppSelector((s) => s.shop.shop);

  useEffect(() => {
    dispatch(fetchOrders("shop-001"));
  }, [dispatch]);

  const totalRevenue = orders
    .filter((o) => o.status === "delivered")
    .reduce((sum, o) => sum + o.totalAmount + o.deliveryFee, 0);

  const pendingCount = orders.filter((o) => o.status === "pending").length;

  const todayOrders = orders.filter((o) => {
    const d = new Date(o.createdAt);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  }).length;

  const recentOrders = [...orders].slice(0, 5);

  const statusDistribution = Object.entries(
    orders.reduce<Record<string, number>>((acc, o) => {
      acc[o.status] = (acc[o.status] || 0) + 1;
      return acc;
    }, {})
  );

  return (
    <div className="space-y-6">

      {/* 🔥 HERO */}
      <div className="bg-linear-to-r from-red-500 to-red-600 rounded-3xl p-6 text-white shadow-sm">
        <div className="flex items-center justify-between">
          
          <div>
            <p className="text-red-100 text-sm font-medium">
              Welcome back 👋
            </p>

            <h2 className="text-2xl lg:text-3xl font-semibold mt-1 tracking-tight">
              {shop?.name ?? "Fresh Basket"}
            </h2>

            <div className="flex items-center gap-2 mt-3">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  shop?.isOpen
                    ? "bg-green-300 animate-pulse"
                    : "bg-red-300"
                }`}
              />
              <span className="text-sm text-red-100">
                {shop?.isOpen
                  ? "Open • Accepting orders"
                  : "Closed"}
              </span>
            </div>
          </div>

          <div className="text-5xl opacity-80">🍔</div>
        </div>
      </div>

      {/* 📊 STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Orders" value={String(orders.length)} icon="📦" />
        <StatCard
          label="Revenue"
          value={formatCurrency(totalRevenue)}
          icon="💰"
          variant="success"
        />
        <StatCard
          label="Pending"
          value={String(pendingCount)}
          icon="⏳"
          variant="warning"
        />
        <StatCard label="Today" value={String(todayOrders)} icon="📅" />
      </div>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* 🧾 RECENT ORDERS */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
          
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <h3 className="font-semibold text-gray-800">
              Recent Orders
            </h3>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/admin/orders")}
            >
              View all →
            </Button>
          </div>

          {loading ? (
            <div className="p-5 space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full" />
              ))}
            </div>
          ) : recentOrders.length === 0 ? (
            <EmptyState
              icon="📭"
              title="No orders yet"
              description="Orders will appear here once customers start ordering."
            />
          ) : (
            <div className="divide-y">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => navigate("/admin/orders")}
                  className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 cursor-pointer transition"
                >
                  <div>
                    <p className="font-medium text-gray-800 text-sm">
                      {order.customerName}
                    </p>
                    <p className="text-xs text-gray-400">
                      #{order.id} • {formatTimeAgo(order.createdAt)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900 text-sm">
                      {formatCurrency(order.totalAmount + order.deliveryFee)}
                    </span>

                    <StatusBadge status={order.status} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 📈 STATUS */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          
          <h3 className="font-semibold text-gray-800 mb-4">
            Order Status
          </h3>

          {statusDistribution.length === 0 ? (
            <EmptyState
              icon="📊"
              title="No data yet"
              description="Order stats will appear here."
            />
          ) : (
            <div className="space-y-4">
              {statusDistribution.map(([status, count]) => {
                const cfg =
                  ORDER_STATUS_CONFIG[
                    status as keyof typeof ORDER_STATUS_CONFIG
                  ];

                const pct = orders.length
                  ? Math.round((count / orders.length) * 100)
                  : 0;

                return (
                  <div key={status}>
                    
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600 font-medium">
                        {cfg?.label}
                      </span>
                      <span className="text-gray-800 font-semibold">
                        {count}
                      </span>
                    </div>

                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-500 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopDashboard;