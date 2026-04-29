import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getPublicShops } from "../../features/publicShop/publicShopThunks";
import { getCategories } from "../../features/category/categoryThunks";
import ShopCard from "../../components/customer/ShopCard";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";
import { Search } from "lucide-react";

const ShopBrowsePage = () => {
    const dispatch = useAppDispatch();
    const { shops, status, total, totalPages, page } = useAppSelector(
        (s) => s.publicShop
    );
    const { categories } = useAppSelector((s) => s.category);

    const [search, setSearch] = useState("");
    const [city, setCity] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    useEffect(() => {
        const params: Record<string, string | number> = {
            page: currentPage,
            limit: 12,
        };
        if (search) params.search = search;
        if (city) params.city = city;
        if (isOpenFilter) params.isOpen = "true";
        dispatch(getPublicShops(params));
    }, [currentPage, search, city, isOpenFilter, dispatch]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-bold">
                            <span className="text-gray-800">Ghar</span>
                            <span className="text-red-500">Se</span>
                        </span>
                    </div>
                    <h1 className="text-xl font-bold text-gray-900">
                        Shops near you
                    </h1>

                    {/* Search */}
                    <div className="relative mt-3">
                        <Search
                            size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="Search shops..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-300"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
                        <button
                            onClick={() => {
                                setIsOpenFilter(!isOpenFilter);
                                setCurrentPage(1);
                            }}
                            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                                isOpenFilter
                                    ? "bg-red-500 text-white"
                                    : "bg-white border border-gray-200 text-gray-600"
                            }`}
                        >
                            Open Now
                        </button>
                        {categories.map((c) => (
                            <button
                                key={c._id}
                                onClick={() => {
                                    setCategoryFilter(
                                        categoryFilter === c._id ? "" : c._id
                                    );
                                    setCurrentPage(1);
                                }}
                                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                                    categoryFilter === c._id
                                        ? "bg-red-500 text-white"
                                        : "bg-white border border-gray-200 text-gray-600"
                                }`}
                            >
                                {c.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-4 py-6">
                {status === "loading" ? (
                    <div className="flex justify-center py-16">
                        <Spinner />
                    </div>
                ) : shops.length === 0 ? (
                    <EmptyState
                        icon="🏪"
                        title="No shops found"
                        description="Try adjusting your filters or search"
                    />
                ) : (
                    <>
                        <p className="text-xs text-gray-400 mb-4">
                            {total} shops available
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {shops.map((shop) => (
                                <ShopCard key={shop._id} shop={shop} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center gap-2 mt-8">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((p) => p - 1)}
                                    className="px-4 py-2 text-sm rounded-xl border border-gray-200 disabled:opacity-40 cursor-pointer hover:bg-gray-50"
                                >
                                    Previous
                                </button>
                                <span className="px-4 py-2 text-sm text-gray-500">
                                    {page} / {totalPages}
                                </span>
                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage((p) => p + 1)}
                                    className="px-4 py-2 text-sm rounded-xl border border-gray-200 disabled:opacity-40 cursor-pointer hover:bg-gray-50"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ShopBrowsePage;