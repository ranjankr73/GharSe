import { createSlice } from "@reduxjs/toolkit";
import type { CustomerOrderState } from "./customerOrderTypes";
import {
    placeOrder,
    getMyOrders,
    getMyOrderById,
    cancelMyOrder,
    submitReview,
} from "./customerOrderThunks";

const initialState: CustomerOrderState = {
    orders: [],
    activeOrder: null,
    total: 0,
    page: 1,
    totalPages: 1,
    status: "idle",
    error: null,
};

const customerOrderSlice = createSlice({
    name: "customerOrder",
    initialState,
    reducers: {
        clearActiveOrder: (state) => {
            state.activeOrder = null;
        },
        // Called from socket — update order status live
        updateOrderFromSocket: (state, action) => {
            const updated = action.payload;
            state.orders = state.orders.map((o) =>
                o._id === updated.orderId
                    ? { ...o, status: updated.status }
                    : o
            );
            if (state.activeOrder?._id === updated.orderId) {
                state.activeOrder = {
                    ...state.activeOrder!,
                    status: updated.status,
                };
            }
        },
    },
    extraReducers: (builder) => {
        const handlePending = (state: CustomerOrderState) => {
            state.status = "loading";
            state.error = null;
        };
        const handleRejected = (
            state: CustomerOrderState,
            action: { payload: unknown }
        ) => {
            state.status = "failed";
            state.error = action.payload as string;
        };

        builder
            .addCase(placeOrder.pending, handlePending)
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.status = "success";
                state.activeOrder = action.payload.order;
            })
            .addCase(placeOrder.rejected, handleRejected)

            .addCase(getMyOrders.pending, handlePending)
            .addCase(getMyOrders.fulfilled, (state, action) => {
                state.status = "success";
                state.orders = action.payload.orders;
                state.total = action.payload.totalOrders;
                state.page = action.payload.page;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(getMyOrders.rejected, handleRejected)

            .addCase(getMyOrderById.pending, handlePending)
            .addCase(getMyOrderById.fulfilled, (state, action) => {
                state.status = "success";
                state.activeOrder = action.payload.order;
            })
            .addCase(getMyOrderById.rejected, handleRejected)

            .addCase(cancelMyOrder.pending, handlePending)
            .addCase(cancelMyOrder.fulfilled, (state, action) => {
                state.status = "success";
                const updated = action.payload.order;
                state.orders = state.orders.map((o) =>
                    o._id === updated._id ? updated : o
                );
                if (state.activeOrder?._id === updated._id) {
                    state.activeOrder = updated;
                }
            })
            .addCase(cancelMyOrder.rejected, handleRejected)

            .addCase(submitReview.pending, handlePending)
            .addCase(submitReview.fulfilled, (state) => {
                state.status = "success";
                // Mark order as reviewed
                if (state.activeOrder) {
                    state.activeOrder = {
                        ...state.activeOrder,
                        isReviewed: true,
                    };
                }
            })
            .addCase(submitReview.rejected, handleRejected);
    },
});

export const { clearActiveOrder, updateOrderFromSocket } =
    customerOrderSlice.actions;
export default customerOrderSlice.reducer;