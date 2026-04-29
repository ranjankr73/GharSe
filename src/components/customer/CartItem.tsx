import { useAppDispatch } from "../../hooks/useAppDispatch";
import { updateCartItem, removeCartItem } from "../../features/cart/cartThunks";
import type { CartItem as CartItemType } from "../../features/cart/cartTypes";
import { formatCurrency } from "../../utils/formatCurrency";
import toast from "react-hot-toast";

interface Props {
    item: CartItemType;
}

const CartItem = ({ item }: Props) => {
    const dispatch = useAppDispatch();

    const handleRemove = async () => {
        await dispatch(removeCartItem(item._id));
        toast(`${item.snapshot.name} removed`, { duration: 1200 });
    };

    const handleQtyChange = async (newQty: number) => {
        if (newQty <= 0) {
            handleRemove();
        } else {
            await dispatch(updateCartItem({ itemId: item._id, quantity: newQty }));
        }
    };

    return (
        <div className="flex gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
            {/* Image */}
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0 my-auto">
                {item.snapshot.image ? (
                    <img
                        src={item.snapshot.image}
                        alt={item.snapshot.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                        }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">
                        📦
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
                {/* Top */}
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <h3 className="text-sm font-medium text-gray-800 line-clamp-1">
                            {item.snapshot.name}
                        </h3>
                        {item.snapshot.variantName && (
                            <p className="text-xs text-gray-400 mt-0.5">
                                {item.snapshot.variantName}
                            </p>
                        )}
                        {item.snapshot.unit && (
                            <p className="text-xs text-gray-400">
                                {item.snapshot.unit}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={handleRemove}
                        className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition cursor-pointer shrink-0"
                    >
                        ✕
                    </button>
                </div>

                {/* Price + qty */}
                <div className="flex items-center justify-between mt-2">
                    {/* Qty control */}
                    <div className="flex items-center gap-2 bg-red-50 rounded-xl px-2 py-1">
                        <button
                            onClick={() => handleQtyChange(item.quantity - 1)}
                            className="w-7 h-7 rounded-lg bg-red-500 text-white flex items-center justify-center active:scale-90 transition cursor-pointer"
                        >
                            −
                        </button>
                        <span className="w-5 text-center text-sm font-semibold text-red-600">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => handleQtyChange(item.quantity + 1)}
                            className="w-7 h-7 rounded-lg bg-red-500 text-white flex items-center justify-center active:scale-90 transition cursor-pointer"
                        >
                            +
                        </button>
                    </div>

                    {/* Subtotal */}
                    <span className="text-sm font-semibold text-gray-900">
                        {formatCurrency(item.snapshot.price * item.quantity)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CartItem;