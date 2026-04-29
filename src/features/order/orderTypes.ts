export type OrderStatus =
    | "PENDING"
    | "CONFIRMED"
    | "PREPARING"
    | "READY"
    | "PICKED_UP"
    | "OUT_FOR_DELIVERY"
    | "DELIVERED"
    | "CANCELLED";

export type PaymentMethod = "COD" | "ONLINE" | "WALLET";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export interface OrderItem {
    _id: string;
    product: string | { _id: string; name: string; images: string[] };
    variantId?: string | null;
    quantity: number;
    snapshot: {
        name: string;
        image?: string;
        price: number;
        originalPrice?: number;
        variantName?: string;
        unit?: string;
    };
}

export interface Order {
    _id: string;
    customer: { _id: string; fullName: string; phone: string } | string;
    shop: string | { _id: string; name: string; logo?: string };
    items: OrderItem[];
    status: OrderStatus;
    cancellation?: {
        cancelledBy: string;
        reason: string;
        cancelledAt: string;
    };
    deliveryAddress: {
        addressLine: string;
        city: string;
        state: string;
        pinCode: string;
    };
    pricing: {
        subtotal: number;
        deliveryFee: number;
        platformFee: number;
        discount: number;
        total: number;
    };
    payment: {
        method: PaymentMethod;
        status: PaymentStatus;
        transactionId?: string;
        paidAt?: string;
    };
    statusTimeline: {
        placedAt?: string;
        confirmedAt?: string;
        preparingAt?: string;
        readyAt?: string;
        pickedUpAt?: string;
        outForDeliveryAt?: string;
        deliveredAt?: string;
        cancelledAt?: string;
    };
    customerNote?: string;
    isReviewed: boolean;
    createdAt: string;
}

export interface ShopStats {
    period: string;
    totalOrders: number;
    totalRevenue: number;
    avgOrderValue: number;
    activeOrders: Record<OrderStatus, number>;
}

export interface OrderState {
    orders: Order[];
    activeOrder: Order | null;
    stats: ShopStats | null;
    total: number;
    page: number;
    totalPages: number;
    status: "idle" | "loading" | "success" | "failed";
    error: string | null;
}