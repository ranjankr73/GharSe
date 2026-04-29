import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
    placeOrderApi,
    getMyOrdersApi,
    getMyOrderByIdApi,
    cancelMyOrderApi,
    submitReviewApi,
} from "../../services/customerOrderApi";

export const placeOrder = createAsyncThunk(
    "customerOrder/place",
    async (
        data: {
            deliveryAddress: {
                addressLine: string;
                city: string;
                state: string;
                pinCode: string;
            };
            paymentMethod: string;
            customerNote?: string;
        },
        { rejectWithValue }
    ) => {
        try {
            return await placeOrderApi(data);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const getMyOrders = createAsyncThunk(
    "customerOrder/getAll",
    async (
        data: {
            params?: Record<string, string | number>
        },
        { rejectWithValue }
    ) => {
        try {
            return await getMyOrdersApi(data.params);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const getMyOrderById = createAsyncThunk(
    "customerOrder/getById",
    async (orderId: string, { rejectWithValue }) => {
        try {
            return await getMyOrderByIdApi(orderId);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const cancelMyOrder = createAsyncThunk(
    "customerOrder/cancel",
    async (
        { orderId, reason }: { orderId: string; reason?: string },
        { rejectWithValue }
    ) => {
        try {
            return await cancelMyOrderApi(orderId, reason);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const submitReview = createAsyncThunk(
    "customerOrder/review",
    async (
        data: {
            orderId: string;
            rating: number;
            comment?: string;
            productId?: string;
        },
        { rejectWithValue }
    ) => {
        try {
            return await submitReviewApi(data);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);