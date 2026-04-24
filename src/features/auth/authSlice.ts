import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "./authTypes";
import {
    initializeAuth,
    registerUser,
    loginUser,
    logoutUser,
    logoutAllDevices,
} from "./authThunks";

const initialState: AuthState = {
    user: null,
    token: null,
    status: "idle",
    error: null,
    isAuthenticated: false,
    isInitialized: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // INITIALIZE
            .addCase(initializeAuth.pending, (state) => {
                state.status = "loading";
                state.isInitialized = false;
            })
            .addCase(initializeAuth.fulfilled, (state, action) => {
                state.status = "success";
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.isInitialized = true;
            })
            .addCase(initializeAuth.rejected, (state) => {
                state.status = "idle";
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.isInitialized = true;
            })
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
                state.isInitialized = true;
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
                state.isInitialized = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            // LOGOUT
            .addCase(logoutUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.status = "idle";
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
                state.status = "idle";
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

export default authSlice.reducer;
