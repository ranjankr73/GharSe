import React from 'react';
import { useNavigate } from 'react-router';
import type { Order } from '../../types';
import StatusBadge from '../ui/StatusBadge';
import { formatCurrency, formatTimeAgo } from '../../utils';

interface OrderCardProps {
  order: Order;
  showActions?: boolean;
  onReorder?: (order: Order) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, showActions = true, onReorder }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-100">
        <div>
          <span className="font-mono text-xs font-medium text-slate-500">#{order.id}</span>
          <p className="text-xs text-slate-400 mt-0.5">{formatTimeAgo(order.createdAt)}</p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      {/* Items */}
      <div className="px-4 py-3">
        <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Items</p>
        <div className="space-y-1">
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between items-center">
              <span className="text-sm text-slate-700">{item.productName} <span className="text-slate-400">×{item.quantity}</span></span>
              <span className="text-sm font-semibold text-slate-800">{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center">
          <span className="text-xs text-slate-500">Delivery fee</span>
          <span className="text-xs text-slate-500">{formatCurrency(order.deliveryFee)}</span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="font-semibold text-slate-800 text-sm">Total</span>
          <span className="font-display font-bold text-slate-900">{formatCurrency(order.totalAmount + order.deliveryFee)}</span>
        </div>
      </div>

      {/* Actions */}
      {showActions && (
        <div className="px-4 pb-4 flex gap-2">
          <button
            onClick={() => navigate(`/track/${order.id}`)}
            className="flex-1 py-2 rounded-xl bg-brand-50 text-brand-700 text-sm font-semibold hover:bg-brand-100 transition-colors"
          >
            Track Order
          </button>
          {onReorder && (
            <button
              onClick={() => onReorder(order)}
              className="flex-1 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
            >
              Reorder
            </button>
          )}
        </div>
      )}
    </div>
  );
};