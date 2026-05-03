import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { RiArrowRightLine } from "react-icons/ri";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { getPublicShops } from "../../../features/publicShop/publicShopThunks";

const PopularShopsSection = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { user } = useAppSelector((state) => state.auth);
    const { shops } = useAppSelector((state) => state.publicShop);

    useEffect(() => {
        const params: Record<string, string | number> = {
            page: 1,
            limit: 4,
        };

        dispatch(
            getPublicShops(params)
        );
    }, [dispatch]);

    return (
        <section className="py-24">
            <div className="max-w-6xl mx-auto px-4">
                {/* Heading */}
                <div className="text-center max-w-2xl mx-auto">
                    <p className="text-sm text-red-500 font-medium mb-2">
                        Popular nearby
                    </p>

                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
                        Trusted local shops around you
                    </h2>

                    <p className="text-gray-500 text-sm md:text-base mt-4 leading-relaxed">
                        Discover highly rated stores delivering essentials,
                        groceries, and daily needs right to your doorstep.
                    </p>
                </div>

                {/* Shops */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
                    {shops.map((shop, index) => (
                        <motion.div
                            key={shop._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.45,
                                delay: index * 0.12,
                            }}
                            viewport={{ once: true }}
                            onClick={() =>
                                user?.role === "customer"
                                    ? navigate(`/customer/shop/${shop._id}`)
                                    : navigate(`/shop/${shop._id}`)
                            }
                            className="group rounded-3xl overflow-hidden bg-white border border-gray-100 hover:border-red-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                        >
                            {/* Cover */}
                            <div className="relative h-40 bg-linear-to-br from-red-50 via-white to-red-100 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                                    🏪
                                </div>

                                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-red-500 text-xs font-medium shadow-sm">
                                    Best Seller
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="font-semibold text-gray-900 truncate">
                                    {shop.name}
                                </h3>

                                <p className="text-sm text-gray-500 mt-1">
                                    Fast foods • Daily essentials
                                </p>

                                {/* Divider */}
                                <div className="h-px bg-gray-100 my-4" />

                                {/* Meta */}
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-1 text-gray-600">
                                        <span>⭐</span>
                                        <span>{shop.rating}</span>
                                    </div>

                                    <div className="flex items-center gap-1 text-gray-600">
                                        <span>🛵</span>
                                        <span>{shop.deliveryTime} min</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <div className="flex justify-center mt-14">
                    <button
                        onClick={() =>
                            user?.role === "customer"
                                ? navigate("/customer/browse-shops")
                                : navigate("/browse-shops")
                        }
                        className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-red-500 text-white text-sm font-medium shadow-sm hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer"
                    >
                        Explore all shops

                        <RiArrowRightLine className="text-lg group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PopularShopsSection;