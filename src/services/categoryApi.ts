import api from "./axiosInstance";

export const getCategoriesApi = async () => {
    const res = await api.get("/categories");
    return res.data;
};

export const getShopSubCategoriesApi = async (shopId: string) => {
    const res = await api.get(`/categories/shops/${shopId}/subcategories`);
    return res.data;
};

export const createSubCategoryApi = async (
    shopId: string,
    data: { name: string; categoryId: string; description?: string; image?: string }
) => {
    const res = await api.post(`/categories/shops/${shopId}/subcategories`, data);
    return res.data;
};

export const updateSubCategoryApi = async (
    shopId: string,
    subCategoryId: string,
    data: Record<string, unknown>
) => {
    const res = await api.patch(
        `/categories/shops/${shopId}/subcategories/${subCategoryId}`,
        data
    );
    return res.data;
};

export const deleteSubCategoryApi = async (shopId: string, subCategoryId: string) => {
    const res = await api.delete(
        `/categories/shops/${shopId}/subcategories/${subCategoryId}`
    );
    return res.data;
};