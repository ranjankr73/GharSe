import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { OrderStatus } from "./orderTypes";
import {
    getShopOrdersApi,
    getShopOrderByIdApi,
    updateOrderStatusApi,
    getShopStatsApi,
} from "../../services/orderApi";

export const getShopOrders = createAsyncThunk(
    "order/getShopOrders",
    async (
        { shopId, params }: { shopId: string; params?: Record<string, string | number> },
        { rejectWithValue }
    ) => {
        try {
            return await getShopOrdersApi(shopId, params);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const getShopOrderById = createAsyncThunk(
    "order/getById",
    async (
        { shopId, orderId }: { shopId: string; orderId: string },
        { rejectWithValue }
    ) => {
        try {
            return await getShopOrderByIdApi(shopId, orderId);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const updateOrderStatus = createAsyncThunk(
    "order/updateStatus",
    async (
        {
            shopId,
            orderId,
            status,
            reason,
        }: { shopId: string; orderId: string; status: OrderStatus; reason?: string },
        { rejectWithValue }
    ) => {
        try {
            return await updateOrderStatusApi(shopId, orderId, { status, reason });
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const getShopStats = createAsyncThunk(
    "order/getStats",
    async (
        { shopId, period }: { shopId: string; period?: string },
        { rejectWithValue }
    ) => {
        try {
            return await getShopStatsApi(shopId, period);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);