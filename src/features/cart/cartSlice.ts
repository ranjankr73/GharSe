// features/cart/cartSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { CartState } from "./cartTypes";
import {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
} from "./cartThunks";

const initialState: CartState = {
    cart: null,
    status: "idle",
    error: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCartError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        const handlePending = (state: CartState) => {
            state.status = "loading";
            state.error = null;
        };
        const handleRejected = (
            state: CartState,
            action: { payload: unknown }
        ) => {
            state.status = "failed";
            state.error = action.payload as string;
        };
        const updateCart = (state: CartState, action: { payload: { cart: CartState["cart"] } }) => {
            state.status = "success";
            state.cart = action.payload.cart;
        };

        builder
            .addCase(getCart.pending, handlePending)
            .addCase(getCart.fulfilled, (state, action) => {
                state.status = "success";
                state.cart = action.payload.cart;
            })
            .addCase(getCart.rejected, handleRejected)

            .addCase(addToCart.pending, handlePending)
            .addCase(addToCart.fulfilled, updateCart)
            .addCase(addToCart.rejected, handleRejected)

            .addCase(updateCartItem.pending, handlePending)
            .addCase(updateCartItem.fulfilled, updateCart)
            .addCase(updateCartItem.rejected, handleRejected)

            .addCase(removeCartItem.pending, handlePending)
            .addCase(removeCartItem.fulfilled, updateCart)
            .addCase(removeCartItem.rejected, handleRejected)

            .addCase(clearCart.pending, handlePending)
            .addCase(clearCart.fulfilled, (state) => {
                state.status = "success";
                state.cart = null;
            })
            .addCase(clearCart.rejected, handleRejected);
    },
});

export const { clearCartError } = cartSlice.actions;
export default cartSlice.reducer;