export interface CartItemSnapshot {
    name: string;
    image?: string | null;
    price: number;
    originalPrice?: number;
    variantName?: string | null;
    unit?: string | null;
}

export interface CartItem {
    _id: string;
    product: string | { _id: string; name: string; images: string[]; isAvailable: boolean; isActive: boolean };
    variantId?: string | null;
    quantity: number;
    snapshot: CartItemSnapshot;
}

export interface Cart {
    _id: string;
    user: string;
    shop: string | {
        _id: string;
        name: string;
        logo?: string;
        deliveryFee?: number;
        minOrder?: number;
        isOpen: boolean;
        isActive: boolean;
        isVerified: boolean;
    } | null;
    items: CartItem[];
    subtotal: number;
    totalItems: number;
}

export interface CartState {
    cart: Cart | null;
    status: "idle" | "loading" | "success" | "failed";
    error: string | null;
}