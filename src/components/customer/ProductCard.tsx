import { useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { addToCart, updateCartItem, removeCartItem } from "../../features/cart/cartThunks";
import type { Product } from "../../features/product/productTypes";
import { formatCurrency } from "../../utils/formatCurrency";
import toast from "react-hot-toast";

interface Props {
    product: Product;
}

const ProductCard = ({ product }: Props) => {
    const dispatch = useAppDispatch();
    const [imgError, setImgError] = useState(false);

    // Find this product in cart
    const cartItem = useAppSelector((s) =>
        s.cart.cart?.items.find(
            (item) =>
                (typeof item.product === "object"
                    ? item.product._id
                    : item.product) === product._id
        )
    );

    const quantity = cartItem?.quantity ?? 0;
    const hasVariants = product.variants.length > 0;
    const effectivePrice = product.discountPrice ?? product.price ?? 0;

    const handleAdd = async () => {
        if (!product.isAvailable) return;
        if (hasVariants) {
            // Navigate to product detail for variant selection
            toast("Please select a variant", { icon: "ℹ️" });
            return;
        }
        const result = await dispatch(
            addToCart({ productId: product._id, quantity: 1 })
        );
        if (addToCart.fulfilled.match(result)) {
            toast.success(`${product.name} added`, { duration: 1200 });
        } else {
            toast.error(result.payload as string ?? "Failed to add");
        }
    };

    const handleIncrease = async () => {
        if (!cartItem) return;
        await dispatch(
            updateCartItem({ itemId: cartItem._id, quantity: quantity + 1 })
        );
    };

    const handleDecrease = async () => {
        if (!cartItem) return;
        if (quantity === 1) {
            await dispatch(removeCartItem(cartItem._id));
            toast(`${product.name} removed`, { duration: 1200 });
        } else {
            await dispatch(
                updateCartItem({ itemId: cartItem._id, quantity: quantity - 1 })
            );
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col overflow-hidden">
            {/* Image */}
            <div className="relative h-40 bg-gray-100 overflow-hidden">
                {!imgError && product.images?.[0] ? (
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                        📦
                    </div>
                )}

                {/* Featured */}
                {product.isFeatured && (
                    <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-semibold px-2 py-0.5 rounded-full">
                        Featured
                    </span>
                )}

                {/* Out of stock */}
                {!product.isAvailable && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                            Out of stock
                        </span>
                    </div>
                )}

                {/* Rating */}
                {product.rating > 0 && (
                    <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-0.5 text-xs font-medium shadow-sm">
                        ⭐ {product.rating.toFixed(1)}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
                <h3 className="text-sm font-medium text-gray-800 line-clamp-1">
                    {product.name}
                </h3>
                {product.description && (
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                        {product.description}
                    </p>
                )}

                {/* Variants indicator */}
                {hasVariants && (
                    <p className="text-xs text-red-500 mt-1">
                        {product.variants.length} variants available
                    </p>
                )}

                <div className="flex items-center justify-between mt-auto pt-3">
                    {/* Price */}
                    <div>
                        <span className="text-base font-semibold text-gray-900">
                            {formatCurrency(effectivePrice)}
                        </span>
                        {product.discountPrice && product.price && (
                            <span className="text-xs text-gray-400 line-through ml-1.5">
                                {formatCurrency(product.price)}
                            </span>
                        )}
                        {product.unit && (
                            <span className="text-xs text-gray-400 ml-1">
                                /{product.unit}
                            </span>
                        )}
                    </div>

                    {/* Add / Qty control */}
                    {quantity > 0 && !hasVariants ? (
                        <div className="flex items-center gap-2 bg-red-50 rounded-xl px-2 py-1">
                            <button
                                onClick={handleDecrease}
                                className="w-7 h-7 rounded-lg bg-red-500 text-white text-sm flex items-center justify-center active:scale-90 cursor-pointer"
                            >
                                −
                            </button>
                            <span className="text-sm font-semibold text-red-600 w-5 text-center">
                                {quantity}
                            </span>
                            <button
                                onClick={handleIncrease}
                                className="w-7 h-7 rounded-lg bg-red-500 text-white text-sm flex items-center justify-center active:scale-90 cursor-pointer"
                            >
                                +
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleAdd}
                            disabled={!product.isAvailable}
                            className={`text-xs font-semibold px-4 py-2 rounded-xl transition active:scale-95 cursor-pointer ${
                                product.isAvailable
                                    ? "bg-red-500 text-white hover:bg-red-600"
                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                            }`}
                        >
                            {product.isAvailable
                                ? hasVariants
                                    ? "Choose"
                                    : "Add"
                                : "Unavailable"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;