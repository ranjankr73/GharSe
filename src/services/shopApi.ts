import api from "./axiosInstance";
import type { Address, BusinessDetails } from "../features/shop/shopTypes";

export const createShopApi = async (data: { name: string; phone: string }) => {
    const res = await api.post("/shops", data);
    return res.data;
};

export const getMyShopsApi = async () => {
    const res = await api.get("/shops/my-shops");
    return res.data;
};

export const getMyShopByIdApi = async (shopId: string) => {
    const res = await api.get(`/shops/my-shops/${shopId}`);
    return res.data;
};

export const updateShopProfileApi = async (
    shopId: string,
    data: { name?: string; tagline?: string; phone?: string; logo?: string; coverImage?: string }
) => {
    const res = await api.patch(`/shops/${shopId}/profile`, data);
    return res.data;
};

export const updateShopAddressApi = async (shopId: string, data: Address) => {
    const res = await api.patch(`/shops/${shopId}/address`, data);
    return res.data;
};

export const updateDeliverySettingsApi = async (
    shopId: string,
    data: { deliveryTime?: number; deliveryFee?: number; minOrder?: number }
) => {
    const res = await api.patch(`/shops/${shopId}/delivery-settings`, data);
    return res.data;
};

export const updateBusinessDetailsApi = async (
    shopId: string,
    data: BusinessDetails
) => {
    const res = await api.patch(`/shops/${shopId}/business-details`, data);
    return res.data;
};

export const toggleShopStatusApi = async (shopId: string) => {
    const res = await api.patch(`/shops/${shopId}/toggle-status`);
    return res.data;
};