import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
    getCartApi,
    addToCartApi,
    updateCartItemApi,
    removeCartItemApi,
    clearCartApi,
} from "../../services/cartApi";

export const getCart = createAsyncThunk(
    "cart/get",
    async (_, { rejectWithValue }) => {
        try {
            return await getCartApi();
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const addToCart = createAsyncThunk(
    "cart/add",
    async (
        data: { productId: string; variantId?: string; quantity: number },
        { rejectWithValue }
    ) => {
        try {
            return await addToCartApi(data);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const updateCartItem = createAsyncThunk(
    "cart/updateItem",
    async (
        { itemId, quantity }: { itemId: string; quantity: number },
        { rejectWithValue }
    ) => {
        try {
            return await updateCartItemApi(itemId, quantity);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const removeCartItem = createAsyncThunk(
    "cart/removeItem",
    async (itemId: string, { rejectWithValue }) => {
        try {
            return await removeCartItemApi(itemId);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const clearCart = createAsyncThunk(
    "cart/clear",
    async (_, { rejectWithValue }) => {
        try {
            return await clearCartApi();
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);