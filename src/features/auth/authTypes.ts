export type UserRole = "admin" | "customer" | "shopOwner";

export interface BaseUser {
    id: string;
    fullName: string;
    email: string;
    role: UserRole;
}

export interface Admin extends BaseUser {
    role: "admin";
}

export interface Customer extends BaseUser {
    role: "customer";
}

export interface ShopOwner extends BaseUser {
    role: "shopOwner";
}

export type User = Admin | Customer | ShopOwner;

export interface AuthState {
    user: User | null;
    token: string | null;
    status: "idle" | "loading" | "success" | "failed";
    error: string | null;
    isAuthenticated: boolean;
    isInitialized: boolean;
}
