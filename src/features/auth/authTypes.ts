export type UserRole = "admin" | "customer" | "shop";

export interface BaseUser {
    id: string;
    fullName: string;
    email: string;
    role: UserRole;
}

export interface Admin extends BaseUser {
    role: "admin";
    permissions?: string[];
}

export interface Customer extends BaseUser {
    role: "customer";
    phone?: string;
    addresses?: string[];
}

export interface Shop extends BaseUser {
    role: "shop";
    shopName: string;
    isOpen: boolean;
    deliveryFee: number;
}

export type User = Admin | Customer | Shop;

export interface AuthState {
    user: User | null;
    token: string | null;
    status: "idle" | "loading" | "success" | "failed";
    error: string | null;
    isAuthenticated: boolean;
}
