import React from 'react';
import { useAppDispatch } from '../../hooks';
import { removeItem, updateQuantity } from '../../redux/slices/cartSlice';
import type { CartItem as CartItemType } from '../../types';
import { formatCurrency } from '../../utils';
import toast from 'react-hot-toast';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const { product, quantity } = item;

  const handleRemove = () => {
    dispatch(removeItem(product.id));
    toast(`${product.name} removed`, { icon: '🗑️', duration: 1500 });
  };

  const handleQtyChange = (newQty: number) => {
    dispatch(updateQuantity({ productId: product.id, quantity: newQty }));
  };

  return (
    <div className="flex gap-4 p-4 bg-white rounded-2xl shadow-card animate-fade-in">
      {/* Image */}
      <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2">{product.name}</h3>
          <button
            onClick={handleRemove}
            className="w-6 h-6 shrink-0 flex items-center justify-center rounded-full hover:bg-red-50 text-slate-300 hover:text-red-400 transition-colors"
            aria-label="Remove item"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-brand-600 font-bold text-sm mt-0.5">{formatCurrency(product.price)}</p>

        <div className="flex items-center justify-between mt-2">
          {/* Qty controls */}
          <div className="flex items-center gap-2 bg-slate-50 rounded-xl p-0.5 border border-slate-100">
            <button
              onClick={() => handleQtyChange(quantity - 1)}
              className="w-7 h-7 bg-white rounded-lg text-slate-600 font-bold flex items-center justify-center hover:bg-brand-50 hover:text-brand-600 shadow-sm transition-all active:scale-90"
            >−</button>
            <span className="w-5 text-center font-bold text-slate-800 text-sm">{quantity}</span>
            <button
              onClick={() => handleQtyChange(quantity + 1)}
              className="w-7 h-7 bg-white rounded-lg text-slate-600 font-bold flex items-center justify-center hover:bg-brand-50 hover:text-brand-600 shadow-sm transition-all active:scale-90"
            >+</button>
          </div>

          {/* Subtotal */}
          <span className="font-display font-bold text-slate-900 text-sm">
            {formatCurrency(product.price * quantity)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;