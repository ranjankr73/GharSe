// features/product/productSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { ProductState } from "./productTypes";
import {
    getMyProducts,
    createProduct,
    updateProduct,
    toggleProductAvailability,
    deleteProduct,
} from "./productThunks";

const initialState: ProductState = {
    products: [],
    activeProduct: null,
    total: 0,
    page: 1,
    totalPages: 1,
    status: "idle",
    error: null,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMyProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getMyProducts.fulfilled, (state, action) => {
                state.status = "success";
                state.products = action.payload.products;
                state.total = action.payload.totalProducts;
                state.page = action.payload.page;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(getMyProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })

            .addCase(createProduct.pending, (state) => { state.status = "loading"; })
            .addCase(createProduct.fulfilled, (state) => { state.status = "success"; })
            .addCase(createProduct.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })

            .addCase(updateProduct.pending, (state) => { state.status = "loading"; })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.status = "success";
                state.products = state.products.map((p) =>
                    p._id === action.payload.product._id ? action.payload.product : p
                );
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })

            .addCase(toggleProductAvailability.fulfilled, (state, action) => {
                state.products = state.products.map((p) =>
                    p._id === action.payload.product?._id
                        ? { ...p, isAvailable: action.payload.isAvailable }
                        : p
                );
            })

            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.status = "success";
            });
    },
});

export default productSlice.reducer;