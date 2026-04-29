export interface Variant {
    _id: string;
    name: string;
    price: number;
    discountPrice?: number | null;
    stock: number;
    isAvailable: boolean;
}

export interface Product {
    _id: string;
    name: string;
    description?: string;
    images: string[];
    shop: string;
    category: { _id: string; name: string; slug: string };
    subCategory?: { _id: string; name: string } | null;
    price?: number | null;
    discountPrice?: number | null;
    unit?: string;
    variants: Variant[];
    stock: number;
    lowStockThreshold: number;
    isAvailable: boolean;
    isActive: boolean;
    isFeatured: boolean;
    rating: number;
    totalReviews: number;
    createdAt: string;
}

export interface ProductState {
    products: Product[];
    activeProduct: Product | null;
    totalProducts: number;
    page: number;
    totalPages: number;
    status: "idle" | "loading" | "success" | "failed";
    error: string | null;
}