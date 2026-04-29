import type { Order } from "../order/orderTypes";

export interface CustomerOrderState {
    orders: Order[];
    activeOrder: Order | null;
    total: number;
    page: number;
    totalPages: number;
    status: "idle" | "loading" | "success" | "failed";
    error: string | null;
}