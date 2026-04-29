import { AlertTriangle, ToggleRight, ToggleLeft, Trash2, Pencil } from "lucide-react";
import type { Product } from "../../features/product/productTypes";

interface ProductCardProps {
    product: Product;
    onEdit: (p: Product) => void;
    onDelete: (id: string) => void;
    onToggleAvailability: (id: string) => void;
}

const ProductCard = ({
    product,
    onEdit,
    onDelete,
    onToggleAvailability,
}: ProductCardProps) => {
    const hasVariants = product.variants.length > 0;
    const isLowStock = !hasVariants && product.stock <= product.lowStockThreshold && product.stock > 0;
    const isOutOfStock = !hasVariants && product.stock === 0;

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {/* Image */}
            <div className="relative h-40 bg-slate-50">
                {product.images[0] ? (
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">
                        📦
                    </div>
                )}

                {/* Featured badge */}
                {product.isFeatured && (
                    <span className="absolute top-2 left-2 text-xs bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full font-medium">
                        Featured
                    </span>
                )}

                {/* Low stock warning */}
                {(isLowStock || isOutOfStock) && (
                    <span
                        className={`absolute top-2 right-2 flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                            isOutOfStock
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                        <AlertTriangle size={10} />
                        {isOutOfStock ? "Out of stock" : `${product.stock} left`}
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-slate-800 line-clamp-1">
                        {product.name}
                    </h3>
                    <button
                        onClick={() => onToggleAvailability(product._id)}
                        className="shrink-0 cursor-pointer"
                    >
                        {product.isAvailable ? (
                            <ToggleRight size={20} className="text-green-500" />
                        ) : (
                            <ToggleLeft size={20} className="text-slate-300" />
                        )}
                    </button>
                </div>

                {/* Category */}
                <p className="text-xs text-slate-400 mb-2">
                    {typeof product.category === "object"
                        ? product.category.name
                        : product.category}
                    {product.subCategory &&
                        typeof product.subCategory === "object" &&
                        ` · ${product.subCategory.name}`}
                </p>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                    {hasVariants ? (
                        <span className="text-xs text-slate-500">
                            {product.variants.length} variants
                        </span>
                    ) : (
                        <>
                            <span className="text-sm font-bold text-slate-800">
                                ₹{product.discountPrice ?? product.price}
                            </span>
                            {product.discountPrice && product.price && (
                                <span className="text-xs text-slate-400 line-through">
                                    ₹{product.price}
                                </span>
                            )}
                            {product.unit && (
                                <span className="text-xs text-slate-400">
                                    / {product.unit}
                                </span>
                            )}
                        </>
                    )}
                </div>

                {/* Stock (no variants) */}
                {!hasVariants && (
                    <div className="mb-3">
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Stock</span>
                            <span>{product.stock} units</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1">
                            <div
                                className={`h-1 rounded-full transition-all ${
                                    isOutOfStock
                                        ? "bg-red-400"
                                        : isLowStock
                                        ? "bg-yellow-400"
                                        : "bg-green-400"
                                }`}
                                style={{
                                    width: `${Math.min(
                                        100,
                                        (product.stock / Math.max(product.stock, 50)) * 100
                                    )}%`,
                                }}
                            />
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-3 border-t border-slate-50">
                    <button
                        onClick={() => onEdit(product)}
                        className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium text-slate-600 border border-slate-200 rounded-xl py-2 hover:bg-slate-50 transition cursor-pointer"
                    >
                        <Pencil size={12} />
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(product._id)}
                        className="flex items-center justify-center gap-1.5 text-xs font-medium text-red-500 border border-red-100 rounded-xl px-3 py-2 hover:bg-red-50 transition cursor-pointer"
                    >
                        <Trash2 size={12} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;