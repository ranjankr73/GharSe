import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  addItem,
  removeItem,
  updateQuantity,
  selectItemQuantity,
} from "../../redux/slices/cartSlice";
import type { Product } from "../../types";
import { formatCurrency } from "../../utils";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const quantity = useAppSelector((s) =>
    selectItemQuantity(s, product.id)
  );
  const [imgError, setImgError] = useState(false);

  const handleAdd = () => {
    if (!product.inStock) return;
    dispatch(addItem(product));
    toast.success(`${product.name} added`, { duration: 1200 });
  };

  const handleIncrease = () =>
    dispatch(
      updateQuantity({
        productId: product.id,
        quantity: quantity + 1,
      })
    );

  const handleDecrease = () => {
    if (quantity === 1) {
      dispatch(removeItem(product.id));
      toast(`${product.name} removed`, { duration: 1200 });
    } else {
      dispatch(
        updateQuantity({
          productId: product.id,
          quantity: quantity - 1,
        })
      );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col overflow-hidden">
      
      {/* IMAGE */}
      <div className="relative h-40 bg-gray-100 overflow-hidden">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            🍔
          </div>
        )}

        {/* Veg / Non-veg */}
        {product.isVeg !== undefined && (
          <div className="absolute top-2 left-2">
            <div
              className={`w-5 h-5 rounded-sm border flex items-center justify-center bg-white
                ${
                  product.isVeg
                    ? "border-green-600"
                    : "border-red-500"
                }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  product.isVeg
                    ? "bg-green-600"
                    : "bg-red-500"
                }`}
              />
            </div>
          </div>
        )}

        {/* Out of stock */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              Out of stock
            </span>
          </div>
        )}

        {/* Rating */}
        {product.rating && (
          <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-0.5 text-xs font-medium shadow-sm">
            ⭐ {product.rating}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-1">
        
        {/* Name */}
        <h3 className="text-sm font-medium text-gray-800 line-clamp-1">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
          {product.description}
        </p>

        {/* Bottom */}
        <div className="flex items-center justify-between mt-auto pt-3">
          
          {/* Price */}
          <span className="text-base font-semibold text-gray-900">
            {formatCurrency(product.price)}
          </span>

          {/* Actions */}
          {quantity > 0 ? (
            <div className="flex items-center gap-2 bg-red-50 rounded-xl px-2 py-1">
              
              <button
                onClick={handleDecrease}
                className="w-7 h-7 rounded-lg bg-red-500 text-white text-sm flex items-center justify-center active:scale-90"
              >
                −
              </button>

              <span className="text-sm font-semibold text-red-600 w-5 text-center">
                {quantity}
              </span>

              <button
                onClick={handleIncrease}
                className="w-7 h-7 rounded-lg bg-red-500 text-white text-sm flex items-center justify-center active:scale-90"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              className={`
                text-xs font-semibold px-4 py-2 rounded-xl
                transition active:scale-95
                ${
                  product.inStock
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }
              `}
            >
              {product.inStock ? "Add" : "Unavailable"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;