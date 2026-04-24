import axios from "axios";
import { getToken, setToken } from "../utils/tokenManager";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
        const token = getToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (!originalRequest) return Promise.reject(error);

        const is401 = error.response?.status === 401;
        const isRetry = originalRequest._retry;
        const isRotateRequest = originalRequest.url?.includes("rotate-token");

        if (is401 && !isRetry && !isRotateRequest) {
            originalRequest._retry = true;

            try {
                const response = await axios.post(
                    "/auth/rotate-token",
                    {},
                    {
                        baseURL: import.meta.env.VITE_API_BASE_URL,
                        withCredentials: true,
                        timeout: 10000,
                    },
                );

                const newToken = response.data.token;

                setToken(newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                return api(originalRequest);
            } catch (error) {
                setToken(null);
                window.location.href = "/login";
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    },
);

export const uploadApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    timeout: 30000,
});

uploadApi.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error),
);

export default api;
