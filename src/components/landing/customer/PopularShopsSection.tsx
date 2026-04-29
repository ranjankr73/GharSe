import { motion } from "framer-motion";
import Button from "../../ui/Button";
import { useNavigate } from "react-router";

const shops = [
    {
        name: "Fresh Basket",
        category: "Groceries",
        rating: "4.8",
        deliveryTime: "20–30 min",
        badge: "Best seller",
    },
    {
        name: "Daily Needs",
        category: "Essentials",
        rating: "4.6",
        deliveryTime: "15–25 min",
        badge: "Fast delivery",
    },
    {
        name: "Quick Mart",
        category: "Snacks & Drinks",
        rating: "4.7",
        deliveryTime: "25–35 min",
        badge: "Popular",
    },
    {
        name: "City Grocery",
        category: "Household",
        rating: "4.5",
        deliveryTime: "20–40 min",
        badge: "Trusted",
    },
];

const PopularShopsSection = () => {
    const navigate = useNavigate();

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
                            className="group bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            {/* Shop visual placeholder */}
                            <div className="w-full h-32 rounded-xl bg-linear-to-br from-red-50 to-gray-50 flex items-center justify-center text-4xl mb-4">
                                🏪
                            </div>

                            {/* Badge */}
                            <span className="inline-flex px-2.5 py-1 rounded-full bg-red-50 text-red-500 text-xs font-medium mb-3">
                                {shop.badge}
                            </span>

                            {/* Name */}
                            <h3 className="font-semibold text-gray-900">
                                {shop.name}
                            </h3>

                            {/* Category */}
                            <p className="text-sm text-gray-500 mt-1">
                                {shop.category}
                            </p>

                            {/* Meta */}
                            <div className="flex items-center justify-between mt-4 text-xs text-gray-600">
                                <span>⭐ {shop.rating}</span>
                                <span>🛵 {shop.deliveryTime}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="flex justify-center mt-10">
                    <Button
                        size="lg"
                        onClick={() => navigate("/browse-shops")}
                    >
                        Explore all shops
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default PopularShopsSection;