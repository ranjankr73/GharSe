export type UserRole = "admin" | "customer" | "partner" | "rider";

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

export interface Partner extends BaseUser {
    role: "partner";
}

export interface Rider extends BaseUser {
    role: "rider";
}

export type User = Admin | Customer | Partner | Rider;

export interface AuthState {
    user: User | null;
    token: string | null;
    status: "idle" | "loading" | "success" | "failed";
    error: string | null;
    isAuthenticated: boolean;
    isInitialized: boolean;
}
