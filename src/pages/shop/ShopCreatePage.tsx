import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { createShop } from "../../features/shop/shopThunks";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";

interface FormData {
    name: string;
    phone: string;
}

const ShopCreatePage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { status, error } = useAppSelector((s) => s.shop);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        const result = await dispatch(createShop(data));
        if (createShop.fulfilled.match(result)) {
            toast.success("Shop created! Let's set it up.");
            navigate("/partner/dashboard/settings");
        } else {
            toast.error(error ?? "Failed to create shop");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <span className="text-2xl font-bold">
                        <span className="text-slate-800">Ghar</span>
                        <span className="text-red-500">Se</span>
                    </span>
                    <h1 className="text-lg font-semibold text-slate-800 mt-4">
                        Create your shop
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">
                        Start with the basics — you can update everything later
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <InputField
                        label="Shop Name"
                        placeholder="e.g. Fresh Basket"
                        error={errors.name?.message}
                        {...register("name", { required: "Shop name is required" })}
                    />
                    <InputField
                        label="Phone Number"
                        placeholder="e.g. 9876543210"
                        error={errors.phone?.message}
                        {...register("phone", { required: "Phone is required" })}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        isLoading={status === "loading"}
                    >
                        Create Shop
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ShopCreatePage;