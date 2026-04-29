import type { Shop } from "../shop/shopTypes";
import type { Order } from "../order/orderTypes";
import type { Product } from "../product/productTypes";
import type { Category } from "../category/categoryTypes";

export interface AdminShop extends Shop {
    owner: {
        _id: string;
        fullName: string;
        email: string;
        phone?: string;
    };
}

export interface AdminOrder extends Order {
    customer: {
        _id: string;
        fullName: string;
        email: string;
    };
    shop: {
        _id: string;
        name: string;
        logo?: string;
    };
}

export interface AdminProduct extends Product {
    shop: {
        _id: string;
        name: string;
        owner: string;
    };
    category: {
        _id: string;
        name: string;
    };
}

export interface AdminStats {
    totalShops: number;
    verifiedShops: number;
    pendingShops: number;
    totalOrders: number;
    totalRevenue: number;
    totalProducts: number;
    totalCategories: number;
}

export interface AdminState {
    shops: AdminShop[];
    activeShop: AdminShop | null;
    orders: AdminOrder[];
    products: AdminProduct[];
    categories: Category[];
    stats: AdminStats | null;
    total: number;
    page: number;
    totalPages: number;
    status: "idle" | "loading" | "success" | "failed";
    error: string | null;
}