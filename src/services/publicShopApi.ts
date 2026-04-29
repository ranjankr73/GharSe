// services/publicShopApi.ts
import api from "./axiosInstance";

export const getPublicShopsApi = async (
    params?: Record<string, string | number>
) => {
    const res = await api.get("/shops/public", { params });
    return res.data;
};

export const getPublicShopByIdApi = async (shopId: string) => {
    const res = await api.get(`/shops/public/${shopId}`);
    return res.data;
};

export const getPublicShopProductsApi = async (
    shopId: string,
    params?: Record<string, string | number>
) => {
    const res = await api.get(`/products/public/shops/${shopId}`, { params });
    return res.data;
};

export const getPublicProductByIdApi = async (productId: string) => {
    const res = await api.get(`/products/public/${productId}`);
    return res.data;
};