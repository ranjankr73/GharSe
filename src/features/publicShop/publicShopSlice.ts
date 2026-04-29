import { createSlice } from "@reduxjs/toolkit";
import type { PublicShopState } from "./publicShopTypes";
import {
    getPublicShops,
    getPublicShopById,
    getPublicShopProducts,
} from "./publicShopThunks";
import type { Product } from "../product/productTypes";

interface ExtendedPublicShopState extends PublicShopState {
    products: Product[];
    totalProducts: number;
}

const initialState: ExtendedPublicShopState = {
    shops: [],
    activeShop: null,
    products: [],
    total: 0,
    totalProducts: 0,
    page: 1,
    totalPages: 1,
    status: "idle",
    error: null,
};

const publicShopSlice = createSlice({
    name: "publicShop",
    initialState,
    reducers: {
        clearActiveShop: (state) => {
            state.activeShop = null;
            state.products = [];
        },
    },
    extraReducers: (builder) => {
        const handlePending = (state: ExtendedPublicShopState) => {
            state.status = "loading";
            state.error = null;
        };
        const handleRejected = (
            state: ExtendedPublicShopState,
            action: { payload: unknown }
        ) => {
            state.status = "failed";
            state.error = action.payload as string;
        };

        builder
            .addCase(getPublicShops.pending, handlePending)
            .addCase(getPublicShops.fulfilled, (state, action) => {
                state.status = "success";
                state.shops = action.payload.shops;
                state.total = action.payload.totalShops;
                state.page = action.payload.page;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(getPublicShops.rejected, handleRejected)

            .addCase(getPublicShopById.pending, handlePending)
            .addCase(getPublicShopById.fulfilled, (state, action) => {
                state.status = "success";
                state.activeShop = action.payload.shop;
            })
            .addCase(getPublicShopById.rejected, handleRejected)

            .addCase(getPublicShopProducts.pending, handlePending)
            .addCase(getPublicShopProducts.fulfilled, (state, action) => {
                state.status = "success";
                state.products = action.payload.products;
                state.totalProducts = action.payload.totalProducts;
            })
            .addCase(getPublicShopProducts.rejected, handleRejected);
    },
});

export const { clearActiveShop } = publicShopSlice.actions;
export default publicShopSlice.reducer;