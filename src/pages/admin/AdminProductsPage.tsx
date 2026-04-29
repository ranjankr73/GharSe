// pages/admin/AdminProductsPage.tsx
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
    adminGetAllProducts,
    adminToggleProductActive,
} from "../../features/admin/adminThunks";
import Badge from "../../components/ui/Badge";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";
import toast from "react-hot-toast";
import { Search, ToggleLeft, ToggleRight } from "lucide-react";

const AdminProductsPage = () => {
    const dispatch = useAppDispatch();
    const { products, status, total, totalPages, page } = useAppSelector(
        (s) => s.admin
    );

    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const params: Record<string, string | number> = {
            page: currentPage,
            limit: 15,
        };
        if (search) params.search = search;
        if (activeFilter !== "") params.isActive = activeFilter;
        dispatch(adminGetAllProducts(params));
    }, [currentPage, search, activeFilter, dispatch]);

    const handleToggleActive = async (productId: string) => {
        const result = await dispatch(adminToggleProductActive(productId));
        if (adminToggleProductActive.fulfilled.match(result)) {
            toast.success(
                result.payload.isActive
                    ? "Product activated"
                    : "Product deactivated"
            );
        }
    };

    return (
        <div className="space-y-5">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3">
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
                        className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20"
                    />
                </div>
                <div className="flex gap-2">
                    {[
                        { label: "All", value: "" },
                        { label: "Active", value: "true" },
                        { label: "Inactive", value: "false" },
                    ].map((f) => (
                        <button
                            key={f.value}
                            onClick={() => {
                                setActiveFilter(f.value);
                                setCurrentPage(1);
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                                activeFilter === f.value
                                    ? "bg-red-500 text-white"
                                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                            }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            <p className="text-xs text-slate-400">{total} products</p>

            {status === "loading" ? (
                <div className="flex justify-center py-16">
                    <Spinner />
                </div>
            ) : products.length === 0 ? (
                <EmptyState icon="📦" title="No products found" />
            ) : (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50">
                                {["Product", "Shop", "Category", "Price", "Stock", "Status", "Action"].map(
                                    (h) => (
                                        <th
                                            key={h}
                                            className="text-left text-xs font-semibold text-slate-500 px-4 py-3"
                                        >
                                            {h}
                                        </th>
                                    )
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {products.map((product) => (
                                <tr
                                    key={product._id}
                                    className="hover:bg-slate-50 transition"
                                >
                                    {/* Product */}
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-sm shrink-0 overflow-hidden">
                                                {product.images[0] ? (
                                                    <img
                                                        src={product.images[0]}
                                                        alt={product.name}
                                                        className="w-9 h-9 object-cover"
                                                    />
                                                ) : (
                                                    "📦"
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-slate-800 line-clamp-1">
                                                    {product.name}
                                                </p>
                                                {product.isFeatured && (
                                                    <span className="text-xs text-yellow-600">
                                                        ⭐ Featured
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </td>

                                    {/* Shop */}
                                    <td className="px-4 py-3 text-xs text-slate-600">
                                        {typeof product.shop === "object"
                                            ? product.shop.name
                                            : "—"}
                                    </td>

                                    {/* Category */}
                                    <td className="px-4 py-3 text-xs text-slate-600">
                                        {typeof product.category === "object"
                                            ? product.category.name
                                            : "—"}
                                    </td>

                                    {/* Price */}
                                    <td className="px-4 py-3">
                                        {product.variants.length > 0 ? (
                                            <span className="text-xs text-slate-500">
                                                {product.variants.length} variants
                                            </span>
                                        ) : (
                                            <p className="text-xs font-semibold text-slate-800">
                                                ₹{product.discountPrice ?? product.price}
                                            </p>
                                        )}
                                    </td>

                                    {/* Stock */}
                                    <td className="px-4 py-3">
                                        {product.variants.length > 0 ? (
                                            <span className="text-xs text-slate-400">—</span>
                                        ) : (
                                            <Badge
                                                label={
                                                    product.stock === 0
                                                        ? "Out of stock"
                                                        : product.stock <=
                                                          product.lowStockThreshold
                                                        ? "Low stock"
                                                        : `${product.stock} units`
                                                }
                                                variant={
                                                    product.stock === 0
                                                        ? "red"
                                                        : product.stock <=
                                                          product.lowStockThreshold
                                                        ? "yellow"
                                                        : "green"
                                                }
                                            />
                                        )}
                                    </td>

                                    {/* Status */}
                                    <td className="px-4 py-3">
                                        <Badge
                                            label={product.isActive ? "Active" : "Inactive"}
                                            variant={product.isActive ? "green" : "red"}
                                        />
                                    </td>

                                    {/* Toggle */}
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() =>
                                                handleToggleActive(product._id)
                                            }
                                            title={
                                                product.isActive
                                                    ? "Deactivate"
                                                    : "Activate"
                                            }
                                            className="cursor-pointer"
                                        >
                                            {product.isActive ? (
                                                <ToggleRight
                                                    size={20}
                                                    className="text-green-500"
                                                />
                                            ) : (
                                                <ToggleLeft
                                                    size={20}
                                                    className="text-slate-300"
                                                />
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between pt-2">
                    <p className="text-xs text-slate-400">
                        Page {page} of {totalPages}
                    </p>
                    <div className="flex gap-2">
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
                </div>
            )}
        </div>
    );
};

export default AdminProductsPage;