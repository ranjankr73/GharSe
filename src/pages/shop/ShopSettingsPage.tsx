import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
    updateShopProfile,
    updateShopAddress,
    updateDeliverySettings,
    updateBusinessDetails,
} from "../../features/shop/shopThunks";
import InputField from "../../components/ui/InputField";
import TextareaField from "../../components/ui/TextareaField";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import { uploadApi } from "../../services/axiosInstance";
import toast from "react-hot-toast";
import {
    Store,
    MapPin,
    Truck,
    FileText,
    CheckCircle,
    Camera,
    Loader2,
} from "lucide-react";

// ── Onboarding steps config ──────────────────────────────
const ONBOARDING_STEPS = [
    { step: 1, label: "Shop Created", icon: Store, description: "Basic info saved" },
    { step: 2, label: "Profile", icon: Store, description: "Logo, cover & tagline" },
    { step: 3, label: "Address", icon: MapPin, description: "Shop location" },
    { step: 4, label: "Delivery", icon: Truck, description: "Delivery settings" },
    { step: 5, label: "Business", icon: FileText, description: "GST, PAN details" },
];

// ── Form interfaces ──────────────────────────────────────
interface ProfileForm {
    name: string;
    tagline: string;
    phone: string;
}

interface AddressForm {
    addressLine: string;
    city: string;
    state: string;
    pinCode: string;
}

interface DeliveryForm {
    deliveryTime: string;
    deliveryFee: string;
    minOrder: string;
}

interface BusinessForm {
    gstNumber: string;
    panNumber: string;
    fssaiLicense: string;
}

