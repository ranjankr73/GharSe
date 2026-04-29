import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
    getCategoriesApi,
    getShopSubCategoriesApi,
    createSubCategoryApi,
    updateSubCategoryApi,
    deleteSubCategoryApi,
} from "../../services/categoryApi";

export const getCategories = createAsyncThunk(
    "category/getAll",
    async (_, { rejectWithValue }) => {
        try {
            return await getCategoriesApi();
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const getShopSubCategories = createAsyncThunk(
    "category/getSubCategories",
    async (shopId: string, { rejectWithValue }) => {
        try {
            return await getShopSubCategoriesApi(shopId);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const createSubCategory = createAsyncThunk(
    "category/createSubCategory",
    async (
        {
            shopId,
            data,
        }: {
            shopId: string;
            data: { name: string; categoryId: string; description?: string };
        },
        { rejectWithValue }
    ) => {
        try {
            return await createSubCategoryApi(shopId, data);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const updateSubCategory = createAsyncThunk(
    "category/updateSubCategory",
    async (
        {
            shopId,
            subCategoryId,
            data,
        }: { shopId: string; subCategoryId: string; data: Record<string, unknown> },
        { rejectWithValue }
    ) => {
        try {
            return await updateSubCategoryApi(shopId, subCategoryId, data);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const deleteSubCategory = createAsyncThunk(
    "category/deleteSubCategory",
    async (
        { shopId, subCategoryId }: { shopId: string; subCategoryId: string },
        { rejectWithValue }
    ) => {
        try {
            return await deleteSubCategoryApi(shopId, subCategoryId);
        } catch (error) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error.response?.data?.message);
            return rejectWithValue("Unknown error");
        }
    }
);