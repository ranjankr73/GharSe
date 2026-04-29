export interface PublicShop {
    _id: string;
    name: string;
    tagline?: string;
    phone: string;
    logo?: string;
    coverImage?: string;
    address?: {
        addressLine?: string;
        city?: string;
        state?: string;
        pinCode?: string;
    };
    deliveryTime?: number;
    deliveryFee?: number;
    minOrder?: number;
    isOpen: boolean;
    rating: number;
    totalReviews: number;
    createdAt: string;
}

export interface PublicShopState {
    shops: PublicShop[];
    activeShop: PublicShop | null;
    total: number;
    page: number;
    totalPages: number;
    status: "idle" | "loading" | "success" | "failed";
    error: string | null;
}