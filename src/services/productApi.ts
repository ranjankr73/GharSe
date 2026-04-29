import api from "./axiosInstance";

export const getMyProductsApi = async (
    shopId: string,
    params?: Record<string, string | number>
) => {
    const res = await api.get(`/products/shops/${shopId}`, { params });
    return res.data;
};

export const getMyProductByIdApi = async (shopId: string, productId: string) => {
    const res = await api.get(`/products/shops/${shopId}/${productId}`);
    return res.data;
};

export const createProductApi = async (shopId: string, data: Record<string, unknown>) => {
    const res = await api.post(`/products/shops/${shopId}`, data);
    return res.data;
};

export const updateProductApi = async (
    shopId: string,
    productId: string,
    data: Record<string, unknown>
) => {
    const res = await api.patch(`/products/shops/${shopId}/${productId}`, data);
    return res.data;
};

export const toggleProductAvailabilityApi = async (shopId: string, productId: string) => {
    const res = await api.patch(`/products/shops/${shopId}/${productId}/toggle-availability`);
    return res.data;
};

export const updateProductStockApi = async (
    shopId: string,
    productId: string,
    data: { stock: number; variantId?: string }
) => {
    const res = await api.patch(`/products/shops/${shopId}/${productId}/stock`, data);
    return res.data;
};

export const deleteProductApi = async (shopId: string, productId: string) => {
    const res = await api.delete(`/products/shops/${shopId}/${productId}`);
    return res.data;
};