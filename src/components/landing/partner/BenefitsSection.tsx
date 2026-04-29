import { motion } from "framer-motion";

const benefits = [
    {
        title: "Reach more customers",
        description:
            "Make your shop visible to nearby customers looking to order instantly.",
        icon: "📈",
    },
    {
        title: "Accept orders digitally",
        description:
            "Receive and manage orders without calls or manual coordination.",
        icon: "🧾",
    },
    {
        title: "Manage products easily",
        description:
            "Update products, stock, and pricing in real time.",
        icon: "📦",
    },
    {
        title: "Track business growth",
        description:
            "Monitor orders, revenue, and customer trends from one dashboard.",
        icon: "📊",
    },
];

const BenefitsSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto">
                    <p className="text-sm text-red-500 font-medium mb-2">
                        Benefits
                    </p>

                    <h2 className="text-2xl md:text-3xl font-semibold">
                        Everything your shop needs to grow
                    </h2>

                    <p className="text-gray-500 mt-3">
                        Built to help local businesses sell better and operate
                        faster.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-14">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={benefit.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: index * 0.1,
                                duration: 0.4,
                            }}
                            viewport={{ once: true }}
                            className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm"
                        >
                            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-xl mb-4">
                                {benefit.icon}
                            </div>

                            <h3 className="font-semibold text-gray-900">
                                {benefit.title}
                            </h3>

                            <p className="text-sm text-gray-500 mt-2">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BenefitsSection;