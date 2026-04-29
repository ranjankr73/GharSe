// features/publicShop/publicShopThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
    getPublicShopsApi,
    getPublicShopByIdApi,
    getPublicShopProductsApi,
    getPublicProductByIdApi,
} from "../../services/publicShopApi";

export const getPublicShops = createAsyncThunk(
    "publicShop/getAll",
    async (
        data: {
        params?: Record<string, string | number>,
        },
        { rejectWithValue }
    ) => {
        try {
            return await getPublicShopsApi(data.params);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const getPublicShopById = createAsyncThunk(
    "publicShop/getById",
    async (shopId: string, { rejectWithValue }) => {
        try {
            return await getPublicShopByIdApi(shopId);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const getPublicShopProducts = createAsyncThunk(
    "publicShop/getProducts",
    async (
        {
            shopId,
            params,
        }: { shopId: string; params?: Record<string, string | number> },
        { rejectWithValue }
    ) => {
        try {
            return await getPublicShopProductsApi(shopId, params);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const getPublicProductById = createAsyncThunk(
    "publicShop/getProductById",
    async (productId: string, { rejectWithValue }) => {
        try {
            return await getPublicProductByIdApi(productId);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);