export type UserRole = "admin" | "customer" | "shopOwner" | "deliveryAgent";

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

export interface DeliveryAgent extends BaseUser {
    role: "deliveryAgent";
}

export type User = Admin | Customer | ShopOwner | DeliveryAgent;

export interface AuthState {
    user: User | null;
    token: string | null;
    status: "idle" | "loading" | "success" | "failed";
    error: string | null;
    isAuthenticated: boolean;
    isInitialized: boolean;
}
