import { createSlice } from "@reduxjs/toolkit";
import type { AdminState } from "./adminTypes";
import {
    adminGetAllShops,
    adminGetShopById,
    adminVerifyShop,
    adminToggleShopActive,
    adminDeleteShop,
    adminGetAllOrders,
    adminCancelOrder,
    adminGetAllProducts,
    adminToggleProductActive,
    adminGetAllCategories,
    adminCreateCategory,
    adminUpdateCategory,
    adminDeleteCategory,
} from "./adminThunks";

const initialState: AdminState = {
    shops: [],
    activeShop: null,
    orders: [],
    products: [],
    categories: [],
    stats: null,
    total: 0,
    page: 1,
    totalPages: 1,
    status: "idle",
    error: null,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        clearAdminError: (state) => {
            state.error = null;
        },
        clearActiveShop: (state) => {
            state.activeShop = null;
        },
    },
    extraReducers: (builder) => {
        const handlePending = (state: AdminState) => {
            state.status = "loading";
            state.error = null;
        };
        const handleRejected = (
            state: AdminState,
            action: { payload: unknown }
        ) => {
            state.status = "failed";
            state.error = action.payload as string;
        };

        builder
            // ── SHOPS ────────────────────────────────────
            .addCase(adminGetAllShops.pending, handlePending)
            .addCase(adminGetAllShops.fulfilled, (state, action) => {
                state.status = "success";
                state.shops = action.payload.shops;
                state.total = action.payload.totalShops;
                state.page = action.payload.page;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(adminGetAllShops.rejected, handleRejected)

            .addCase(adminGetShopById.pending, handlePending)
            .addCase(adminGetShopById.fulfilled, (state, action) => {
                state.status = "success";
                state.activeShop = action.payload.shop;
            })
            .addCase(adminGetShopById.rejected, handleRejected)

            .addCase(adminVerifyShop.pending, handlePending)
            .addCase(adminVerifyShop.fulfilled, (state, action) => {
                state.status = "success";
                const updated = action.payload.shop;
                state.shops = state.shops.map((s) =>
                    s._id === updated._id ? updated : s
                );
                if (state.activeShop?._id === updated._id) {
                    state.activeShop = updated;
                }
            })
            .addCase(adminVerifyShop.rejected, handleRejected)

            .addCase(adminToggleShopActive.pending, handlePending)
            .addCase(adminToggleShopActive.fulfilled, (state, action) => {
                state.status = "success";
                const { isActive } = action.payload;
                const shopId = action.meta.arg;
                state.shops = state.shops.map((s) =>
                    s._id === shopId ? { ...s, isActive } : s
                );
                if (state.activeShop?._id === shopId) {
                    state.activeShop = { ...state.activeShop, isActive };
                }
            })
            .addCase(adminToggleShopActive.rejected, handleRejected)

            .addCase(adminDeleteShop.pending, handlePending)
            .addCase(adminDeleteShop.fulfilled, (state) => {
                state.status = "success";
                const shopId = state.activeShop?._id;
                if (shopId) {
                    state.shops = state.shops.filter((s) => s._id !== shopId);
                    state.activeShop = null;
                }
            })
            .addCase(adminDeleteShop.rejected, handleRejected)

            // ── ORDERS ───────────────────────────────────
            .addCase(adminGetAllOrders.pending, handlePending)
            .addCase(adminGetAllOrders.fulfilled, (state, action) => {
                state.status = "success";
                state.orders = action.payload.orders;
                state.total = action.payload.totalOrders;
                state.page = action.payload.page;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(adminGetAllOrders.rejected, handleRejected)

            .addCase(adminCancelOrder.pending, handlePending)
            .addCase(adminCancelOrder.fulfilled, (state, action) => {
                state.status = "success";
                const updated = action.payload.order;
                state.orders = state.orders.map((o) =>
                    o._id === updated._id ? updated : o
                );
            })
            .addCase(adminCancelOrder.rejected, handleRejected)

            // ── PRODUCTS ─────────────────────────────────
            .addCase(adminGetAllProducts.pending, handlePending)
            .addCase(adminGetAllProducts.fulfilled, (state, action) => {
                state.status = "success";
                state.products = action.payload.products;
                state.total = action.payload.totalProducts;
                state.page = action.payload.page;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(adminGetAllProducts.rejected, handleRejected)

            .addCase(adminToggleProductActive.pending, handlePending)
            .addCase(adminToggleProductActive.fulfilled, (state, action) => {
                state.status = "success";
                const productId = action.meta.arg;
                const { isActive } = action.payload;
                state.products = state.products.map((p) =>
                    p._id === productId ? { ...p, isActive } : p
                );
            })
            .addCase(adminToggleProductActive.rejected, handleRejected)

            // ── CATEGORIES ───────────────────────────────
            .addCase(adminGetAllCategories.pending, handlePending)
            .addCase(adminGetAllCategories.fulfilled, (state, action) => {
                state.status = "success";
                state.categories = action.payload.categories;
            })
            .addCase(adminGetAllCategories.rejected, handleRejected)

            .addCase(adminCreateCategory.pending, handlePending)
            .addCase(adminCreateCategory.fulfilled, (state, action) => {
                state.status = "success";
                state.categories.unshift(action.payload.category);
            })
            .addCase(adminCreateCategory.rejected, handleRejected)

            .addCase(adminUpdateCategory.pending, handlePending)
            .addCase(adminUpdateCategory.fulfilled, (state, action) => {
                state.status = "success";
                const updated = action.payload.category;
                state.categories = state.categories.map((c) =>
                    c._id === updated._id ? updated : c
                );
            })
            .addCase(adminUpdateCategory.rejected, handleRejected)

            .addCase(adminDeleteCategory.pending, handlePending)
            .addCase(adminDeleteCategory.fulfilled, (state) => {
                state.status = "success";
            })
            .addCase(adminDeleteCategory.rejected, handleRejected);
    },
});

export const { clearAdminError, clearActiveShop } = adminSlice.actions;
export default adminSlice.reducer;