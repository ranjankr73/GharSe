import { useState } from "react";
import { useNavigate } from "react-router";
import type { PublicShop } from "../../features/publicShop/publicShopTypes";
import { useAppSelector } from "../../hooks/useAppSelector";

interface Props {
    shop: PublicShop;
}

const ShopCard = ({ shop }: Props) => {
    const { isAuthenticated } = useAppSelector((s) => s.auth);
    const navigate = useNavigate();
    const [imgError, setImgError] = useState(false);

    return (
        <div
            onClick={() => navigate(isAuthenticated ? `/user/shop/${shop._id}` : `/shop/${shop._id}`)}
            className="group cursor-pointer shadow-sm rounded-2xl overflow-hidden bg-white border border-gray-200 transition hover:shadow-md p-2"
        >
            {/* Image */}
            <div className="relative h-44 rounded-xl overflow-hidden bg-gray-100">
                {!imgError && shop.coverImage ? (
                    <img
                        src={shop.coverImage}
                        alt={shop.name}
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                        🏪
                    </div>
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

                {/* Rating */}
                {shop.rating > 0 && (
                    <div className="absolute top-2 right-2 bg-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                        ⭐ {shop.rating.toFixed(1)}
                    </div>
                )}

                {/* Closed overlay */}
                {!shop.isOpen && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-semibold text-sm">
                        Closed
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="mt-3 space-y-1 px-1 pb-1">
                {/* Logo + name */}
                <div className="flex items-center gap-2">
                    {shop.logo && (
                        <img
                            src={shop.logo}
                            alt={shop.name}
                            className="w-7 h-7 rounded-lg object-cover border border-gray-100"
                        />
                    )}
                    <h3 className="font-semibold text-sm text-gray-900 line-clamp-1">
                        {shop.name}
                    </h3>
                </div>

                {shop.tagline && (
                    <p className="text-xs text-gray-500 line-clamp-1">
                        {shop.tagline}
                    </p>
                )}

                {/* Meta */}
                <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                    {shop.deliveryTime && (
                        <span>🕒 {shop.deliveryTime} min</span>
                    )}
                    {shop.deliveryTime && shop.deliveryFee !== undefined && (
                        <span>•</span>
                    )}
                    {shop.deliveryFee !== undefined && (
                        <span>
                            {shop.deliveryFee === 0
                                ? "Free delivery"
                                : `₹${shop.deliveryFee} delivery`}
                        </span>
                    )}
                </div>

                {shop.minOrder && (
                    <p className="text-xs text-gray-400">
                        Min order ₹{shop.minOrder}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ShopCard;