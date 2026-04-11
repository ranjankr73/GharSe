import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartState, CartItem, Product } from '../../types';

const initialState: CartState = {
  items: [],
  shopId: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Product>) {
      const product = action.payload;
      if (state.shopId && state.shopId !== product.shopId) {
        // Different shop — clear cart first
        state.items = [];
      }
      state.shopId = product.shopId;
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ product, quantity: 1 });
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.product.id !== action.payload);
      if (state.items.length === 0) state.shopId = null;
    },
    updateQuantity(state, action: PayloadAction<{ productId: string; quantity: number }>) {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((i) => i.product.id !== productId);
        if (state.items.length === 0) state.shopId = null;
      } else {
        const item = state.items.find((i) => i.product.id === productId);
        if (item) item.quantity = quantity;
      }
    },
    clearCart(state) {
      state.items = [];
      state.shopId = null;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: CartState }): CartItem[] => state.cart.items;
export const selectCartCount = (state: { cart: CartState }): number =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectCartTotal = (state: { cart: CartState }): number =>
  state.cart.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
export const selectItemQuantity = (state: { cart: CartState }, productId: string): number =>
  state.cart.items.find((i) => i.product.id === productId)?.quantity ?? 0;

export default cartSlice.reducer;