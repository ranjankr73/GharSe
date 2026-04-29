import api from "./axiosInstance";
import type { OrderStatus } from "../features/order/orderTypes";

export const getShopOrdersApi = async (
    shopId: string,
    params?: Record<string, string | number>
) => {
    const res = await api.get(`/orders/shop/${shopId}`, { params });
    return res.data;
};

export const getShopOrderByIdApi = async (shopId: string, orderId: string) => {
    const res = await api.get(`/orders/shop/${shopId}/${orderId}`);
    return res.data;
};

export const updateOrderStatusApi = async (
    shopId: string,
    orderId: string,
    data: { status: OrderStatus; reason?: string }
) => {
    const res = await api.patch(`/orders/shop/${shopId}/${orderId}/status`, data);
    return res.data;
};

export const getShopStatsApi = async (shopId: string, period?: string) => {
    const res = await api.get(`/orders/shop/${shopId}/stats`, {
        params: { period },
    });
    return res.data;
};