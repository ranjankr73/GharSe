import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOrders } from '../../redux/slices/orderSlice';
import { addItem } from '../../redux/slices/cartSlice';
import { CustomerNav } from '../../components/layout';
import { OrderCard } from '../../components/customer/OrderCard';
import EmptyState from '../../components/ui/EmptyState';
import Skeleton from '../../components/ui/Skeleton';
import type { Order } from '../../types';
import toast from 'react-hot-toast';

const OrderHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { orders, loading } = useAppSelector((s) => s.orders);
  const products = useAppSelector((s) => s.products.products);

  useEffect(() => {
    dispatch(fetchOrders('shop-001'));
  }, [dispatch]);

  const handleReorder = (order: Order) => {
    let added = 0;
    order.items.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (product && product.inStock) {
        for (let i = 0; i < item.quantity; i++) dispatch(addItem(product));
        added++;
      }
    });
    if (added > 0) {
      toast.success('Items added to cart!', { icon: '🛒' });
      navigate('/cart');
    } else {
      toast.error('Some items are unavailable');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <header className="bg-white px-4 py-4 border-b border-slate-100 sticky top-0 z-10">
        <h1 className="font-display font-bold text-slate-900 text-xl">My Orders</h1>
      </header>

      <div className="max-w-lg mx-auto px-4 mt-5 space-y-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))
        ) : orders.length === 0 ? (
          <EmptyState
            icon="📦"
            title="No orders yet"
            description="Your order history will appear here once you place your first order."
            action={
              <button onClick={() => navigate('/shop/shop-001')} className="bg-brand-500 text-white font-bold px-6 py-3 rounded-2xl shadow-brand hover:bg-brand-600 transition-all">
                Shop Now
              </button>
            }
          />
        ) : (
          <>
            <p className="text-xs text-slate-400 font-semibold">{orders.length} orders</p>
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} onReorder={handleReorder} />
            ))}
          </>
        )}
      </div>

      <CustomerNav />
    </div>
  );
};

export default OrderHistoryPage;