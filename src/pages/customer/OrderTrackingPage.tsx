import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchOrder } from "../../redux/slices/orderSlice";

import CustomerNavbar from "../../components/layout/CustomerNavbar";
import StepTracker from "../../components/ui/StepTracker";
import Skeleton from "../../components/ui/Skeleton";
import StatusBadge from "../../components/ui/StatusBadge";
import Button from "../../components/ui/Button";

import { formatCurrency, formatDate } from "../../utils";

const OrderTrackingPage: React.FC = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { currentOrder, loading, error } = useAppSelector((s) => s.orders);

    useEffect(() => {
        if (orderId) dispatch(fetchOrder(orderId));
    }, [dispatch, orderId]);

    // Auto refresh
    useEffect(() => {
        if (!orderId) return;
        const interval = setInterval(
            () => dispatch(fetchOrder(orderId)),
            30000,
        );
        return () => clearInterval(interval);
    }, [dispatch, orderId]);

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

                <div>
                    <h1 className="text-lg font-semibold text-gray-800">
                        Track Order
                    </h1>
                    {currentOrder && (
                        <p className="text-xs text-gray-400 font-mono">
                            #{currentOrder.id}
                        </p>
                    )}
                </div>
            </header>

            <div className="max-w-2xl mx-auto px-4 mt-5 space-y-4">
                {/* 🔄 LOADING */}
                {loading && !currentOrder ? (
                    <div className="space-y-3">
                        <Skeleton className="h-32" />
                        <Skeleton className="h-32" />
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                        <p className="text-red-600 font-semibold">
                            Order not found
                        </p>
                        <p className="text-red-500 text-sm mt-1">{error}</p>

                        <Button
                            onClick={() => navigate("/orders")}
                            variant="outline"
                            size="sm"
                            className="mt-4"
                        >
                            View Orders
                        </Button>
                    </div>
                ) : currentOrder ? (
                    <>
                        {/* 📦 STATUS */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-sm font-medium text-gray-800">
                                    Order Status
                                </h2>
                                <StatusBadge status={currentOrder.status} />
                            </div>

                            <StepTracker status={currentOrder.status} />
                        </div>

                        {/* 🚚 DELIVERY INFO */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                            <h2 className="text-sm font-medium text-gray-800 mb-4">
                                Delivery Details
                            </h2>

                            <div className="space-y-3 text-sm">
                                <InfoRow
                                    label="Name"
                                    value={currentOrder.customerName}
                                />
                                <InfoRow
                                    label="Phone"
                                    value={currentOrder.phone}
                                />
                                <InfoRow
                                    label="Address"
                                    value={currentOrder.address}
                                />

                                {currentOrder.note && (
                                    <InfoRow
                                        label="Note"
                                        value={currentOrder.note}
                                        subtle
                                    />
                                )}

                                <InfoRow
                                    label="Placed at"
                                    value={formatDate(currentOrder.createdAt)}
                                />
                            </div>
                        </div>

                        {/* 🛒 ITEMS */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                            <h2 className="text-sm font-medium text-gray-800 mb-4">
                                Order Summary
                            </h2>

                            <div className="space-y-3">
                                {currentOrder.items.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex justify-between items-center text-sm"
                                    >
                                        <span className="text-gray-700">
                                            {item.productName}{" "}
                                            <span className="text-gray-400">
                                                ×{item.quantity}
                                            </span>
                                        </span>

                                        <span className="font-medium text-gray-900">
                                            {formatCurrency(
                                                item.price * item.quantity,
                                            )}
                                        </span>
                                    </div>
                                ))}

                                <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between text-sm">
                                    <span className="text-gray-500">
                                        Delivery fee
                                    </span>
                                    <span className="font-medium text-gray-800">
                                        {formatCurrency(
                                            currentOrder.deliveryFee,
                                        )}
                                    </span>
                                </div>

                                <div className="flex justify-between pt-1">
                                    <span className="font-semibold text-gray-900">
                                        Total
                                    </span>
                                    <span className="text-lg font-semibold text-gray-900">
                                        {formatCurrency(
                                            currentOrder.totalAmount +
                                                currentOrder.deliveryFee,
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* ⏱ FOOTER NOTE */}
                        <p className="text-center text-xs text-gray-400 pb-2">
                            Updates every 30 seconds
                        </p>
                    </>
                ) : null}
            </div>

            <CustomerNavbar />
        </div>
    );
};

/* 🔹 Reusable row */
const InfoRow = ({
    label,
    value,
    subtle,
}: {
    label: string;
    value: string;
    subtle?: boolean;
}) => (
    <div className="flex gap-2">
        <span className="text-gray-400 w-24 shrink-0">{label}</span>
        <span
            className={`${
                subtle ? "text-gray-500 italic" : "text-gray-800 font-medium"
            }`}
        >
            {value}
        </span>
    </div>
);

export default OrderTrackingPage;
