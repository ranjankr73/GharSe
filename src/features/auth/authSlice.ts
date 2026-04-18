import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "./authTypes";
import {
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser,
    logoutAllDevices
} from "./authThunks";

const initialState: AuthState = {
    user: null,
    token: null,
    status: "idle",
    error: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        clearAuth: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // REGISTER
            .addCase(registerUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = "success";
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            // LOGIN
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "success";
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            // GET CURRENT USER
            .addCase(getCurrentUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.status = "success";
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.status = "failed";
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.error = action.payload as string;
            })
            // LOGOUT
            .addCase(logoutUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.status = "success";
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.rejected, (state) => {
                state.status = "failed";
                state.error = "Logout failed! Try again";
            })
            // LOGOUT ALL DEVICES
            .addCase(logoutAllDevices.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(logoutAllDevices.fulfilled, (state) => {
                state.status = "success";
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutAllDevices.rejected, (state) => {
                state.status = "failed";
                state.error = "Logout failed! Try again";
            });
    },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
