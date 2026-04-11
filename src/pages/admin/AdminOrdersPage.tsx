import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOrders, updateOrderStatus } from '../../redux/slices/orderSlice';
import { AdminLayout } from '../../components/layout';
import { StatusBadge } from '../../components/ui';
import { formatCurrency, formatTimeAgo } from '../../utils';
import type { Order, OrderStatus } from '../../types';
import toast from 'react-hot-toast';

const STATUS_ACTIONS: { status: OrderStatus; label: string; color: string }[] = [
  { status: 'accepted', label: '✅ Accept', color: 'bg-green-500 text-white hover:bg-green-600' },
  { status: 'preparing', label: '👨‍🍳 Preparing', color: 'bg-purple-500 text-white hover:bg-purple-600' },
  { status: 'out_for_delivery', label: '🛵 Out for Delivery', color: 'bg-orange-500 text-white hover:bg-orange-600' },
  { status: 'delivered', label: '🎉 Delivered', color: 'bg-blue-500 text-white hover:bg-blue-600' },
  { status: 'rejected', label: '❌ Reject', color: 'bg-red-500 text-white hover:bg-red-600' },
];

const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus[]>> = {
  pending: ['accepted', 'rejected'],
  accepted: ['preparing'],
  preparing: ['out_for_delivery'],
  out_for_delivery: ['delivered'],
};

const AdminOrdersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { orders, loading } = useAppSelector((s) => s.orders);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchOrders('shop-001'));
  }, [dispatch]);

  const filtered = filterStatus === 'all' ? orders : orders.filter((o) => o.status === filterStatus);

  const handleStatusUpdate = async (order: Order, newStatus: OrderStatus) => {
    setUpdatingId(order.id);
    try {
      await dispatch(updateOrderStatus({ orderId: order.id, status: newStatus })).unwrap();
      toast.success(`Order #${order.id} → ${newStatus.replace('_', ' ')}`);
    } catch {
      toast.error('Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const filterTabs: Array<{ value: OrderStatus | 'all'; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: '⏳ Pending' },
    { value: 'accepted', label: '✅ Accepted' },
    { value: 'preparing', label: '👨‍🍳 Preparing' },
    { value: 'out_for_delivery', label: '🛵 On the way' },
    { value: 'delivered', label: '🎉 Delivered' },
    { value: 'rejected', label: '❌ Rejected' },
  ];

  return (
    <AdminLayout title="Orders">
      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilterStatus(tab.value)}
            className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all
              ${filterStatus === tab.value
                ? 'bg-brand-500 text-white shadow-brand'
                : 'bg-white text-slate-600 shadow-card hover:shadow-card-hover'
              }`}
          >
            {tab.label}
            {tab.value !== 'all' && (
              <span className="ml-1.5 bg-white/20 px-1.5 rounded-full">
                {orders.filter(o => tab.value === 'all' || o.status === tab.value).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Orders list */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 bg-white rounded-2xl shadow-card animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-card py-16 text-center">
          <div className="text-5xl mb-3">📭</div>
          <p className="font-bold text-slate-700">No orders</p>
          <p className="text-slate-400 text-sm mt-1">No orders match this filter</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => {
            const isExpanded = expandedId === order.id;
            const nextActions = NEXT_STATUS[order.status] ?? [];
            const availableActions = STATUS_ACTIONS.filter((a) => nextActions.includes(a.status));

            return (
              <div key={order.id} className="bg-white rounded-2xl shadow-card overflow-hidden animate-fade-in">
                {/* Order row */}
                <div
                  className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : order.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs text-slate-400">#{order.id}</span>
                      <StatusBadge status={order.status} size="sm" />
                    </div>
                    <p className="font-semibold text-slate-900 text-sm mt-0.5">{order.customerName}</p>
                    <p className="text-xs text-slate-400 truncate">{order.address}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-display font-bold text-slate-900">{formatCurrency(order.totalAmount + order.deliveryFee)}</p>
                    <p className="text-xs text-slate-400">{formatTimeAgo(order.createdAt)}</p>
                  </div>
                  <span className={`text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>▾</span>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="border-t border-slate-100 px-5 py-4 animate-fade-in space-y-4">
                    {/* Items */}
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Items</p>
                      <div className="space-y-1.5">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-slate-700">{item.productName} <span className="text-slate-400">×{item.quantity}</span></span>
                            <span className="font-semibold text-slate-800">{formatCurrency(item.price * item.quantity)}</span>
                          </div>
                        ))}
                        <div className="flex justify-between text-sm border-t border-dashed border-slate-200 pt-2">
                          <span className="text-slate-500">Delivery fee</span>
                          <span className="font-semibold text-slate-800">{formatCurrency(order.deliveryFee)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 rounded-xl p-3">
                        <p className="text-xs text-slate-400 mb-0.5">Phone</p>
                        <p className="font-semibold text-slate-800 text-sm">{order.phone}</p>
                      </div>
                      {order.note && (
                        <div className="bg-amber-50 rounded-xl p-3">
                          <p className="text-xs text-amber-600 mb-0.5">Note</p>
                          <p className="font-semibold text-amber-800 text-sm">{order.note}</p>
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    {availableActions.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {availableActions.map((action) => (
                          <button
                            key={action.status}
                            onClick={() => handleStatusUpdate(order, action.status)}
                            disabled={updatingId === order.id}
                            className={`flex-1 min-w-0 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 disabled:opacity-50 ${action.color}`}
                          >
                            {updatingId === order.id ? '...' : action.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {(order.status === 'delivered' || order.status === 'rejected') && (
                      <p className="text-center text-xs text-slate-400 italic pt-1">
                        {order.status === 'delivered' ? '✅ Order completed' : '❌ Order was rejected'}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminOrdersPage;