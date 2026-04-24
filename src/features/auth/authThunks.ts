import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { UserRole } from "./authTypes";
import {
    registerUserApi,
    loginUserApi,
    getCurrentUserApi,
    rotateTokenApi,
    logoutUserApi,
    logoutAllDevicesApi,
} from "../../services/authApi";
import { setToken } from "../../utils/tokenManager";

export const initializeAuth = createAsyncThunk(
    "auth/initialize",
    async (_, { rejectWithValue }) => {
        try {
            const rotateResponse = await rotateTokenApi();
            setToken(rotateResponse.token);

            const userResponse = await getCurrentUserApi();
            return {
                token: rotateResponse.token,
                user: userResponse.user,
            };
        } catch (error) {
            return rejectWithValue(null);
        }
    },
);

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (
        data: {
            fullName: string;
            email: string;
            password: string;
            role: UserRole;
        },
        { rejectWithValue },
    ) => {
        try {
            const response = await registerUserApi(data);
            setToken(response.token);

            return {
                user: response.user,
                token: response.token,
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
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
            setToken(response.token);

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

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            await logoutUserApi();
            setToken(null);
        } catch (error) {
            if (axios.isAxiosError(error)) {
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
            setToken(null);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message);
            }

            return rejectWithValue("Unknown error");
        }
    },
);
