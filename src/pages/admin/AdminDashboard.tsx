import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOrders } from '../../redux/slices/orderSlice';
import { AdminLayout } from '../../components/layout';
import { StatCard, StatusBadge } from '../../components/ui';
import { formatCurrency, formatTimeAgo, ORDER_STATUS_CONFIG } from '../../utils';

const AdminDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { orders, loading } = useAppSelector((s) => s.orders);
  const shop = useAppSelector((s) => s.shop.shop);

  useEffect(() => {
    dispatch(fetchOrders('shop-001'));
  }, [dispatch]);

  const totalRevenue = orders
    .filter((o) => o.status === 'delivered')
    .reduce((sum, o) => sum + o.totalAmount + o.deliveryFee, 0);

  const pendingCount = orders.filter((o) => o.status === 'pending').length;
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
    <AdminLayout title="Dashboard">
      {/* Welcome banner */}
      <div className="bg-linear-to-r from-brand-500 to-brand-600 rounded-2xl p-6 text-white mb-6 shadow-brand">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-brand-100 text-sm font-semibold">Welcome back 👋</p>
            <h2 className="font-display font-bold text-2xl mt-1">
              {shop?.name ?? 'Fresh Basket'}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <span className={`w-2 h-2 rounded-full ${shop?.isOpen ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
              <span className="text-sm text-brand-100">{shop?.isOpen ? 'Shop is open' : 'Shop is closed'}</span>
            </div>
          </div>
          <div className="text-5xl opacity-90">🏪</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Orders" value={String(orders.length)} icon="📦" color="bg-blue-50" />
        <StatCard label="Revenue" value={formatCurrency(totalRevenue)} icon="💰" color="bg-green-50" trend="+12% this week" />
        <StatCard label="Pending" value={String(pendingCount)} icon="⏳" color="bg-amber-50" />
        <StatCard label="Today" value={String(todayOrders)} icon="📅" color="bg-purple-50" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h3 className="font-display font-bold text-slate-900">Recent Orders</h3>
              <button onClick={() => navigate('/admin/orders')} className="text-xs text-brand-500 font-bold hover:underline">View all</button>
            </div>
            {loading ? (
              <div className="p-5 space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-14 bg-slate-100 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : recentOrders.length === 0 ? (
              <div className="py-10 text-center text-slate-400 text-sm">No orders yet</div>
            ) : (
              <div className="divide-y divide-slate-50">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 cursor-pointer transition-colors"
                    onClick={() => navigate('/admin/orders')}
                  >
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{order.customerName}</p>
                      <p className="text-xs text-slate-400 font-mono">#{order.id} · {formatTimeAgo(order.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-900 text-sm">{formatCurrency(order.totalAmount + order.deliveryFee)}</span>
                      <StatusBadge status={order.status} size="sm" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Order distribution */}
        <div className="bg-white rounded-2xl shadow-card p-5">
          <h3 className="font-display font-bold text-slate-900 mb-4">Status Breakdown</h3>
          <div className="space-y-3">
            {statusDistribution.map(([status, count]) => {
              const cfg = ORDER_STATUS_CONFIG[status as keyof typeof ORDER_STATUS_CONFIG];
              const pct = orders.length ? Math.round((count / orders.length) * 100) : 0;
              return (
                <div key={status}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-semibold ${cfg?.color ?? 'text-slate-500'}`}>{cfg?.label ?? status}</span>
                    <span className="text-xs font-bold text-slate-700">{count}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${cfg?.bg.replace('bg-', 'bg-').replace('-100', '-400') ?? 'bg-slate-400'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
            {statusDistribution.length === 0 && (
              <p className="text-slate-400 text-sm text-center py-4">No data yet</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;