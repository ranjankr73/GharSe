import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
    getMyProductsApi,
    createProductApi,
    updateProductApi,
    toggleProductAvailabilityApi,
    deleteProductApi,
} from "../../services/productApi";

export const getMyProducts = createAsyncThunk(
    "product/getMyProducts",
    async (
        { shopId, params }: { shopId: string; params?: Record<string, string | number> },
        { rejectWithValue }
    ) => {
        try {
            return await getMyProductsApi(shopId, params);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const createProduct = createAsyncThunk(
    "product/create",
    async (
        { shopId, data }: { shopId: string; data: Record<string, unknown> },
        { rejectWithValue }
    ) => {
        try {
            return await createProductApi(shopId, data);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const updateProduct = createAsyncThunk(
    "product/update",
    async (
        {
            shopId,
            productId,
            data,
        }: { shopId: string; productId: string; data: Record<string, unknown> },
        { rejectWithValue }
    ) => {
        try {
            return await updateProductApi(shopId, productId, data);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const toggleProductAvailability = createAsyncThunk(
    "product/toggleAvailability",
    async (
        { shopId, productId }: { shopId: string; productId: string },
        { rejectWithValue }
    ) => {
        try {
            return await toggleProductAvailabilityApi(shopId, productId);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "product/delete",
    async (
        { shopId, productId }: { shopId: string; productId: string },
        { rejectWithValue }
    ) => {
        try {
            return await deleteProductApi(shopId, productId);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);