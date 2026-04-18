import api from "./axiosInstance";

export const registerUserApi = async (data: {
    fullName: string;
    email: string;
    password: string;
    role: string;
}) => {
    const response = await api.post("/auth/register", data);
    return response.data;
};

export const loginUserApi = async (data: {
    email: string;
    password: string;
}) => {
    const response = await api.post("/auth/login", data);
    return response.data;
};

export const getCurrentUserApi = async () => {
    const response = await api.get("/auth/get-me");
    return response.data;
};

export const logoutUserApi = async () => {
    const response = await api.post("/auth/logout", {});
    return response.data;
};

export const logoutAllDevicesApi = async () => {
    const response = await api.post("/auth/logout-all", {});
    return response.data;
};
