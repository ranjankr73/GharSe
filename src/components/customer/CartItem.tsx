import React from "react";
import { useAppDispatch } from "../../hooks";
import {
  removeItem,
  updateQuantity,
} from "../../redux/slices/cartSlice";
import type { CartItem as CartItemType } from "../../types";
import { formatCurrency } from "../../utils";
import toast from "react-hot-toast";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const { product, quantity } = item;

  const handleRemove = () => {
    dispatch(removeItem(product.id));
    toast(`${product.name} removed`, { duration: 1200 });
  };

  const handleQtyChange = (newQty: number) => {
    if (newQty <= 0) {
      handleRemove();
    } else {
      dispatch(
        updateQuantity({
          productId: product.id,
          quantity: newQty,
        })
      );
    }
  };

  return (
    <div className="flex gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
      
      {/* IMAGE */}
      <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0 my-auto">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        
        {/* TOP */}
        <div className="flex items-start justify-between gap-2">
          
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
            {product.name}
          </h3>

          <button
            onClick={handleRemove}
            className="
              w-7 h-7 flex items-center justify-center rounded-full
              text-gray-400 hover:text-red-500 hover:bg-red-50
              transition cursor-pointer
            "
          >
            ✕
          </button>
        </div>

        {/* PRICE */}
        <p className="text-sm font-semibold text-red-500 mt-1">
          {formatCurrency(product.price)}
        </p>

        {/* BOTTOM */}
        <div className="flex items-center justify-between mt-2">
          
          {/* QTY CONTROL */}
          <div className="flex items-center gap-2 bg-red-50 rounded-xl px-2 py-1">
            
            <button
              onClick={() => handleQtyChange(quantity - 1)}
              className="
                w-7 h-7 rounded-lg bg-red-500 text-white
                flex items-center justify-center
                active:scale-90 transition cursor-pointer
              "
            >
              −
            </button>

            <span className="w-5 text-center text-sm font-semibold text-red-600">
              {quantity}
            </span>

            <button
              onClick={() => handleQtyChange(quantity + 1)}
              className="
                w-7 h-7 rounded-lg bg-red-500 text-white
                flex items-center justify-center
                active:scale-90 transition cursor-pointer
              "
            >
              +
            </button>
          </div>

          {/* SUBTOTAL */}
          <span className="text-sm font-semibold text-gray-900">
            {formatCurrency(product.price * quantity)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;