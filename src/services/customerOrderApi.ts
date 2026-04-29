import api from "./axiosInstance";

export const placeOrderApi = async (data: {
    deliveryAddress: {
        addressLine: string;
        city: string;
        state: string;
        pinCode: string;
    };
    paymentMethod: string;
    customerNote?: string;
}) => {
    const res = await api.post("/orders", data);
    return res.data;
};

export const getMyOrdersApi = async (
    params?: Record<string, string | number>
) => {
    const res = await api.get("/orders/my", { params });
    return res.data;
};

export const getMyOrderByIdApi = async (orderId: string) => {
    const res = await api.get(`/orders/my/${orderId}`);
    return res.data;
};

export const cancelMyOrderApi = async (orderId: string, reason?: string) => {
    const res = await api.post(`/orders/my/${orderId}/cancel`, { reason });
    return res.data;
};

export const submitReviewApi = async (data: {
    orderId: string;
    rating: number;
    comment?: string;
    images?: string[];
    productId?: string;
}) => {
    const res = await api.post("/reviews", data);
    return res.data;
};