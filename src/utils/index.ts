import type { OrderStatus } from '../types';

export const formatCurrency = (amount: number): string =>
  `₹${amount.toLocaleString('en-IN')}`;

export const formatDate = (iso: string): string =>
  new Date(iso).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

export const formatTimeAgo = (iso: string): string => {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

export const ORDER_STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; color: string; bg: string; step: number }
> = {
  pending:          { label: 'Pending',          color: 'text-amber-700',  bg: 'bg-amber-100',  step: 0 },
  accepted:         { label: 'Accepted',          color: 'text-blue-700',   bg: 'bg-blue-100',   step: 1 },
  preparing:        { label: 'Preparing',         color: 'text-purple-700', bg: 'bg-purple-100', step: 2 },
  out_for_delivery: { label: 'Out for Delivery',  color: 'text-orange-700', bg: 'bg-orange-100', step: 3 },
  delivered:        { label: 'Delivered',         color: 'text-green-700',  bg: 'bg-green-100',  step: 4 },
  rejected:         { label: 'Rejected',          color: 'text-red-700',    bg: 'bg-red-100',    step: -1 },
};

export const STATUS_STEPS: OrderStatus[] = [
  'pending', 'accepted', 'preparing', 'out_for_delivery', 'delivered',
];

export const STATUS_ICONS: Record<OrderStatus, string> = {
  pending: '⏳',
  accepted: '✅',
  preparing: '👨‍🍳',
  out_for_delivery: '🛵',
  delivered: '🎉',
  rejected: '❌',
};

export const validatePhone = (phone: string): boolean => /^[6-9]\d{9}$/.test(phone);
export const validateName = (name: string): boolean => name.trim().length >= 2;
export const validateAddress = (address: string): boolean => address.trim().length >= 10;

export const generateOrderId = (): string =>
  `ORD-${Math.floor(1000 + Math.random() * 9000)}`;