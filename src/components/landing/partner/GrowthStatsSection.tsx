import { motion } from "framer-motion";

const stats = [
    {
        number: "30%",
        label: "Repeat customers",
    },
    {
        number: "2x",
        label: "Faster order handling",
    },
    {
        number: "24/7",
        label: "Business visibility",
    },
];

const GrowthStatsSection = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 text-center">
                <p className="text-sm text-red-500 font-medium mb-2">
                    Growth
                </p>

                <h2 className="text-2xl md:text-3xl font-semibold">
                    Built to help your shop grow
                </h2>

                <div className="grid md:grid-cols-3 gap-6 mt-14">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: index * 0.15,
                                duration: 0.4,
                            }}
                            viewport={{ once: true }}
                            className="bg-white border border-gray-100 rounded-2xl p-8"
                        >
                            <p className="text-4xl font-bold text-red-500">
                                {stat.number}
                            </p>

                            <p className="text-sm text-gray-500 mt-3">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GrowthStatsSection;