import React from "react";
import { useNavigate } from "react-router";
import { useAppSelector, useAppDispatch } from "../../hooks";
import {
    selectCartItems,
    selectCartTotal,
    clearCart,
} from "../../redux/slices/cartSlice";

import CartItem from "../../components/customer/CartItem";
import CustomerNavbar from "../../components/layout/CustomerNavbar";
import EmptyState from "../../components/ui/EmptyState";
import Button from "../../components/ui/Button";

import { formatCurrency } from "../../utils";
import toast from "react-hot-toast";

const CartPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const items = useAppSelector(selectCartItems);
    const total = useAppSelector(selectCartTotal);
    const shop = useAppSelector((s) => s.shop.shop);

    const deliveryFee = shop?.deliveryFee ?? 20;
    const minOrder = shop?.minOrder ?? 100;

    const isMinMet = total >= minOrder;

    const handleClear = () => {
        dispatch(clearCart());
        toast("Cart cleared");
    };

    // 🟡 EMPTY STATE
    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 pb-32 md:pt-14">
                {/* Header */}
                <header
                    className="
  sticky top-0 md:top-14 z-20
  bg-white border-b border-gray-100
  px-4 lg:px-10 py-4
  flex items-center gap-3
"
                >
                    <button
                        onClick={() => navigate(-1)}
                        className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center"
                    >
                        ←
                    </button>

                    <h1 className="text-lg font-semibold text-gray-800">
                        Your Cart
                    </h1>
                </header>

                <EmptyState
                    icon="🛒"
                    title="Your cart is empty"
                    description="Add items from the shop to get started."
                    action={
                        <Button onClick={() => navigate("/shop/shop-001")}>
                            Browse Shop
                        </Button>
                    }
                />

                <CustomerNavbar />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-32 md:pt-14">
            {/* 🔥 HEADER */}
            <header className="sticky top-0 lg:top-14 z-20 bg-white border-b border-gray-100 px-4 lg:px-10 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-9 h-9 rounded-xl bg-gray-100 text-center py-auto"
                    >
                        ←
                    </button>

                    <h1 className="text-lg font-semibold text-gray-800">
                        Your Cart
                    </h1>
                </div>

                <button
                    onClick={handleClear}
                    className="text-xs lg:text-base font-medium text-red-500 hover:text-red-600"
                >
                    Clear
                </button>
            </header>

            {/* 📦 CONTENT */}
            <div className="max-w-2xl mx-auto px-4 mt-4 space-y-3">
                {/* Items */}
                {items.map((item) => (
                    <CartItem key={item.product.id} item={item} />
                ))}

                {/* 💰 BILL SUMMARY */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mt-4">
                    <h3 className="text-sm font-medium text-gray-800 mb-3">
                        Bill Summary
                    </h3>

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-600">
                            <span>
                                Subtotal ({items.length} item
                                {items.length > 1 ? "s" : ""})
                            </span>
                            <span className="font-medium text-gray-800">
                                {formatCurrency(total)}
                            </span>
                        </div>

                        <div className="flex justify-between text-gray-600">
                            <span>Delivery fee</span>
                            <span className="font-medium text-gray-800">
                                {formatCurrency(deliveryFee)}
                            </span>
                        </div>

                        <div className="border-t border-dashed border-gray-200 pt-2 flex justify-between">
                            <span className="font-semibold text-gray-900">
                                Total
                            </span>
                            <span className="text-lg font-bold text-gray-900">
                                {formatCurrency(total + deliveryFee)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ⚠️ MIN ORDER */}
                {!isMinMet && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex gap-3">
                        <span className="text-red-500 text-lg">⚠️</span>

                        <div>
                            <p className="text-sm font-medium text-red-700">
                                Minimum order not met
                            </p>

                            <p className="text-xs text-red-500 mt-0.5">
                                Add {formatCurrency(minOrder - total)} more to
                                proceed.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* 🚀 CHECKOUT BAR */}
            <div
                className="
        fixed bottom-16 md:bottom-4 left-0 right-0 z-30
        px-4 pb-3
      "
            >
                <div className="max-w-2xl mx-auto">
                    <Button
                        onClick={() => navigate("/checkout")}
                        size="lg"
                        fullWidth
                        disabled={!isMinMet}
                    >
                        Proceed to Checkout •{" "}
                        {formatCurrency(total + deliveryFee)}
                    </Button>

                    {isMinMet && (
                        <p className="text-center text-xs text-gray-400 mt-2">
                            Delivery in {shop?.deliveryTime ?? "30–45 min"}
                        </p>
                    )}
                </div>
            </div>

            {/* 📱 NAVBAR */}
            <CustomerNavbar />
        </div>
    );
};

export default CartPage;
