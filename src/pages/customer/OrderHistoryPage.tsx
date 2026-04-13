import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks";

import { fetchOrders } from "../../redux/slices/orderSlice";
import { addItem } from "../../redux/slices/cartSlice";

import CustomerNavbar from "../../components/layout/CustomerNavbar";
import OrderCard from "../../components/customer/OrderCard";
import EmptyState from "../../components/ui/EmptyState";
import Skeleton from "../../components/ui/Skeleton";
import Button from "../../components/ui/Button";

import type { Order } from "../../types";
import toast from "react-hot-toast";

const OrderHistoryPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { orders, loading } = useAppSelector((s) => s.orders);
    const products = useAppSelector((s) => s.products.products);

    useEffect(() => {
        dispatch(fetchOrders("shop-001"));
    }, [dispatch]);

    const handleReorder = (order: Order) => {
        let added = 0;

        order.items.forEach((item) => {
            const product = products.find((p) => p.id === item.productId);

            if (product && product.inStock) {
                for (let i = 0; i < item.quantity; i++) {
                    dispatch(addItem(product));
                }
                added++;
            }
        });

        if (added > 0) {
            toast.success("Items added to cart");
            navigate("/cart");
        } else {
            toast.error("Items unavailable");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-32 md:pt-14">
            {/* 🔥 HEADER */}
            <header className="sticky top-0 md:top-14 z-20 bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-3">
                <button
                    onClick={() => navigate(-1)}
                    className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center cursor-pointer"
                >
                    ←
                </button>

                <h1 className="text-lg font-semibold text-gray-800">
                    My Orders
                </h1>
            </header>

            <div className="max-w-2xl mx-auto px-4 mt-5 space-y-4">
                {/* 🔄 LOADING */}
                {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-32 w-full" />
                    ))
                ) : orders.length === 0 ? (
                    /* 📦 EMPTY */
                    <EmptyState
                        icon="📦"
                        title="No orders yet"
                        description="Once you place your first order, it will appear here."
                        action={
                            <Button onClick={() => navigate("/browse-shops")}>
                                Browse Food 🍔
                            </Button>
                        }
                    />
                ) : (
                    <>
                        {/* COUNT */}
                        <p className="text-xs text-gray-400">
                            {orders.length} order
                            {orders.length > 1 ? "s" : ""}
                        </p>

                        {/* LIST */}
                        {orders.map((order) => (
                            <OrderCard
                                key={order.id}
                                order={order}
                                onReorder={handleReorder}
                            />
                        ))}
                    </>
                )}
            </div>

            <CustomerNavbar />
        </div>
    );
};

export default OrderHistoryPage;
