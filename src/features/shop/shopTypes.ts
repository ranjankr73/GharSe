export interface Address {
    addressLine?: string;
    city?: string;
    state?: string;
    pinCode?: string;
}

export interface BusinessDetails {
    gstNumber?: string;
    panNumber?: string;
    fssaiLicense?: string;
}

export interface BankDetails {
    accountHolderName?: string;
}

export interface Shop {
    _id: string;
    name: string;
    tagline?: string;
    phone: string;
    logo?: string;
    coverImage?: string;
    address?: Address;
    businessDetails?: BusinessDetails;
    bankDetails?: BankDetails;
    deliveryTime?: number;
    deliveryFee?: number;
    minOrder?: number;
    isOpen: boolean;
    isActive: boolean;
    isVerified: boolean;
    onboardingStep: number;
    rating: number;
    totalReviews: number;
    owner: string;
    createdAt: string;
}

export interface ShopState {
    shops: Shop[];
    activeShop: Shop | null;
    status: "idle" | "loading" | "success" | "failed";
    error: string | null;
}