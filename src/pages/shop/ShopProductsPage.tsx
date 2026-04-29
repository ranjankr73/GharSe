import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

import { getMyProducts, deleteProduct, toggleProductAvailability } from "../../features/product/productThunks";
import { getCategories, getShopSubCategories } from "../../features/category/categoryThunks";
import type { Product } from "../../features/product/productTypes";

import ProductCard from "../../components/shop/ProductCard";
import ProductFormModal from "../../components/shop/ProductFormModal";

import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";
import {
    Plus,
    Search,
    Package,
} from "lucide-react";

const ShopProductsPage = () => {
    const dispatch = useAppDispatch();
    const { activeShop } = useAppSelector((s) => s.shop);
    const { products, status, totalProducts, totalPages, page } = useAppSelector((s) => s.product);

    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [availabilityFilter, setAvailabilityFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const { categories, subCategories } = useAppSelector((s) => s.category);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    useEffect(() => {
        if (!activeShop) return;
        dispatch(getShopSubCategories(activeShop._id));
    }, [activeShop, dispatch]);

    useEffect(() => {
        if (!activeShop) return;
        dispatch(
            getMyProducts({
                shopId: activeShop._id,
                params: {
                    page: currentPage,
                    limit: 12,
                    ...(search && { search }),
                    ...(categoryFilter && { categoryId: categoryFilter }),
                    ...(availabilityFilter !== "" && { isAvailable: availabilityFilter }),
                },
            })
        );
    }, [activeShop, currentPage, search, categoryFilter, availabilityFilter, dispatch]);

    const handleToggleAvailability = async (productId: string) => {
        if (!activeShop) return;
        const result = await dispatch(
            toggleProductAvailability({ shopId: activeShop._id, productId })
        );
        if (toggleProductAvailability.fulfilled.match(result)) {
            toast.success(
                result.payload.isAvailable ? "Product marked available" : "Product marked unavailable"
            );
        }
    };

    const handleDelete = async (productId: string) => {
        if (!activeShop) return;
        if (!confirm("Delete this product?")) return;
        const result = await dispatch(deleteProduct({ shopId: activeShop._id, productId }));
        if (deleteProduct.fulfilled.match(result)) {
            toast.success("Product deleted");
        } else {
            toast.error("Failed to delete product");
        }
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    if (!activeShop) {
        return <EmptyState icon="🏪" title="No shop selected" />;
    }

    return (
        <div className="space-y-5">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative flex-1">
                    <Search
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-300"
                    />
                </div>

                {/* Category filter */}
                <select
                    value={categoryFilter}
                    onChange={(e) => {
                        setCategoryFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="text-sm bg-white border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500/20 cursor-pointer"
                >
                    <option value="">All Categories</option>
                    {categories.map((c) => (
                        <option key={c._id} value={c._id}>
                            {c.name}
                        </option>
                    ))}
                </select>

                {/* Availability filter */}
                <select
                    value={availabilityFilter}
                    onChange={(e) => {
                        setAvailabilityFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="text-sm bg-white border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500/20 cursor-pointer"
                >
                    <option value="">All</option>
                    <option value="true">Available</option>
                    <option value="false">Unavailable</option>
                </select>

                <Button
                    onClick={() => setIsModalOpen(true)}
                    size="md"
                >
                    <Plus size={14} className="mr-1.5" />
                    Add Product
                </Button>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                    <Package size={12} />
                    {totalProducts} products
                </span>
                <span>
                    Page {page} of {totalPages}
                </span>
            </div>

            {/* Product grid */}
            {status === "loading" ? (
                <div className="flex justify-center py-16">
                    <Spinner />
                </div>
            ) : products.length === 0 ? (
                <EmptyState
                    icon="📦"
                    title="No products found"
                    description="Add your first product to start selling"
                    action={
                        <Button onClick={() => setIsModalOpen(true)} size="md">
                            <Plus size={14} className="mr-1.5" />
                            Add Product
                        </Button>
                    }
                />
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onToggleAvailability={handleToggleAvailability}
                        />
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                        className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 disabled:opacity-40 cursor-pointer hover:bg-slate-50"
                    >
                        Previous
                    </button>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                        className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 disabled:opacity-40 cursor-pointer hover:bg-slate-50"
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Product form modal */}
            {isModalOpen && (
                <ProductFormModal
                    shopId={activeShop._id}
                    product={editingProduct}
                    categories={categories}
                    subCategories={subCategories}
                    onClose={handleModalClose}
                />
            )}
        </div>
    );
};


export default ShopProductsPage;