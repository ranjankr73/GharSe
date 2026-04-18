import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { UserRole } from "./authTypes";
import { getCurrentUserApi, loginUserApi, logoutAllDevicesApi, logoutUserApi, registerUserApi } from "../../services/authApi";

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (
        data: {
            fullName: string;
            email: string;
            password: string;
            role: UserRole
        },
        { rejectWithValue },
    ) => {
        try {
            const response = await registerUserApi(data);

            return {
                user: response.user,
                token: response.token,
            };
        } catch (error) {
            if(axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data?.message);
            }
            
            return rejectWithValue("Unknown Error");
        }
    },
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (data: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await loginUserApi(data);

            return {
                user: response.user,
                token: response.token,
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message);
            }

            return rejectWithValue("Unknown error");
        }
    },
);

export const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getCurrentUserApi();
            return {
                user: response.user
            }
        } catch (error) {
            if(axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data?.message);
            }

            return rejectWithValue("Unknown error")
        }
    },
);

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            await logoutUserApi();
        } catch (error) {
            if(axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data?.message);
            }

            return rejectWithValue("Unknown error");
        }
    },
);

export const logoutAllDevices = createAsyncThunk(
    "auth/logoutAllDevices",
    async (_, { rejectWithValue }) => {
        try {
            await logoutAllDevicesApi();
        } catch (error) {
            if(axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data?.message);
            }

            return rejectWithValue("Unknown error");
        }
    },
);