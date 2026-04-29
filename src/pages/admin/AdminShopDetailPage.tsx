import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
    adminGetShopById,
    adminVerifyShop,
    adminToggleShopActive,
    adminDeleteShop,
} from "../../features/admin/adminThunks";
import Badge from "../../components/ui/Badge";
import Spinner from "../../components/ui/Spinner";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";
import {
    ArrowLeft,
    Phone,
    Mail,
    MapPin,
    Clock,
    Truck,
    ShoppingBag,
    Star,
} from "lucide-react";

const AdminShopDetailPage = () => {
    const { shopId } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { activeShop, status } = useAppSelector((s) => s.admin);

    useEffect(() => {
        if (shopId) dispatch(adminGetShopById(shopId));
    }, [shopId, dispatch]);

    const handleVerify = async (isVerified: boolean) => {
        if (!shopId) return;
        const result = await dispatch(adminVerifyShop({ shopId, isVerified }));
        if (adminVerifyShop.fulfilled.match(result)) {
            toast.success(isVerified ? "Shop verified ✅" : "Shop unverified");
        }
    };

    const handleToggleActive = async () => {
        if (!shopId) return;
        const result = await dispatch(adminToggleShopActive(shopId));
        if (adminToggleShopActive.fulfilled.match(result)) {
            toast.success(
                result.payload.isActive ? "Shop restored" : "Shop suspended"
            );
        }
    };

    const handleDelete = async () => {
        if (!shopId) return;
        if (
            !confirm(
                "Permanently delete this shop? This cannot be undone."
            )
        )
            return;
        const result = await dispatch(adminDeleteShop(shopId));
        if (adminDeleteShop.fulfilled.match(result)) {
            toast.success("Shop deleted");
            navigate("/admin/shops");
        }
    };

    if (status === "loading" || !activeShop) {
        return (
            <div className="flex justify-center py-16">
                <Spinner />
            </div>
        );
    }

    const shop = activeShop;
    const owner =
        typeof shop.owner === "object" ? shop.owner : null;

    return (
        <div className="space-y-5 max-w-3xl">
            {/* Back */}
            <button
                onClick={() => navigate("/admin/shops")}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 transition cursor-pointer"
            >
                <ArrowLeft size={13} />
                Back to Shops
            </button>

            {/* Header card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                {/* Cover */}
                <div className="h-32 bg-linear-to-r from-slate-100 to-slate-50 relative">
                    {shop.coverImage && (
                        <img
                            src={shop.coverImage}
                            alt="Cover"
                            className="w-full h-full object-cover"
                        />
                    )}
                    <div className="absolute bottom-0 left-5 translate-y-1/2">
                        <div className="w-14 h-14 rounded-2xl bg-white border-2 border-white shadow-sm flex items-center justify-center text-2xl overflow-hidden">
                            {shop.logo ? (
                                <img
                                    src={shop.logo}
                                    alt={shop.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                "🏪"
                            )}
                        </div>
                    </div>
                </div>

                <div className="px-5 pt-10 pb-5">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-base font-semibold text-slate-800">
                                {shop.name}
                            </h2>
                            {shop.tagline && (
                                <p className="text-xs text-slate-400 mt-0.5">
                                    {shop.tagline}
                                </p>
                            )}
                            <div className="flex items-center gap-2 mt-2">
                                <Badge
                                    label={
                                        shop.isVerified
                                            ? "Verified"
                                            : "Pending Verification"
                                    }
                                    variant={shop.isVerified ? "green" : "yellow"}
                                />
                                <Badge
                                    label={shop.isActive ? "Active" : "Suspended"}
                                    variant={shop.isActive ? "blue" : "red"}
                                />
                                <Badge
                                    label={shop.isOpen ? "Open" : "Closed"}
                                    variant={shop.isOpen ? "green" : "gray"}
                                />
                            </div>
                        </div>

                        {/* Quick actions */}
                        <div className="flex flex-col gap-2">
                            {!shop.isVerified ? (
                                <Button
                                    onClick={() => handleVerify(true)}
                                    size="md"
                                >
                                    ✅ Verify Shop
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => handleVerify(false)}
                                    variant="outline"
                                    size="md"
                                >
                                    Unverify
                                </Button>
                            )}
                            <button
                                onClick={handleToggleActive}
                                className={`text-xs font-medium px-4 py-2 rounded-xl border transition cursor-pointer ${
                                    shop.isActive
                                        ? "border-red-200 text-red-500 hover:bg-red-50"
                                        : "border-green-200 text-green-500 hover:bg-green-50"
                                }`}
                            >
                                {shop.isActive ? "Suspend Shop" : "Restore Shop"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Info grid */}
            <div className="grid md:grid-cols-2 gap-5">
                {/* Owner info */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-3">
                    <h3 className="text-xs font-semibold text-slate-700">
                        Owner Information
                    </h3>
                    {owner && (
                        <>
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                                <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center text-xs font-semibold text-red-600">
                                    {owner.fullName?.[0]?.toUpperCase()}
                                </div>
                                <span className="font-medium">{owner.fullName}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <Mail size={12} className="text-slate-400" />
                                {owner.email}
                            </div>
                            {owner.phone && (
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <Phone size={12} className="text-slate-400" />
                                    {owner.phone}
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Shop info */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-3">
                    <h3 className="text-xs font-semibold text-slate-700">
                        Shop Information
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Phone size={12} className="text-slate-400" />
                        {shop.phone}
                    </div>
                    {shop.address && (
                        <div className="flex items-start gap-2 text-xs text-slate-500">
                            <MapPin size={12} className="text-slate-400 mt-0.5 shrink-0" />
                            <span>
                                {shop.address.addressLine},{" "}
                                {shop.address.city}, {shop.address.state}{" "}
                                - {shop.address.pinCode}
                            </span>
                        </div>
                    )}
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Clock size={12} className="text-slate-400" />
                        {shop.deliveryTime ?? "—"} min delivery
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Truck size={12} className="text-slate-400" />
                        ₹{shop.deliveryFee ?? "—"} delivery fee · Min ₹
                        {shop.minOrder ?? "—"}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Star size={12} className="text-slate-400" />
                        {shop.rating.toFixed(1)} ({shop.totalReviews} reviews)
                    </div>
                </div>
            </div>

            {/* Business details */}
            {shop.businessDetails && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-3">
                    <h3 className="text-xs font-semibold text-slate-700">
                        Business Details
                    </h3>
                    <div className="grid sm:grid-cols-3 gap-4">
                        {[
                            { label: "GST Number", value: shop.businessDetails.gstNumber },
                            { label: "PAN Number", value: shop.businessDetails.panNumber },
                            { label: "FSSAI License", value: shop.businessDetails.fssaiLicense },
                        ].map(({ label, value }) => (
                            <div key={label}>
                                <p className="text-xs text-slate-400">{label}</p>
                                <p className="text-xs font-medium text-slate-700 mt-0.5">
                                    {value ?? "Not provided"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Onboarding progress */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <h3 className="text-xs font-semibold text-slate-700 mb-3">
                    Onboarding Progress
                </h3>
                <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-100 rounded-full h-2">
                        <div
                            className="bg-red-500 h-2 rounded-full transition-all"
                            style={{
                                width: `${(Math.min(shop.onboardingStep, 5) / 5) * 100}%`,
                            }}
                        />
                    </div>
                    <span className="text-xs font-semibold text-slate-600">
                        {Math.min(shop.onboardingStep, 5)}/5 steps
                    </span>
                </div>
            </div>

            {/* Danger zone */}
            <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-5">
                <h3 className="text-sm font-semibold text-slate-800 mb-1">
                    Danger Zone
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                    Permanently delete this shop and all associated data. This
                    cannot be undone.
                </p>
                <button
                    onClick={handleDelete}
                    className="text-xs font-medium text-red-500 border border-red-200 px-4 py-2.5 rounded-xl hover:bg-red-50 transition cursor-pointer"
                >
                    Permanently Delete Shop
                </button>
            </div>
        </div>
    );
};

export default AdminShopDetailPage;