import { createSlice } from "@reduxjs/toolkit";
import type { OrderState } from "./orderTypes";
import {
    getShopOrders,
    getShopOrderById,
    updateOrderStatus,
    getShopStats,
} from "./orderThunks";

const initialState: OrderState = {
    orders: [],
    activeOrder: null,
    stats: null,
    total: 0,
    page: 1,
    totalPages: 1,
    status: "idle",
    error: null,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        clearActiveOrder: (state) => {
            state.activeOrder = null;
        },
        // Called from socket event
        addIncomingOrder: (state, action) => {
            state.orders.unshift(action.payload);
        },
        updateOrderInList: (state, action) => {
            state.orders = state.orders.map((o) =>
                o._id === action.payload._id ? action.payload : o
            );
            if (state.activeOrder?._id === action.payload._id) {
                state.activeOrder = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getShopOrders.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getShopOrders.fulfilled, (state, action) => {
                state.status = "success";
                state.orders = action.payload.orders;
                state.total = action.payload.totalOrders;
                state.page = action.payload.page;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(getShopOrders.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })

            .addCase(getShopOrderById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getShopOrderById.fulfilled, (state, action) => {
                state.status = "success";
                state.activeOrder = action.payload.order;
            })
            .addCase(getShopOrderById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })

            .addCase(updateOrderStatus.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.status = "success";
                state.activeOrder = action.payload.order;
                state.orders = state.orders.map((o) =>
                    o._id === action.payload.order._id ? action.payload.order : o
                );
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })

            .addCase(getShopStats.fulfilled, (state, action) => {
                state.stats = action.payload;
            });
    },
});

export const { clearActiveOrder, addIncomingOrder, updateOrderInList } = orderSlice.actions;
export default orderSlice.reducer;