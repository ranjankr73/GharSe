import React from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectCartItems, selectCartTotal, clearCart } from '../../redux/slices/cartSlice';
import CartItem from '../../components/customer/CartItem';
import { CustomerNav } from '../../components/layout';
import { EmptyState, Button } from '../../components/ui';
import { formatCurrency } from '../../utils';
import { useAppSelector as useShopSelector } from '../../hooks';
import toast from 'react-hot-toast';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const shop = useShopSelector((s) => s.shop.shop);
  const deliveryFee = shop?.deliveryFee ?? 20;
  const minOrder = shop?.minOrder ?? 100;

  const isMinMet = total >= minOrder;

  const handleClear = () => {
    dispatch(clearCart());
    toast('Cart cleared', { icon: '🗑️' });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 pb-20">
        <header className="bg-white px-4 py-4 border-b border-slate-100 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors">←</button>
          <h1 className="font-display font-bold text-slate-900 text-lg">Your Cart</h1>
        </header>
        <EmptyState
          icon="🛒"
          title="Your cart is empty"
          description="Add items from the shop to get started."
          action={<Button onClick={() => navigate('/shop/shop-001')} variant="primary">Browse Shop</Button>}
        />
        <CustomerNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-36">
      {/* Header */}
      <header className="bg-white px-4 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors">←</button>
          <h1 className="font-display font-bold text-slate-900 text-lg">Your Cart</h1>
        </div>
        <button onClick={handleClear} className="text-xs text-red-400 font-semibold hover:text-red-600 transition-colors">Clear all</button>
      </header>

      <div className="max-w-lg mx-auto px-4 mt-4 space-y-3">
        {/* Items */}
        {items.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}

        {/* Bill Summary */}
        <div className="bg-white rounded-2xl shadow-card p-4 mt-4">
          <h3 className="font-semibold text-slate-800 text-sm mb-3">Bill Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Subtotal ({items.length} item{items.length > 1 ? 's' : ''})</span>
              <span className="font-semibold text-slate-800">{formatCurrency(total)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Delivery fee</span>
              <span className="font-semibold text-slate-800">{formatCurrency(deliveryFee)}</span>
            </div>
            <div className="border-t border-dashed border-slate-200 pt-2 flex justify-between">
              <span className="font-bold text-slate-900">Total</span>
              <span className="font-display font-bold text-slate-900 text-lg">{formatCurrency(total + deliveryFee)}</span>
            </div>
          </div>
        </div>

        {/* Min order warning */}
        {!isMinMet && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
            <span className="text-amber-500 text-lg shrink-0">⚠️</span>
            <div>
              <p className="text-amber-800 font-semibold text-sm">Minimum order not met</p>
              <p className="text-amber-600 text-xs mt-0.5">
                Add {formatCurrency(minOrder - total)} more to proceed. Minimum order is {formatCurrency(minOrder)}.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Button */}
      <div className="fixed bottom-16 left-0 right-0 px-4 pb-4 bg-linear-to-t from-slate-50 via-slate-50/95 to-transparent pt-6 z-20">
        <div className="max-w-lg mx-auto">
          <Button
            onClick={() => navigate('/checkout')}
            variant="primary"
            size="lg"
            fullWidth
            disabled={!isMinMet}
          >
            Proceed to Checkout →
          </Button>
          {isMinMet && (
            <p className="text-center text-xs text-slate-400 mt-2">
              Estimated delivery: {shop?.deliveryTime ?? '30–45 min'}
            </p>
          )}
        </div>
      </div>

      <CustomerNav />
    </div>
  );
};

export default CartPage;