// ── Section wrapper ──────────────────────────────────────
const SettingsSection = ({
    title,
    icon: Icon,
    step,
    currentStep,
    children,
}: {
    title: string;
    icon: React.ElementType;
    step: number;
    currentStep: number;
    children: React.ReactNode;
}) => {
    const isDone = currentStep > step;

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
            <div className="flex items-center gap-3">
                <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isDone ? "bg-green-50" : "bg-red-50"
                    }`}
                >
                    <Icon
                        size={16}
                        className={isDone ? "text-green-500" : "text-red-500"}
                    />
                </div>
                <div className="flex-1">
                    <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
                </div>
                {isDone && (
                    <CheckCircle size={16} className="text-green-500 shrink-0" />
                )}
            </div>
            {children}
        </div>
    );
};

// ── Main page ────────────────────────────────────────────
const ShopSettingsPage = () => {
    const dispatch = useAppDispatch();
    const { activeShop, status } = useAppSelector((s) => s.shop);
    const [uploadingLogo, setUploadingLogo] = useState(false);
    const [uploadingCover, setUploadingCover] = useState(false);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [coverPreview, setCoverPreview] = useState<string | null>(null);
    // const logoFileRef = { current: null as File | null };
    // const coverFileRef = { current: null as File | null };

    // ── Profile form ─────────────────────────────────────
    const {
        register: regProfile,
        handleSubmit: submitProfile,
        reset: resetProfile,
        formState: { errors: profileErrors },
    } = useForm<ProfileForm>();

    // ── Address form ─────────────────────────────────────
    const {
        register: regAddress,
        handleSubmit: submitAddress,
        reset: resetAddress,
        formState: { errors: addressErrors },
    } = useForm<AddressForm>();

    // ── Delivery form ────────────────────────────────────
    const {
        register: regDelivery,
        handleSubmit: submitDelivery,
        reset: resetDelivery,
    } = useForm<DeliveryForm>();

    // ── Business form ────────────────────────────────────
    const {
        register: regBusiness,
        handleSubmit: submitBusiness,
        reset: resetBusiness,
    } = useForm<BusinessForm>();

    // Populate all forms when shop loads
    useEffect(() => {
        if (!activeShop) return;

        resetProfile({
            name: activeShop.name,
            tagline: activeShop.tagline ?? "",
            phone: activeShop.phone,
        });

        resetAddress({
            addressLine: activeShop.address?.addressLine ?? "",
            city: activeShop.address?.city ?? "",
            state: activeShop.address?.state ?? "",
            pinCode: activeShop.address?.pinCode ?? "",
        });

        resetDelivery({
            deliveryTime: activeShop.deliveryTime?.toString() ?? "",
            deliveryFee: activeShop.deliveryFee?.toString() ?? "",
            minOrder: activeShop.minOrder?.toString() ?? "",
        });

        resetBusiness({
            gstNumber: activeShop.businessDetails?.gstNumber ?? "",
            panNumber: activeShop.businessDetails?.panNumber ?? "",
            fssaiLicense: activeShop.businessDetails?.fssaiLicense ?? "",
        });

        setLogoPreview(activeShop.logo ?? null);
        setCoverPreview(activeShop.coverImage ?? null);
    }, [activeShop]);

    if (!activeShop) {
        return <EmptyState icon="🏪" title="No shop selected" />;
    }

    // ── Image upload helper ──────────────────────────────
    const handleImageUpload = async (
        file: File,
        type: "logo" | "coverImage"
    ): Promise<string | null> => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", type);

        try {
            const res = await uploadApi.post("/uploads", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res.data.url;
        } catch {
            toast.error("Image upload failed");
            return null;
        }
    };

    // ── Logo change ──────────────────────────────────────
    const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLogoPreview(URL.createObjectURL(file));
        setUploadingLogo(true);

        const url = await handleImageUpload(file, "logo");
        setUploadingLogo(false);

        if (url) {
            const result = await dispatch(
                updateShopProfile({ shopId: activeShop._id, data: { logo: url } })
            );
            if (updateShopProfile.fulfilled.match(result)) {
                toast.success("Logo updated");
            }
        }
    };

    // ── Cover change ─────────────────────────────────────
    const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setCoverPreview(URL.createObjectURL(file));
        setUploadingCover(true);

        const url = await handleImageUpload(file, "coverImage");
        setUploadingCover(false);

        if (url) {
            const result = await dispatch(
                updateShopProfile({ shopId: activeShop._id, data: { coverImage: url } })
            );
            if (updateShopProfile.fulfilled.match(result)) {
                toast.success("Cover image updated");
            }
        }
    };

    // ── Submit handlers ──────────────────────────────────
    const onProfileSubmit = async (data: ProfileForm) => {
        const result = await dispatch(
            updateShopProfile({ shopId: activeShop._id, data })
        );
        if (updateShopProfile.fulfilled.match(result)) {
            toast.success("Profile updated");
        } else {
            toast.error("Failed to update profile");
        }
    };

    const onAddressSubmit = async (data: AddressForm) => {
        const result = await dispatch(
            updateShopAddress({ shopId: activeShop._id, data })
        );
        if (updateShopAddress.fulfilled.match(result)) {
            toast.success("Address updated");
        } else {
            toast.error("Failed to update address");
        }
    };

    const onDeliverySubmit = async (data: DeliveryForm) => {
        const result = await dispatch(
            updateDeliverySettings({
                shopId: activeShop._id,
                data: {
                    deliveryTime: data.deliveryTime ? Number(data.deliveryTime) : undefined,
                    deliveryFee: data.deliveryFee ? Number(data.deliveryFee) : undefined,
                    minOrder: data.minOrder ? Number(data.minOrder) : undefined,
                },
            })
        );
        if (updateDeliverySettings.fulfilled.match(result)) {
            toast.success("Delivery settings updated");
        } else {
            toast.error("Failed to update delivery settings");
        }
    };

    const onBusinessSubmit = async (data: BusinessForm) => {
        const result = await dispatch(
            updateBusinessDetails({ shopId: activeShop._id, data })
        );
        if (updateBusinessDetails.fulfilled.match(result)) {
            toast.success("Business details updated");
        } else {
            toast.error("Failed to update business details");
        }
    };

    return (
        <div className="max-w-2xl space-y-6">

            {/* ── Onboarding Progress ────────────────────── */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-slate-800">
                        Setup Progress
                    </h2>
                    <span className="text-xs text-slate-400">
                        Step {Math.min(activeShop.onboardingStep, 5)} of 5
                    </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 rounded-full h-1.5 mb-5">
                    <div
                        className="bg-red-500 h-1.5 rounded-full transition-all duration-500"
                        style={{
                            width: `${(Math.min(activeShop.onboardingStep, 5) / 5) * 100}%`,
                        }}
                    />
                </div>

                {/* Steps */}
                <div className="grid grid-cols-5 gap-2">
                    {ONBOARDING_STEPS.map(({ step, label, icon: Icon }) => {
                        const isDone = activeShop.onboardingStep > step;
                        const isCurrent = activeShop.onboardingStep === step;

                        return (
                            <div key={step} className="flex flex-col items-center gap-1.5">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                        isDone
                                            ? "bg-green-500"
                                            : isCurrent
                                            ? "bg-red-500"
                                            : "bg-slate-100"
                                    }`}
                                >
                                    {isDone ? (
                                        <CheckCircle size={14} className="text-white" />
                                    ) : (
                                        <Icon
                                            size={13}
                                            className={
                                                isCurrent ? "text-white" : "text-slate-400"
                                            }
                                        />
                                    )}
                                </div>
                                <p
                                    className={`text-xs text-center leading-tight ${
                                        isDone || isCurrent
                                            ? "text-slate-700 font-medium"
                                            : "text-slate-400"
                                    }`}
                                >
                                    {label}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Verification status */}
                {!activeShop.isVerified && (
                    <div className="mt-4 bg-yellow-50 border border-yellow-100 rounded-xl p-3 text-xs text-yellow-700">
                        ⏳ Your shop is pending admin verification. Complete your profile to speed up the process.
                    </div>
                )}
                {activeShop.isVerified && (
                    <div className="mt-4 bg-green-50 border border-green-100 rounded-xl p-3 text-xs text-green-700">
                        ✅ Shop verified and live! Customers can now find and order from your shop.
                    </div>
                )}
            </div>

            {/* ── Profile ────────────────────────────────── */}
            <SettingsSection
                title="Shop Profile"
                icon={Store}
                step={2}
                currentStep={activeShop.onboardingStep}
            >
                {/* Cover image */}
                <div className="relative h-32 bg-slate-100 rounded-xl overflow-hidden group">
                    {coverPreview ? (
                        <img
                            src={coverPreview}
                            alt="Cover"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                            Click to add cover image
                        </div>
                    )}
                    <label className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition cursor-pointer">
                        {uploadingCover ? (
                            <Loader2 size={18} className="text-white animate-spin" />
                        ) : (
                            <div className="flex items-center gap-1.5 text-white text-xs font-medium">
                                <Camera size={14} />
                                Change Cover
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleCoverChange}
                        />
                    </label>
                </div>

                {/* Logo */}
                <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 bg-slate-100 rounded-xl overflow-hidden group shrink-0">
                        {logoPreview ? (
                            <img
                                src={logoPreview}
                                alt="Logo"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl">
                                🏪
                            </div>
                        )}
                        <label className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition cursor-pointer">
                            {uploadingLogo ? (
                                <Loader2 size={14} className="text-white animate-spin" />
                            ) : (
                                <Camera size={14} className="text-white" />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleLogoChange}
                            />
                        </label>
                    </div>
                    <div className="text-xs text-slate-400">
                        <p className="font-medium text-slate-600">Shop Logo</p>
                        <p>Recommended: 200×200px</p>
                        <p>Cover: 1200×400px</p>
                    </div>
                </div>

                <form
                    onSubmit={submitProfile(onProfileSubmit)}
                    className="space-y-4"
                >
                    <InputField
                        label="Shop Name *"
                        error={profileErrors.name?.message}
                        {...regProfile("name", { required: "Name is required" })}
                    />
                    <InputField
                        label="Tagline"
                        placeholder="e.g. Fresh groceries delivered fast"
                        {...regProfile("tagline")}
                    />
                    <InputField
                        label="Phone *"
                        error={profileErrors.phone?.message}
                        {...regProfile("phone", { required: "Phone is required" })}
                    />
                    <Button
                        type="submit"
                        isLoading={status === "loading"}
                    >
                        Save Profile
                    </Button>
                </form>
            </SettingsSection>

            {/* ── Address ────────────────────────────────── */}
            <SettingsSection
                title="Shop Address"
                icon={MapPin}
                step={3}
                currentStep={activeShop.onboardingStep}
            >
                <p className="text-xs text-slate-400">
                    Update your shop's address to keep your profile accurate.
                </p>
                <form
                    onSubmit={submitAddress(onAddressSubmit)}
                    className="space-y-4"
                >
                    <TextareaField
                        label="Address Line *"
                        placeholder="House/Shop no, Street, Area"
                        error={addressErrors.addressLine?.message}
                        {...regAddress("addressLine", {
                            required: "Address line is required",
                        })}
                    />
                    <div className="grid grid-cols-3 gap-3">
                        <InputField
                            label="City *"
                            error={addressErrors.city?.message}
                            {...regAddress("city", { required: "City is required" })}
                        />
                        <InputField
                            label="State *"
                            error={addressErrors.state?.message}
                            {...regAddress("state", { required: "State is required" })}
                        />
                        <InputField
                            label="PIN Code *"
                            error={addressErrors.pinCode?.message}
                            {...regAddress("pinCode", {
                                required: "PIN is required",
                                pattern: {
                                    value: /^\d{6}$/,
                                    message: "Enter a valid 6-digit PIN",
                                },
                            })}
                        />
                    </div>
                    <Button
                        type="submit"
                        isLoading={status === "loading"}
                    >
                        Save Address
                    </Button>
                </form>
            </SettingsSection>

            {/* ── Delivery Settings ───────────────────────── */}
            <SettingsSection
                title="Delivery Settings"
                icon={Truck}
                step={4}
                currentStep={activeShop.onboardingStep}
            >
                <p className="text-xs text-slate-400">
                    These will be shown to customers while browsing your shop.
                </p>
                <form
                    onSubmit={submitDelivery(onDeliverySubmit)}
                    className="space-y-4"
                >
                    <div className="grid grid-cols-3 gap-3">
                        <InputField
                            label="Delivery Time (min)"
                            type="number"
                            placeholder="e.g. 30"
                            {...regDelivery("deliveryTime")}
                        />
                        <InputField
                            label="Delivery Fee (₹)"
                            type="number"
                            placeholder="e.g. 20"
                            {...regDelivery("deliveryFee")}
                        />
                        <InputField
                            label="Min. Order (₹)"
                            type="number"
                            placeholder="e.g. 100"
                            {...regDelivery("minOrder")}
                        />
                    </div>

                    {/* Preview card */}
                    <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-4 text-xs text-slate-600">
                        <span>🛵 {activeShop.deliveryTime ?? "—"} min</span>
                        <span>·</span>
                        <span>₹{activeShop.deliveryFee ?? "—"} delivery</span>
                        <span>·</span>
                        <span>Min ₹{activeShop.minOrder ?? "—"}</span>
                    </div>

                    <Button
                        type="submit"
                        isLoading={status === "loading"}
                    >
                        Save Delivery Settings
                    </Button>
                </form>
            </SettingsSection>

            {/* ── Business Details ────────────────────────── */}
            <SettingsSection
                title="Business Details"
                icon={FileText}
                step={5}
                currentStep={activeShop.onboardingStep}
            >
                <p className="text-xs text-slate-400">
                    Required for verification. Kept confidential and used only for compliance.
                </p>
                <form
                    onSubmit={submitBusiness(onBusinessSubmit)}
                    className="space-y-4"
                >
                    <InputField
                        label="GST Number"
                        placeholder="e.g. 22AAAAA0000A1Z5"
                        {...regBusiness("gstNumber")}
                    />
                    <InputField
                        label="PAN Number"
                        placeholder="e.g. ABCDE1234F"
                        {...regBusiness("panNumber")}
                    />
                    <InputField
                        label="FSSAI License"
                        placeholder="For food businesses only"
                        {...regBusiness("fssaiLicense")}
                    />

                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700">
                        After submitting business details, admin will review and verify your shop within 24-48 hours.
                    </div>

                    <Button
                        type="submit"
                        isLoading={status === "loading"}
                    >
                        Save Business Details
                    </Button>
                </form>
            </SettingsSection>

            {/* ── Danger Zone ─────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-5">
                <h2 className="text-sm font-semibold text-slate-800 mb-1">
                    Danger Zone
                </h2>
                <p className="text-xs text-slate-400 mb-4">
                    These actions are irreversible. Please proceed with caution.
                </p>
                <button
                    onClick={async () => {
                        if (
                            !confirm(
                                "Are you sure you want to deactivate this shop? This will hide it from customers."
                            )
                        )
                            return;
                        toast.error("Contact support to deactivate your shop.");
                    }}
                    className="text-xs font-medium text-red-500 border border-red-200 px-4 py-2.5 rounded-xl hover:bg-red-50 transition cursor-pointer"
                >
                    Deactivate Shop
                </button>
            </div>
        </div>
    );
};

export default ShopSettingsPage;