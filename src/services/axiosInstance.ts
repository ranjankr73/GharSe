import axios from "axios";
import { getToken, setToken } from "../utils/tokenManager";

const api = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    timeout: 5000,
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

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const response = await axios.get("/auth/rotate-token", {
                    baseURL: "http://localhost:3000/api/v1",
                    withCredentials: true,
                    timeout: 5000,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const token = response.data.token;

                setToken(token);

                originalRequest.headers = {
                    ...originalRequest.headers,
                    Authorization: `Bearer ${token}`,
                };

                return api(originalRequest);
            } catch (error) {
                console.log("Rotate token failed");
                setToken(null);
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    },
);

export default api;
