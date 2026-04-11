import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addItem, removeItem, updateQuantity, selectItemQuantity } from '../../redux/slices/cartSlice';
import type { Product } from '../../types';
import { formatCurrency } from '../../utils';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const quantity = useAppSelector((s) => selectItemQuantity(s, product.id));
  const [imgError, setImgError] = useState(false);

  const handleAdd = () => {
    if (!product.inStock) return;
    dispatch(addItem(product));
    toast.success(`${product.name} added to cart`, { duration: 1500, icon: '🛒' });
  };

  const handleIncrease = () => dispatch(updateQuantity({ productId: product.id, quantity: quantity + 1 }));
  const handleDecrease = () => {
    if (quantity === 1) {
      dispatch(removeItem(product.id));
      toast(`${product.name} removed`, { icon: '🗑️', duration: 1500 });
    } else {
      dispatch(updateQuantity({ productId: product.id, quantity: quantity - 1 }));
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group animate-fade-up flex flex-col">
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-slate-100">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">🛒</div>
        )}
        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1.5">
          {product.isVeg !== undefined && (
            <span className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center text-xs
              ${product.isVeg ? 'border-green-600 bg-white' : 'border-red-600 bg-white'}`}>
              <span className={`w-2.5 h-2.5 rounded-full ${product.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
            </span>
          )}
          {!product.inStock && (
            <span className="bg-slate-800/80 text-white text-xs font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm">
              Out of stock
            </span>
          )}
        </div>
        {product.rating && (
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center gap-1">
            <span className="text-amber-400 text-xs">★</span>
            <span className="text-xs font-bold text-slate-700">{product.rating}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-1">
        <h3 className="font-semibold text-slate-900 text-sm leading-snug line-clamp-1">{product.name}</h3>
        <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 flex-1">{product.description}</p>

        <div className="flex items-center justify-between pt-3 mt-auto">
          <span className="font-display font-bold text-slate-900 text-base">{formatCurrency(product.price)}</span>

          {quantity > 0 ? (
            <div className="flex items-center gap-2 bg-brand-50 rounded-xl p-0.5">
              <button
                onClick={handleDecrease}
                className="w-7 h-7 bg-brand-500 text-white rounded-lg font-bold text-base flex items-center justify-center hover:bg-brand-600 active:scale-90 transition-all"
              >−</button>
              <span className="w-5 text-center font-bold text-brand-700 text-sm">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="w-7 h-7 bg-brand-500 text-white rounded-lg font-bold text-base flex items-center justify-center hover:bg-brand-600 active:scale-90 transition-all"
              >+</button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              className={`text-xs font-bold px-4 py-2 rounded-xl transition-all duration-150 active:scale-95
                ${product.inStock
                  ? 'bg-brand-500 text-white hover:bg-brand-600 shadow-brand hover:shadow-lg'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
            >
              {product.inStock ? '+ Add' : 'Unavailable'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;