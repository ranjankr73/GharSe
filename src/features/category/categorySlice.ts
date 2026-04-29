import { createSlice } from "@reduxjs/toolkit";
import type { CategoryState } from "./categoryTypes";
import {
    getCategories,
    getShopSubCategories,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory,
} from "./categoryThunks";

const initialState: CategoryState = {
    categories: [],
    subCategories: [],
    status: "idle",
    error: null,
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => { state.status = "loading"; })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.status = "success";
                state.categories = action.payload.categories;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })

            .addCase(getShopSubCategories.fulfilled, (state, action) => {
                state.status = "success";
                state.subCategories = action.payload.subCategories;
            })

            .addCase(createSubCategory.pending, (state) => { state.status = "loading"; })
            .addCase(createSubCategory.fulfilled, (state) => { state.status = "success"; })
            .addCase(createSubCategory.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })

            .addCase(updateSubCategory.pending, (state) => { state.status = "loading"; })
            .addCase(updateSubCategory.fulfilled, (state) => { state.status = "success"; })
            .addCase(updateSubCategory.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })

            .addCase(deleteSubCategory.pending, (state) => { state.status = "loading"; })
            .addCase(deleteSubCategory.fulfilled, (state) => { state.status = "success"; })
            .addCase(deleteSubCategory.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    },
});

export default categorySlice.reducer;