import { useNavigate } from "react-router";
import { useAppSelector } from "../../hooks/useAppSelector";
import { formatCurrency } from "../../utils/formatCurrency";

const StickyCartBar = () => {
    const navigate = useNavigate();
    const cart = useAppSelector((s) => s.cart.cart);

    const itemCount = cart?.totalItems ?? 0;
    const subtotal = cart?.subtotal ?? 0;

    if (itemCount === 0) return null;

    return (
        <div className="fixed bottom-4 left-0 right-0 z-40 px-4">
            <div className="max-w-2xl mx-auto">
                <button
                    onClick={() => navigate("/customer/cart")}
                    className="w-full flex items-center justify-between bg-red-500 hover:bg-red-600 text-white rounded-2xl px-5 py-4 shadow-lg transition active:scale-98 cursor-pointer"
                >
                    {/* Left */}
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <span className="text-xl">🛒</span>
                            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white text-red-500 text-xs font-bold flex items-center justify-center shadow-sm">
                                {itemCount}
                            </span>
                        </div>
                        <div className="text-left">
                            <p className="text-xs text-white/80">View cart</p>
                            <p className="text-sm font-medium">
                                {itemCount} item{itemCount > 1 ? "s" : ""}
                            </p>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">
                            {formatCurrency(subtotal)}
                        </span>
                        <span className="text-lg">→</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default StickyCartBar;