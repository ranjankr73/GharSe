// pages/admin/AdminShopsPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
    adminGetAllShops,
    adminVerifyShop,
    adminToggleShopActive,
} from "../../features/admin/adminThunks";
import Badge from "../../components/ui/Badge";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";
import toast from "react-hot-toast";
import { Search, CheckCircle, XCircle, Eye, ToggleLeft, ToggleRight } from "lucide-react";

const FILTER_OPTIONS = [
    { label: "All", value: "" },
    { label: "Verified", value: "verified" },
    { label: "Unverified", value: "unverified" },
    { label: "Active", value: "active" },
    { label: "Suspended", value: "suspended" },
];

const AdminShopsPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { shops, status, total, totalPages, page } = useAppSelector(
        (s) => s.admin
    );

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState(searchParams.get("filter") ?? "");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const params: Record<string, string | number> = {
            page: currentPage,
            limit: 15,
        };
        if (search) params.search = search;
        if (filter === "verified") params.isVerified = "true";
        if (filter === "unverified") params.isVerified = "false";
        if (filter === "active") params.isActive = "true";
        if (filter === "suspended") params.isActive = "false";

        dispatch(adminGetAllShops(params));
    }, [currentPage, search, filter, dispatch]);

    const handleVerify = async (shopId: string, isVerified: boolean) => {
        const result = await dispatch(adminVerifyShop({ shopId, isVerified }));
        if (adminVerifyShop.fulfilled.match(result)) {
            toast.success(isVerified ? "Shop verified ✅" : "Shop unverified");
        }
    };

    const handleToggleActive = async (shopId: string) => {
        const result = await dispatch(adminToggleShopActive(shopId));
        if (adminToggleShopActive.fulfilled.match(result)) {
            toast.success(
                result.payload.isActive
                    ? "Shop restored"
                    : "Shop suspended"
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
                        placeholder="Search shops..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20"
                    />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {FILTER_OPTIONS.map((f) => (
                        <button
                            key={f.value}
                            onClick={() => {
                                setFilter(f.value);
                                setCurrentPage(1);
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                                filter === f.value
                                    ? "bg-red-500 text-white"
                                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                            }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            <p className="text-xs text-slate-400">{total} shops found</p>

            {status === "loading" ? (
                <div className="flex justify-center py-16">
                    <Spinner />
                </div>
            ) : shops.length === 0 ? (
                <EmptyState icon="🏪" title="No shops found" />
            ) : (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50">
                                {["Shop", "Owner", "Status", "Step", "Rating", "Actions"].map(
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
                            {shops.map((shop) => (
                                <tr
                                    key={shop._id}
                                    className="hover:bg-slate-50 transition"
                                >
                                    {/* Shop */}
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-sm shrink-0">
                                                {shop.logo ? (
                                                    <img
                                                        src={shop.logo}
                                                        alt={shop.name}
                                                        className="w-8 h-8 rounded-xl object-cover"
                                                    />
                                                ) : (
                                                    "🏪"
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-slate-800">
                                                    {shop.name}
                                                </p>
                                                <p className="text-xs text-slate-400">
                                                    {shop.address?.city ?? "No address"}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Owner */}
                                    <td className="px-4 py-3">
                                        <p className="text-xs text-slate-700">
                                            {typeof shop.owner === "object"
                                                ? shop.owner.fullName
                                                : ""}
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            {typeof shop.owner === "object"
                                                ? shop.owner.email
                                                : ""}
                                        </p>
                                    </td>

                                    {/* Status badges */}
                                    <td className="px-4 py-3">
                                        <div className="flex flex-col gap-1">
                                            <Badge
                                                label={
                                                    shop.isVerified
                                                        ? "Verified"
                                                        : "Pending"
                                                }
                                                variant={
                                                    shop.isVerified
                                                        ? "green"
                                                        : "yellow"
                                                }
                                            />
                                            <Badge
                                                label={
                                                    shop.isActive
                                                        ? "Active"
                                                        : "Suspended"
                                                }
                                                variant={
                                                    shop.isActive ? "blue" : "red"
                                                }
                                            />
                                        </div>
                                    </td>

                                    {/* Onboarding step */}
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 bg-slate-100 rounded-full h-1.5">
                                                <div
                                                    className="bg-red-500 h-1.5 rounded-full"
                                                    style={{
                                                        width: `${
                                                            (Math.min(
                                                                shop.onboardingStep,
                                                                5
                                                            ) /
                                                                5) *
                                                            100
                                                        }%`,
                                                    }}
                                                />
                                            </div>
                                            <span className="text-xs text-slate-400">
                                                {Math.min(
                                                    shop.onboardingStep,
                                                    5
                                                )}
                                                /5
                                            </span>
                                        </div>
                                    </td>

                                    {/* Rating */}
                                    <td className="px-4 py-3">
                                        <p className="text-xs text-slate-700">
                                            ⭐ {shop.rating.toFixed(1)}
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            {shop.totalReviews} reviews
                                        </p>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1.5">
                                            {/* View detail */}
                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `${shop._id}`
                                                    )
                                                }
                                                title="View detail"
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                                            >
                                                <Eye size={14} />
                                            </button>

                                            {/* Verify / Unverify */}
                                            {!shop.isVerified ? (
                                                <button
                                                    onClick={() =>
                                                        handleVerify(
                                                            shop._id,
                                                            true
                                                        )
                                                    }
                                                    title="Verify shop"
                                                    className="p-1.5 rounded-lg text-green-500 hover:bg-green-50 transition cursor-pointer"
                                                >
                                                    <CheckCircle size={14} />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        handleVerify(
                                                            shop._id,
                                                            false
                                                        )
                                                    }
                                                    title="Unverify shop"
                                                    className="p-1.5 rounded-lg text-yellow-500 hover:bg-yellow-50 transition cursor-pointer"
                                                >
                                                    <XCircle size={14} />
                                                </button>
                                            )}

                                            {/* Suspend / Restore */}
                                            <button
                                                onClick={() =>
                                                    handleToggleActive(shop._id)
                                                }
                                                title={
                                                    shop.isActive
                                                        ? "Suspend shop"
                                                        : "Restore shop"
                                                }
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                                            >
                                                {shop.isActive ? (
                                                    <ToggleRight
                                                        size={16}
                                                        className="text-green-500"
                                                    />
                                                ) : (
                                                    <ToggleLeft
                                                        size={16}
                                                        className="text-slate-300"
                                                    />
                                                )}
                                            </button>
                                        </div>
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

export default AdminShopsPage;