import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks";

import { fetchShop } from "../../redux/slices/shopSlice";
import { fetchProducts } from "../../redux/slices/productSlice";
import { selectCartCount, selectCartTotal } from "../../redux/slices/cartSlice";

import ProductCard from "../../components/customer/ProductCard";
import StickyCartBar from "../../components/customer/StickyCartBar";
import CustomerNavbar from "../../components/layout/CustomerNavbar";
import ProductCardSkeleton from "../../components/ui/ProductCardSkeleton";
import EmptyState from "../../components/ui/EmptyState";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";

const ShopPage: React.FC = () => {
    const { shopId = "shop-001" } = useParams();
    const dispatch = useAppDispatch();

    const { shop, loading: shopLoading } = useAppSelector((s) => s.shop);
    const {
        products,
        categories,
        loading: productLoading,
    } = useAppSelector((s) => s.products);

    const cartCount = useAppSelector(selectCartCount);
    const cartTotal = useAppSelector(selectCartTotal);

    const [activeCategory, setActiveCategory] = useState("all");
    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(fetchShop(shopId));
        dispatch(fetchProducts(shopId));
    }, [dispatch, shopId]);

    const filteredProducts = useMemo(() => {
        let list = products;

        if (activeCategory !== "all") {
            list = list.filter((p) => p.categoryId === activeCategory);
        }

        if (search) {
            list = list.filter((p) =>
                p.name.toLowerCase().includes(search.toLowerCase()),
            );
        }

        return list;
    }, [products, activeCategory, search]);

    const loading = shopLoading || productLoading;

    return (
        <div className="min-h-screen bg-gray-50 pb-32 md:pt-14">
            {/* 🔥 HERO */}
            <div className="bg-linear-to-b from-red-200 via-white to-white">
                <div className="max-w-3xl mx-auto px-4 pt-10 pb-6">
                    {shop && (
                        <>
                            <div className="flex items-center gap-3">
                                <img
                                    src={shop.logo}
                                    alt={shop.name}
                                    className="w-12 h-12 rounded-xl border border-gray-200"
                                />

                                <div>
                                    <h1 className="text-lg font-semibold text-gray-800">
                                        {shop.name}
                                    </h1>
                                    <p className="text-sm text-gray-500">
                                        {shop.tagline}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-4">
                                {/* Open / Closed */}
                                <div
                                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${shop.isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
                                >
                                    <span
                                        className={`w-1.5 h-1.5  rounded-full ${shop.isOpen ? "bg-green-600" : "bg-red-500"}`}
                                    />
                                    {shop.isOpen ? "Open" : "Closed"}
                                </div>

                                {/* Delivery Time */}
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                                    🕐 {shop.deliveryTime}
                                </div>

                                {/* Rating */}
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                                    ⭐ {shop.rating}
                                </div>

                                {/* Delivery Fee */}
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                                    🛵{" "}
                                    {shop.deliveryFee === 0
                                        ? "Free"
                                        : `₹${shop.deliveryFee}`}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* 🔍 SEARCH */}
            <div className="max-w-3xl mx-auto px-4 -mt-4">
                <InputField
                    label=""
                    placeholder="Search food..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* 🍱 CATEGORIES */}
            <div className="sticky top-1 lg:top-14 z-30 mt-3">
                <div className="max-w-3xl mx-auto overflow-x-auto scrollbar-hide">
                    <div className="flex flex-nowrap gap-2 px-4 py-3">
                        {["all", ...categories.map((c) => c.id)].map((id) => {
                            const cat = categories.find((c) => c.id === id);

                            return (
                                <Button
                                    key={id}
                                    size="sm"
                                    variant={
                                        activeCategory === id
                                            ? "primary"
                                            : "outline"
                                    }
                                    onClick={() => setActiveCategory(id)}
                                    className="shrink-0 whitespace-nowrap bg-gray-50"
                                >
                                    {id === "all"
                                        ? "All"
                                        : `${cat?.icon} ${cat?.name}`}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* 🛍️ PRODUCTS */}
            <div className="mt-4 px-4 max-w-3xl mx-auto">
                {loading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <EmptyState
                        icon="🔍"
                        title="No items found"
                        description="Try different filters or search"
                        action={
                            <Button
                                size="sm"
                                onClick={() => {
                                    setSearch("");
                                    setActiveCategory("all");
                                }}
                            >
                                Clear Filters
                            </Button>
                        }
                    />
                ) : (
                    <>
                        <p className="text-xs text-gray-400 mb-2">
                            {filteredProducts.length} items
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* 🛒 CART */}
            <StickyCartBar
              itemCount={cartCount}
              total={cartTotal}
              shopId={shopId}
            />

            {/* 📱 NAV */}
            <CustomerNavbar />
        </div>
    );
};

export default ShopPage;
