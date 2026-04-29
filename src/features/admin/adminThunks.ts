import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
    adminGetAllShopsApi,
    adminGetShopByIdApi,
    adminVerifyShopApi,
    adminToggleShopActiveApi,
    adminDeleteShopApi,
    adminGetAllOrdersApi,
    adminCancelOrderApi,
    adminGetAllProductsApi,
    adminToggleProductActiveApi,
    adminGetAllCategoriesApi,
    adminCreateCategoryApi,
    adminUpdateCategoryApi,
    adminDeleteCategoryApi,
} from "../../services/adminApi";

// ── Shops ─────────────────────────────────────────────────
export const adminGetAllShops = createAsyncThunk(
    "admin/getAllShops",
    async (
        params?: Record<string, string | number>,
        { rejectWithValue } = {}
    ) => {
        try {
            return await adminGetAllShopsApi(params);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const adminGetShopById = createAsyncThunk(
    "admin/getShopById",
    async (shopId: string, { rejectWithValue }) => {
        try {
            return await adminGetShopByIdApi(shopId);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const adminVerifyShop = createAsyncThunk(
    "admin/verifyShop",
    async (
        { shopId, isVerified }: { shopId: string; isVerified: boolean },
        { rejectWithValue }
    ) => {
        try {
            return await adminVerifyShopApi(shopId, isVerified);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const adminToggleShopActive = createAsyncThunk(
    "admin/toggleShopActive",
    async (shopId: string, { rejectWithValue }) => {
        try {
            return await adminToggleShopActiveApi(shopId);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const adminDeleteShop = createAsyncThunk(
    "admin/deleteShop",
    async (shopId: string, { rejectWithValue }) => {
        try {
            return await adminDeleteShopApi(shopId);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

// ── Orders ────────────────────────────────────────────────
export const adminGetAllOrders = createAsyncThunk(
    "admin/getAllOrders",
    async (
        params?: Record<string, string | number>,
        { rejectWithValue } = {}
    ) => {
        try {
            return await adminGetAllOrdersApi(params);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const adminCancelOrder = createAsyncThunk(
    "admin/cancelOrder",
    async (
        { orderId, reason }: { orderId: string; reason?: string },
        { rejectWithValue }
    ) => {
        try {
            return await adminCancelOrderApi(orderId, reason);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

// ── Products ──────────────────────────────────────────────
export const adminGetAllProducts = createAsyncThunk(
    "admin/getAllProducts",
    async (
        params?: Record<string, string | number>,
        { rejectWithValue } = {}
    ) => {
        try {
            return await adminGetAllProductsApi(params);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const adminToggleProductActive = createAsyncThunk(
    "admin/toggleProductActive",
    async (productId: string, { rejectWithValue }) => {
        try {
            return await adminToggleProductActiveApi(productId);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

// ── Categories ────────────────────────────────────────────
export const adminGetAllCategories = createAsyncThunk(
    "admin/getAllCategories",
    async (_, { rejectWithValue }) => {
        try {
            return await adminGetAllCategoriesApi();
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const adminCreateCategory = createAsyncThunk(
    "admin/createCategory",
    async (
        data: {
            name: string;
            description?: string;
            image?: string;
            displayOrder?: number;
        },
        { rejectWithValue }
    ) => {
        try {
            return await adminCreateCategoryApi(data);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const adminUpdateCategory = createAsyncThunk(
    "admin/updateCategory",
    async (
        {
            categoryId,
            data,
        }: {
            categoryId: string;
            data: {
                name?: string;
                description?: string;
                image?: string;
                displayOrder?: number;
                isActive?: boolean;
            };
        },
        { rejectWithValue }
    ) => {
        try {
            return await adminUpdateCategoryApi(categoryId, data);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const adminDeleteCategory = createAsyncThunk(
    "admin/deleteCategory",
    async (categoryId: string, { rejectWithValue }) => {
        try {
            return await adminDeleteCategoryApi(categoryId);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);