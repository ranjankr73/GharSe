import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
    createShopApi,
    getMyShopsApi,
    getMyShopByIdApi,
    updateShopProfileApi,
    updateShopAddressApi,
    updateDeliverySettingsApi,
    updateBusinessDetailsApi,
    toggleShopStatusApi,
} from "../../services/shopApi";
import type { Address, BusinessDetails } from "./shopTypes";

export const createShop = createAsyncThunk(
    "shop/create",
    async (data: { name: string; phone: string }, { rejectWithValue }) => {
        try {
            return await createShopApi(data);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    },
);

export const getMyShops = createAsyncThunk(
    "shop/getMyShops",
    async (_, { rejectWithValue }) => {
        try {
            return await getMyShopsApi();
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    },
);

export const getMyShopById = createAsyncThunk(
    "shop/getById",
    async (shopId: string, { rejectWithValue }) => {
        try {
            return await getMyShopByIdApi(shopId);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    },
);

export const updateShopProfile = createAsyncThunk(
    "shop/updateProfile",
    async (
        {
            shopId,
            data,
        }: {
            shopId: string;
            data: {
                name?: string;
                tagline?: string;
                phone?: string;
                logo?: string;
                coverImage?: string;
            };
        },
        { rejectWithValue },
    ) => {
        try {
            return await updateShopProfileApi(shopId, data);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    },
);

export const updateShopAddress = createAsyncThunk(
    "shop/updateAddress",
    async (
        { shopId, data }: { shopId: string; data: Address },
        { rejectWithValue },
    ) => {
        try {
            return await updateShopAddressApi(shopId, data);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    },
);

export const updateDeliverySettings = createAsyncThunk(
    "shop/updateDelivery",
    async (
        {
            shopId,
            data,
        }: {
            shopId: string;
            data: {
                deliveryTime?: number;
                deliveryFee?: number;
                minOrder?: number;
            };
        },
        { rejectWithValue },
    ) => {
        try {
            return await updateDeliverySettingsApi(shopId, data);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    },
);

export const updateBusinessDetails = createAsyncThunk(
    "shop/updateBusiness",
    async (
        { shopId, data }: { shopId: string; data: BusinessDetails },
        { rejectWithValue },
    ) => {
        try {
            return await updateBusinessDetailsApi(shopId, data);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    },
);

export const toggleShopStatus = createAsyncThunk(
    "shop/toggleStatus",
    async (shopId: string, { rejectWithValue }) => {
        try {
            return await toggleShopStatusApi(shopId);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    },
);
