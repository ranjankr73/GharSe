// services/adminApi.ts
import api from "./axiosInstance";

// ── Shops ─────────────────────────────────────────────────
export const adminGetAllShopsApi = async (
    params?: Record<string, string | number>
) => {
    const res = await api.get("/shops/admin", { params });
    return res.data;
};

export const adminGetShopByIdApi = async (shopId: string) => {
    const res = await api.get(`/shops/admin/${shopId}`);
    return res.data;
};

export const adminVerifyShopApi = async (
    shopId: string,
    isVerified: boolean
) => {
    const res = await api.patch(`/shops/admin/${shopId}/verify`, { isVerified });
    return res.data;
};

export const adminToggleShopActiveApi = async (shopId: string) => {
    const res = await api.patch(`/shops/admin/${shopId}/toggle-active`);
    return res.data;
};

export const adminDeleteShopApi = async (shopId: string) => {
    const res = await api.delete(`/shops/admin/${shopId}`);
    return res.data;
};

// ── Orders ────────────────────────────────────────────────
export const adminGetAllOrdersApi = async (
    params?: Record<string, string | number>
) => {
    const res = await api.get("/orders/admin", { params });
    return res.data;
};

export const adminCancelOrderApi = async (orderId: string, reason?: string) => {
    const res = await api.patch(`/orders/admin/${orderId}/cancel`, { reason });
    return res.data;
};

// ── Products ──────────────────────────────────────────────
export const adminGetAllProductsApi = async (
    params?: Record<string, string | number>
) => {
    const res = await api.get("/products/admin", { params });
    return res.data;
};

export const adminToggleProductActiveApi = async (productId: string) => {
    const res = await api.patch(`/products/admin/${productId}/toggle-active`);
    return res.data;
};

// ── Categories ────────────────────────────────────────────
export const adminGetAllCategoriesApi = async () => {
    const res = await api.get("/categories/admin/all");
    return res.data;
};

export const adminCreateCategoryApi = async (data: {
    name: string;
    description?: string;
    image?: string;
    displayOrder?: number;
}) => {
    const res = await api.post("/categories", data);
    return res.data;
};

export const adminUpdateCategoryApi = async (
    categoryId: string,
    data: {
        name?: string;
        description?: string;
        image?: string;
        displayOrder?: number;
        isActive?: boolean;
    }
) => {
    const res = await api.patch(`/categories/${categoryId}`, data);
    return res.data;
};

export const adminDeleteCategoryApi = async (categoryId: string) => {
    const res = await api.delete(`/categories/${categoryId}`);
    return res.data;
};