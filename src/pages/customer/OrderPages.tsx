import React, { useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOrder } from '../../redux/slices/orderSlice';
import { CustomerNav } from '../../components/layout';
import StepTracker from '../../components/ui/StepTracker';
import Skeleton from '../../components/ui/Skeleton';
import StatusBadge from '../../components/ui/StatusBadge';
import { formatCurrency, formatDate } from '../../utils';
import type { Order } from '../../types';

// ─── Order Success Page ───────────────────────────────────────────────────────
export const OrderSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order as Order | undefined;

  useEffect(() => {
    if (!order) navigate('/shop/shop-001');
  }, [order, navigate]);

  if (!order) return null;

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-brand-50 flex flex-col items-center justify-center px-4 py-10">
      {/* Success animation */}
      <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-5xl shadow-xl mb-6 animate-bounce-soft">
        🎉
      </div>

      <h1 className="font-display font-bold text-3xl text-slate-900 text-center">Order Placed!</h1>
      <p className="text-slate-500 text-center mt-2 max-w-xs">
        Your order has been sent to {order.shopId.replace('shop-001', 'Fresh Basket')}. Hang tight!
      </p>

      {/* Order details card */}
      <div className="w-full max-w-sm mt-8 bg-white rounded-3xl shadow-card-hover overflow-hidden">
        <div className="bg-slate-900 px-5 py-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-400 text-xs">Order ID</p>
              <p className="font-mono font-bold text-white text-lg">#{order.id}</p>
            </div>
            <StatusBadge status={order.status} />
          </div>
        </div>
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-xl">👤</span>
            <div>
              <p className="text-slate-400 text-xs">Customer</p>
              <p className="font-semibold text-slate-800">{order.customerName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-xl">📍</span>
            <div>
              <p className="text-slate-400 text-xs">Delivery to</p>
              <p className="font-semibold text-slate-800 text-sm">{order.address}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-xl">🕐</span>
            <div>
              <p className="text-slate-400 text-xs">Estimated delivery</p>
              <p className="font-semibold text-slate-800">{order.estimatedDelivery ?? '30–45 min'}</p>
            </div>
          </div>
          <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
            <span className="text-sm font-semibold text-slate-600">Total paid</span>
            <span className="font-display font-bold text-brand-600 text-lg">
              {formatCurrency(order.totalAmount + order.deliveryFee)}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="w-full max-w-sm mt-5 space-y-3">
        <button
          onClick={() => navigate(`/track/${order.id}`)}
          className="w-full bg-brand-500 text-white font-bold py-4 rounded-2xl shadow-brand hover:bg-brand-600 transition-all active:scale-95"
        >
          Track Your Order 🛵
        </button>
        <button
          onClick={() => navigate('/shop/shop-001')}
          className="w-full bg-white text-slate-700 font-semibold py-4 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

// ─── Order Tracking Page ──────────────────────────────────────────────────────
export const OrderTrackingPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentOrder, loading, error } = useAppSelector((s) => s.orders);

  useEffect(() => {
    if (orderId) dispatch(fetchOrder(orderId));
  }, [dispatch, orderId]);

  // Auto-refresh every 30s
  useEffect(() => {
    if (!orderId) return;
    const interval = setInterval(() => dispatch(fetchOrder(orderId)), 30000);
    return () => clearInterval(interval);
  }, [dispatch, orderId]);

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <header className="bg-white px-4 py-4 border-b border-slate-100 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600">←</button>
        <div>
          <h1 className="font-display font-bold text-slate-900 text-lg">Track Order</h1>
          {currentOrder && <p className="text-xs text-slate-400 font-mono">#{currentOrder.id}</p>}
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 mt-5 space-y-4">
        {loading && !currentOrder ? (
          <div className="space-y-4">
            <Skeleton />
            <Skeleton />
          </div>
        ) : error ? (
          <div className="bg-red-50 rounded-2xl p-6 text-center">
            <p className="text-red-600 font-semibold">Order not found</p>
            <p className="text-red-400 text-sm mt-1">{error}</p>
            <button onClick={() => navigate('/orders')} className="mt-4 text-brand-500 font-semibold">View All Orders</button>
          </div>
        ) : currentOrder ? (
          <>
            {/* Status card */}
            <div className="bg-white rounded-2xl shadow-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-slate-800">Order Status</h2>
                <StatusBadge status={currentOrder.status} />
              </div>
              <StepTracker status={currentOrder.status} />
            </div>

            {/* Delivery info */}
            <div className="bg-white rounded-2xl shadow-card p-5">
              <h2 className="font-semibold text-slate-800 mb-3">Delivery Info</h2>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="text-slate-400 w-24 shrink-0">Name</span>
                  <span className="font-semibold text-slate-800">{currentOrder.customerName}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-400 w-24 shrink-0">Phone</span>
                  <span className="font-semibold text-slate-800">{currentOrder.phone}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-400 w-24 shrink-0">Address</span>
                  <span className="font-semibold text-slate-800">{currentOrder.address}</span>
                </div>
                {currentOrder.note && (
                  <div className="flex gap-2">
                    <span className="text-slate-400 w-24 shrink-0">Note</span>
                    <span className="text-slate-600 italic">{currentOrder.note}</span>
                  </div>
                )}
                <div className="flex gap-2">
                  <span className="text-slate-400 w-24 shrink-0">Placed at</span>
                  <span className="font-semibold text-slate-800">{formatDate(currentOrder.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="bg-white rounded-2xl shadow-card p-5">
              <h2 className="font-semibold text-slate-800 mb-3">Items Ordered</h2>
              <div className="space-y-2">
                {currentOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="text-slate-700">{item.productName} <span className="text-slate-400">×{item.quantity}</span></span>
                    <span className="font-semibold text-slate-800">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t border-dashed border-slate-200 pt-2 flex justify-between">
                  <span className="text-slate-500 text-sm">Delivery fee</span>
                  <span className="text-sm font-semibold text-slate-800">{formatCurrency(currentOrder.deliveryFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-900">Total</span>
                  <span className="font-display font-bold text-brand-600">{formatCurrency(currentOrder.totalAmount + currentOrder.deliveryFee)}</span>
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-slate-400 pb-4">Auto-refreshes every 30 seconds</p>
          </>
        ) : null}
      </div>

      <CustomerNav />
    </div>
  );
};