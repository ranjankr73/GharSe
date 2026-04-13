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

            <div className="relative h-52 md:h-64 overflow-hidden">
                <img
                    src={shop?.coverImage}
                    alt={shop?.name}
                    className="w-full h-full object-cover"
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 max-w-3xl mx-auto text-white">
                    <h1 className="text-2xl font-semibold">{shop?.name}</h1>
                    <p className="text-xs text-white/80">{shop?.tagline}</p>

                    <div className="flex flex-wrap gap-2 mt-2 text-[11px]">
                        <span
                            className={`px-3 py-1 rounded-full font-medium ${
                                shop?.isOpen
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-600"
                            }`}
                        >
                            {shop?.isOpen ? "Open now" : "Closed"}
                        </span>
                        <span className="bg-white/90 text-black px-2 py-0.5 rounded-full font-medium">
                            ⭐ {shop?.rating}
                        </span>
                        <span className="bg-white/90 text-black px-2 py-0.5 rounded-full font-medium">
                            🕐 {shop?.deliveryTime}
                        </span>
                        <span className="bg-white/90 text-black px-2 py-0.5 rounded-full font-medium">
                            🛵{" "}
                            {shop?.deliveryFee === 0
                                ? "Free"
                                : `₹${shop?.deliveryFee}`}
                        </span>
                    </div>
                </div>
            </div>

            <div className="sticky top-14 z-30">
                <div className="max-w-3xl mx-auto px-4 py-3 space-y-3">
                    <InputField
                        label=""
                        placeholder="Search for dishes..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {/* Categories */}
                    <div className="flex gap-2 overflow-x-auto p-2">
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
                                    className="rounded-full whitespace-nowrap bg-gray-50"
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
