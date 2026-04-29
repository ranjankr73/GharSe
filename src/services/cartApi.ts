import api from "./axiosInstance";

export const getCartApi = async () => {
    const res = await api.get("/cart");
    return res.data;
};

export const addToCartApi = async (data: {
    productId: string;
    variantId?: string;
    quantity: number;
}) => {
    const res = await api.post("/cart/add", data);
    return res.data;
};

export const updateCartItemApi = async (itemId: string, quantity: number) => {
    const res = await api.patch(`/cart/items/${itemId}`, { quantity });
    return res.data;
};

export const removeCartItemApi = async (itemId: string) => {
    const res = await api.delete(`/cart/items/${itemId}`);
    return res.data;
};

export const clearCartApi = async () => {
    const res = await api.delete("/cart");
    return res.data;
};