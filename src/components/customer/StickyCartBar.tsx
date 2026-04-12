import React from "react";
import { useNavigate } from "react-router";
import { formatCurrency } from "../../utils";
import Button from "../../components/ui/Button";

interface StickyCartBarProps {
    itemCount: number;
    total: number;
    shopId: string;
}

const StickyCartBar: React.FC<StickyCartBarProps> = ({ itemCount, total }) => {
    const navigate = useNavigate();

    if (itemCount === 0) return null;

    return (
        <div className="fixed bottom-16 md:bottom-2 left-0 right-0 z-40 px-4 pb-2">
          
            {/* Bar */}
            <div className="relative max-w-2xl mx-auto">
                <Button
                    onClick={() => navigate("/cart")}
                    fullWidth
                    size="lg"
                    className="
            flex items-center justify-between
            rounded-2xl shadow-lg
          "
                >
                    {/* LEFT */}
                    <div className="flex items-center gap-3">
                        {/* Cart Icon */}
                        <div className="relative">
                            <span className="text-xl">🛒</span>

                            <span
                                className="
                absolute -top-2 -right-2
                w-5 h-5 rounded-full
                bg-white text-red-500
                text-xs font-bold flex items-center justify-center
                shadow-sm
              "
                            >
                                {itemCount}
                            </span>
                        </div>

                        {/* Text */}
                        <div className="text-left">
                            <p className="text-[11px] text-white/80">
                                View cart
                            </p>
                            <p className="text-sm font-medium">
                                {itemCount} item{itemCount > 1 ? "s" : ""}
                            </p>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">
                            {formatCurrency(total)}
                        </span>

                        <span className="text-lg">→</span>
                    </div>
                </Button>
            </div>
        </div>
    );
};

export default StickyCartBar;
