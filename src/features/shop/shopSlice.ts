import { createSlice } from "@reduxjs/toolkit";
import type { ShopState } from "./shopTypes";
import {
    createShop,
    getMyShops,
    getMyShopById,
    updateShopProfile,
    updateShopAddress,
    updateDeliverySettings,
    updateBusinessDetails,
    toggleShopStatus,
} from "./shopThunks";

const initialState: ShopState = {
    shops: [],
    activeShop: null,
    status: "idle",
    error: null,
};

const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {
        setActiveShop: (state, action) => {
            state.activeShop = action.payload;
        },
        clearShopError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        const handlePending = (state: ShopState) => {
            state.status = "loading";
            state.error = null;
        };
        const handleRejected = (state: ShopState, action: { payload: unknown }) => {
            state.status = "failed";
            state.error = action.payload as string;
        };

        builder
            // CREATE
            .addCase(createShop.pending, handlePending)
            .addCase(createShop.fulfilled, (state, action) => {
                state.status = "success";
                state.shops.unshift(action.payload.shop);
                state.activeShop = action.payload.shop;
            })
            .addCase(createShop.rejected, handleRejected)

            // GET ALL
            .addCase(getMyShops.pending, handlePending)
            .addCase(getMyShops.fulfilled, (state, action) => {
                state.status = "success";
                state.shops = action.payload.shops;
                if (!state.activeShop && action.payload.shops.length > 0) {
                    state.activeShop = action.payload.shops[0];
                }
            })
            .addCase(getMyShops.rejected, handleRejected)

            // GET BY ID
            .addCase(getMyShopById.pending, handlePending)
            .addCase(getMyShopById.fulfilled, (state, action) => {
                state.status = "success";
                state.activeShop = action.payload.shop;
            })
            .addCase(getMyShopById.rejected, handleRejected)

            // UPDATE PROFILE
            .addCase(updateShopProfile.pending, handlePending)
            .addCase(updateShopProfile.fulfilled, (state, action) => {
                state.status = "success";
                state.activeShop = action.payload.shop;
                state.shops = state.shops.map((s) =>
                    s._id === action.payload.shop._id ? action.payload.shop : s
                );
            })
            .addCase(updateShopProfile.rejected, handleRejected)

            // UPDATE ADDRESS
            .addCase(updateShopAddress.pending, handlePending)
            .addCase(updateShopAddress.fulfilled, (state, action) => {
                state.status = "success";
                state.activeShop = action.payload.shop;
                state.shops = state.shops.map((s) =>
                    s._id === action.payload.shop._id ? action.payload.shop : s
                );
            })
            .addCase(updateShopAddress.rejected, handleRejected)

            // UPDATE DELIVERY
            .addCase(updateDeliverySettings.pending, handlePending)
            .addCase(updateDeliverySettings.fulfilled, (state, action) => {
                state.status = "success";
                state.activeShop = action.payload.shop;
                state.shops = state.shops.map((s) =>
                    s._id === action.payload.shop._id ? action.payload.shop : s
                );
            })
            .addCase(updateDeliverySettings.rejected, handleRejected)

            // UPDATE BUSINESS
            .addCase(updateBusinessDetails.pending, handlePending)
            .addCase(updateBusinessDetails.fulfilled, (state, action) => {
                state.status = "success";
                state.activeShop = action.payload.shop;
                state.shops = state.shops.map((s) =>
                    s._id === action.payload.shop._id ? action.payload.shop : s
                );
            })
            .addCase(updateBusinessDetails.rejected, handleRejected)

            // TOGGLE STATUS
            .addCase(toggleShopStatus.pending, handlePending)
            .addCase(toggleShopStatus.fulfilled, (state, action) => {
                state.status = "success";
                if (state.activeShop) {
                    state.activeShop.isOpen = action.payload.isOpen;
                }
            })
            .addCase(toggleShopStatus.rejected, handleRejected);
    },
});

export const { setActiveShop, clearShopError } = shopSlice.actions;
export default shopSlice.reducer;