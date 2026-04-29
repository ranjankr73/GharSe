import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getCart, clearCart } from "../../features/cart/cartThunks";
import CartItem from "../../components/customer/CartItem";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";
import { formatCurrency } from "../../utils/formatCurrency";
import { ArrowLeft, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const CartPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { cart, status } = useAppSelector((s) => s.cart);
    const { isAuthenticated } = useAppSelector((s) => s.auth);

    useEffect(() => {
        if (isAuthenticated) dispatch(getCart());
    }, [isAuthenticated, dispatch]);

    const handleClear = async () => {
        if (!confirm("Clear your cart?")) return;
        await dispatch(clearCart());
        toast.success("Cart cleared");
    };

    const shop =
        cart?.shop && typeof cart.shop === "object" ? cart.shop : null;
    const subtotal = cart?.subtotal ?? 0;
    const deliveryFee = shop?.deliveryFee ?? 0;
    const platformFee = 5;
    const total = subtotal + deliveryFee + platformFee;
    const minOrder = shop?.minOrder ?? 0;
    const belowMinOrder = minOrder > 0 && subtotal < minOrder;

    if (status === "loading" && !cart) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 cursor-pointer"
                    >
                        <ArrowLeft size={16} />
                    </button>
                    <h1 className="text-lg font-bold text-gray-900 flex-1">
                        Your Cart
                    </h1>
                    {cart && cart.items.length > 0 && (
                        <button
                            onClick={handleClear}
                            className="p-2 text-red-400 hover:text-red-600 cursor-pointer"
                        >
                            <Trash2 size={16} />
                        </button>
                    )}
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
                {!cart || cart.items.length === 0 ? (
                    <EmptyState
                        icon="🛒"
                        title="Your cart is empty"
                        description="Add items from a shop to get started"
                        action={
                            <Button
                                onClick={() => navigate("/user/browse-shops")}
                            >
                                Browse Shops
                            </Button>
                        }
                    />
                ) : (
                    <>
                        {/* Shop info */}
                        {shop && (
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
                                {shop.logo && (
                                    <img
                                        src={shop.logo}
                                        alt={shop.name}
                                        className="w-10 h-10 rounded-xl object-cover"
                                    />
                                )}
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">
                                        {shop.name}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {cart.items.length} items
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Cart items */}
                        <div className="space-y-3">
                            {cart.items.map((item) => (
                                <CartItem key={item._id} item={item} />
                            ))}
                        </div>

                        {/* Min order warning */}
                        {belowMinOrder && (
                            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-3 text-xs text-yellow-700">
                                Add ₹{minOrder - subtotal} more to meet the minimum order of ₹{minOrder}
                            </div>
                        )}

                        {/* Bill summary */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
                            <h3 className="text-sm font-semibold text-gray-800">
                                Bill Summary
                            </h3>
                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>{formatCurrency(subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery fee</span>
                                    <span>
                                        {deliveryFee === 0
                                            ? "Free"
                                            : formatCurrency(deliveryFee)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Platform fee</span>
                                    <span>{formatCurrency(platformFee)}</span>
                                </div>
                                <div className="flex justify-between font-semibold text-gray-900 border-t border-gray-100 pt-2">
                                    <span>Total</span>
                                    <span>{formatCurrency(total)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Checkout button */}
                        <Button
                            fullWidth
                            size="lg"
                            disabled={belowMinOrder || !shop?.isOpen}
                            onClick={() => {
                                if (!isAuthenticated) {
                                    navigate("/login/customer");
                                    return;
                                }
                                navigate("/user/checkout");
                            }}
                        >
                            {!shop?.isOpen
                                ? "Shop is closed"
                                : belowMinOrder
                                ? `Min order ₹${minOrder}`
                                : `Proceed to Checkout • ${formatCurrency(total)}`}
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartPage;