import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
    getPublicShopById,
    getPublicShopProducts,
} from "../../features/publicShop/publicShopThunks";
import { getShopSubCategories } from "../../features/category/categoryThunks";
import ProductCard from "../../components/customer/ProductCard";
import StickyCartBar from "../../components/customer/StickyCartBar";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";
import { ArrowLeft, Clock, Truck, Star } from "lucide-react";

const ShopDetailPage = () => {
    const { shopId } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { activeShop, products, status } = useAppSelector(
        (s) => s.publicShop
    );
    const { subCategories } = useAppSelector((s) => s.category);
    const [activeSubCat, setActiveSubCat] = useState("");

    useEffect(() => {
        if (!shopId) return;
        dispatch(getPublicShopById(shopId));
        dispatch(getPublicShopProducts({ shopId }));
        dispatch(getShopSubCategories(shopId));
    }, [shopId, dispatch]);

    useEffect(() => {
        if (!shopId) return;
        dispatch(
            getPublicShopProducts({
                shopId,
                params: activeSubCat ? { subCategoryId: activeSubCat } : {},
            })
        );
    }, [activeSubCat, shopId, dispatch]);

    if (status === "loading" && !activeShop) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner size="lg" />
            </div>
        );
    }

    if (!activeShop) return null;

    return (
        <div className="min-h-screen bg-gray-50 pb-28">
            {/* Cover image */}
            <div className="relative h-48 bg-gray-200">
                {activeShop.coverImage && (
                    <img
                        src={activeShop.coverImage}
                        alt={activeShop.name}
                        className="w-full h-full object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center cursor-pointer"
                >
                    <ArrowLeft size={16} className="text-gray-700" />
                </button>

                {/* Shop name over image */}
                <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-3">
                        {activeShop.logo && (
                            <img
                                src={activeShop.logo}
                                alt={activeShop.name}
                                className="w-12 h-12 rounded-xl object-cover border-2 border-white"
                            />
                        )}
                        <div>
                            <h1 className="text-lg font-bold text-white">
                                {activeShop.name}
                            </h1>
                            {activeShop.tagline && (
                                <p className="text-xs text-white/80">
                                    {activeShop.tagline}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Shop info bar */}
            <div className="bg-white border-b border-gray-100 px-4 py-3">
                <div className="flex items-center gap-4 text-xs text-gray-600 flex-wrap">
                    {activeShop.rating > 0 && (
                        <span className="flex items-center gap-1">
                            <Star size={12} className="text-yellow-500 fill-yellow-500" />
                            {activeShop.rating.toFixed(1)} ({activeShop.totalReviews} reviews)
                        </span>
                    )}
                    {activeShop.deliveryTime && (
                        <span className="flex items-center gap-1">
                            <Clock size={12} className="text-gray-400" />
                            {activeShop.deliveryTime} min
                        </span>
                    )}
                    {activeShop.deliveryFee !== undefined && (
                        <span className="flex items-center gap-1">
                            <Truck size={12} className="text-gray-400" />
                            {activeShop.deliveryFee === 0
                                ? "Free delivery"
                                : `₹${activeShop.deliveryFee} delivery`}
                        </span>
                    )}
                    {activeShop.minOrder && (
                        <span>Min order ₹{activeShop.minOrder}</span>
                    )}
                    <span
                        className={`font-medium ${
                            activeShop.isOpen
                                ? "text-green-600"
                                : "text-red-500"
                        }`}
                    >
                        {activeShop.isOpen ? "● Open" : "● Closed"}
                    </span>
                </div>
            </div>

            {/* Subcategory tabs */}
            {subCategories.length > 0 && (
                <div className="bg-white border-b border-gray-100 px-4">
                    <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
                        <button
                            onClick={() => setActiveSubCat("")}
                            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                                activeSubCat === ""
                                    ? "bg-red-500 text-white"
                                    : "bg-gray-100 text-gray-600"
                            }`}
                        >
                            All
                        </button>
                        {subCategories.map((sc) => (
                            <button
                                key={sc._id}
                                onClick={() => setActiveSubCat(sc._id)}
                                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                                    activeSubCat === sc._id
                                        ? "bg-red-500 text-white"
                                        : "bg-gray-100 text-gray-600"
                                }`}
                            >
                                {sc.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Products */}
            <div className="max-w-6xl mx-auto px-4 py-6">
                {!activeShop.isOpen && (
                    <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-sm text-red-600 text-center mb-4">
                        This shop is currently closed. You can browse the menu but cannot place orders.
                    </div>
                )}

                {status === "loading" ? (
                    <div className="flex justify-center py-16">
                        <Spinner />
                    </div>
                ) : products.length === 0 ? (
                    <EmptyState
                        icon="📦"
                        title="No products found"
                        description="This shop hasn't added any products yet"
                    />
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>

            {/* Sticky cart bar */}
            <StickyCartBar />
        </div>
    );
};

export default ShopDetailPage;