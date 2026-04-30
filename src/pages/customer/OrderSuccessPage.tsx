import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getMyOrderById } from "../../features/customerOrder/customerOrderThunks";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import { formatCurrency } from "../../utils/formatCurrency";
import { motion } from "framer-motion";

const OrderSuccessPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { activeOrder, status } = useAppSelector((s) => s.customerOrder);

    useEffect(() => {
        if (orderId) dispatch(getMyOrderById(orderId));
    }, [orderId, dispatch]);

    if (status === "loading" || !activeOrder) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center"
                >
                    {/* Success icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <span className="text-4xl">🎉</span>
                    </motion.div>

                    <h1 className="text-xl font-bold text-gray-900 mb-1">
                        Order Placed!
                    </h1>
                    <p className="text-sm text-gray-500 mb-6">
                        Your order has been placed successfully. The shop will confirm it shortly.
                    </p>

                    {/* Order details */}
                    <div className="bg-gray-50 rounded-xl p-4 text-left space-y-2 mb-6">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Order ID</span>
                            <span className="font-mono font-semibold text-gray-800">
                                #{activeOrder._id.slice(-6).toUpperCase()}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Total</span>
                            <span className="font-semibold text-gray-800">
                                {formatCurrency(activeOrder.pricing.total)}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Payment</span>
                            <span className="font-semibold text-gray-800">
                                {activeOrder.payment.method}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Delivery to</span>
                            <span className="font-semibold text-gray-800 text-right max-w-[60%]">
                                {activeOrder.deliveryAddress.addressLine},{" "}
                                {activeOrder.deliveryAddress.city}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Button
                            fullWidth
                            onClick={() => navigate(`/customer/orders/${activeOrder._id}/track`)}
                        >
                            Track Order
                        </Button>
                        <Button
                            fullWidth
                            variant="outline"
                            onClick={() => navigate("/customer/browse-shops")}
                        >
                            Continue Shopping
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default OrderSuccessPage;