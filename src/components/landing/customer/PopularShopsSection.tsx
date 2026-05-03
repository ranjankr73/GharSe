import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { RiArrowDownDoubleFill } from "react-icons/ri";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { getPublicShops } from "../../../features/publicShop/publicShopThunks";

const PopularShopsSection = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const { shops } = useAppSelector((state) => state.publicShop);

    const navigate = useNavigate();

    useEffect(() => {
        const params: Record<string, string | number> = {
            page: 1,
            limit: 4,
        };

        dispatch(getPublicShops(params));
    }, [dispatch]);

    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                {/* Heading */}
                <div className="text-center max-w-2xl mx-auto">
                    <p className="text-sm text-red-500 font-medium mb-2">
                        Popular nearby
                    </p>

                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                        Trusted local shops around you
                    </h2>

                    <p className="text-gray-500 text-sm md:text-base mt-3">
                        Discover highly rated stores delivering essentials,
                        groceries, and more right to your doorstep.
                    </p>
                </div>

                {/* Shop cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                    {shops.map((shop, index) => (
                        <motion.div
                            key={shop.name}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: index * 0.1,
                                duration: 0.4,
                            }}
                            viewport={{ once: true }}
                            onClick={() => {
                                user?.role === "customer"
                                    ? navigate(`/customer/shop/${shop._id}`)
                                    : navigate(`/shop/${shop._id}`);
                            }}
                            className="group bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                        >
                            {/* Shop visual placeholder */}
                            <div className="w-full h-32 rounded-xl bg-linear-to-br from-red-50 to-gray-50 flex items-center justify-center text-4xl mb-4">
                                🏪
                            </div>

                            {/* Badge */}
                            <span className="inline-flex px-2.5 py-1 rounded-full bg-red-50 text-red-500 text-xs font-medium mb-3">
                                {/* {shop.badge} */}
                                Best Seller
                            </span>

                            {/* Name */}
                            <h3 className="font-semibold text-gray-900">
                                {shop.name}
                            </h3>

                            {/* Category */}
                            <p className="text-sm text-gray-500 mt-1">
                                {/* {shop.category} */}
                                Fast Foods
                            </p>

                            {/* Meta */}
                            <div className="flex items-center justify-between mt-4 text-xs text-gray-600">
                                <span>⭐ {shop.rating}</span>
                                <span>🛵 {shop.deliveryTime} min</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div
                    onClick={() => {
                        user?.role === "customer"
                            ? navigate("/customer/browse-shops")
                            : navigate("/browse-shops");
                    }}
                    className="flex justify-center mt-12"
                >
                    <div className="flex flex-col items-center gap-2 text-center cursor-pointer group">
                        <RiArrowDownDoubleFill className="text-red-500 text-xl animate-bounce" />

                        <p className="text-sm font-medium text-slate-700 group-hover:text-red-500 transition">
                            Explore all shops
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PopularShopsSection;
