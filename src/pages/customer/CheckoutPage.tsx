import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { placeOrder } from "../../features/customerOrder/customerOrderThunks";
import { getCart } from "../../features/cart/cartThunks";
import InputField from "../../components/ui/InputField";
import TextareaField from "../../components/ui/TextareaField";
import Button from "../../components/ui/Button";
import { formatCurrency } from "../../utils/formatCurrency";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

interface FormData {
    addressLine: string;
    city: string;
    state: string;
    pinCode: string;
    customerNote: string;
}

const CheckoutPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { cart } = useAppSelector((s) => s.cart);
    const { status } = useAppSelector((s) => s.customerOrder);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    useEffect(() => {
        if (!cart || cart.items.length === 0) {
            navigate("/customer/cart");
        }
    }, [cart, navigate]);

    const shop =
        cart?.shop && typeof cart.shop === "object" ? cart.shop : null;
    const subtotal = cart?.subtotal ?? 0;
    const deliveryFee = shop?.deliveryFee ?? 0;
    const platformFee = 5;
    const total = subtotal + deliveryFee + platformFee;

    const onSubmit = async (data: FormData) => {
        const result = await dispatch(
            placeOrder({
                deliveryAddress: {
                    addressLine: data.addressLine,
                    city: data.city,
                    state: data.state,
                    pinCode: data.pinCode,
                },
                paymentMethod: "COD",
                customerNote: data.customerNote || undefined,
            })
        );

        if (placeOrder.fulfilled.match(result)) {
            toast.success("Order placed successfully! 🎉");
            navigate(`/customer/orders/${result.payload.order._id}/success`);
        } else {
            toast.error(result.payload as string ?? "Failed to place order");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
                    <button
                        onClick={() => navigate("/customer/cart")}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 cursor-pointer"
                    >
                        <ArrowLeft size={16} />
                    </button>
                    <h1 className="text-lg font-bold text-gray-900">
                        Checkout
                    </h1>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 py-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Delivery address */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
                        <h2 className="text-sm font-semibold text-gray-800">
                            📍 Delivery Address
                        </h2>
                        <TextareaField
                            label="Address Line *"
                            placeholder="House/Flat no, Street, Area"
                            error={errors.addressLine?.message}
                            {...register("addressLine", {
                                required: "Address is required",
                            })}
                        />
                        <div className="grid grid-cols-3 gap-3">
                            <InputField
                                label="City *"
                                error={errors.city?.message}
                                {...register("city", {
                                    required: "City is required",
                                })}
                            />
                            <InputField
                                label="State *"
                                error={errors.state?.message}
                                {...register("state", {
                                    required: "State is required",
                                })}
                            />
                            <InputField
                                label="PIN Code *"
                                error={errors.pinCode?.message}
                                {...register("pinCode", {
                                    required: "PIN is required",
                                    pattern: {
                                        value: /^\d{6}$/,
                                        message: "Enter valid 6-digit PIN",
                                    },
                                })}
                            />
                        </div>
                    </div>

                    {/* Payment method */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                        <h2 className="text-sm font-semibold text-gray-800 mb-3">
                            💳 Payment Method
                        </h2>
                        <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-xl">
                            <div className="w-4 h-4 rounded-full border-2 border-green-500 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-800">
                                    Cash on Delivery
                                </p>
                                <p className="text-xs text-gray-500">
                                    Pay when your order arrives
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Note */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                        <h2 className="text-sm font-semibold text-gray-800 mb-3">
                            📝 Order Note (Optional)
                        </h2>
                        <TextareaField
                            label=""
                            placeholder="Any special instructions for the shop..."
                            {...register("customerNote")}
                        />
                    </div>

                    {/* Order summary */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
                        <h2 className="text-sm font-semibold text-gray-800">
                            Order Summary
                        </h2>
                        {cart?.items.map((item) => (
                            <div
                                key={item._id}
                                className="flex justify-between text-sm text-gray-600"
                            >
                                <span>
                                    {item.snapshot.name} ×{item.quantity}
                                </span>
                                <span>
                                    {formatCurrency(
                                        item.snapshot.price * item.quantity
                                    )}
                                </span>
                            </div>
                        ))}
                        <div className="border-t border-gray-100 pt-3 space-y-2">
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Subtotal</span>
                                <span>{formatCurrency(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Delivery fee</span>
                                <span>
                                    {deliveryFee === 0
                                        ? "Free"
                                        : formatCurrency(deliveryFee)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Platform fee</span>
                                <span>{formatCurrency(platformFee)}</span>
                            </div>
                            <div className="flex justify-between font-semibold text-gray-900 text-base pt-1">
                                <span>Total</span>
                                <span>{formatCurrency(total)}</span>
                            </div>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        size="lg"
                        isLoading={status === "loading"}
                    >
                        Place Order • {formatCurrency(total)}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;