const features = [
  {
    title: "Instant ordering",
    desc: "Place orders directly without calling the shop",
    icon: "⚡",
  },
  {
    title: "Real-time tracking",
    desc: "Track your order status from start to delivery",
    icon: "📦",
  },
  {
    title: "Local shop support",
    desc: "Order from trusted shops near your location",
    icon: "🏪",
  },
  {
    title: "No middleman",
    desc: "Direct connection between you and the shop",
    icon: "💸",
  },
  {
    title: "Mobile-first",
    desc: "Designed for fast and smooth mobile experience",
    icon: "📱",
  },
  {
    title: "Live updates",
    desc: "Get instant updates on your order progress",
    icon: "🔔",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        
        {/* 🔥 Heading */}
        <p className="text-sm text-red-500 font-medium mb-2">
          Features
        </p>

        <h2 className="text-2xl md:text-3xl font-semibold">
          Why people love GharSe
        </h2>

        <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
          Everything you need to order from local shops — fast and hassle-free
        </p>

        {/* 🔥 Feature cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white border border-gray-100 rounded-2xl p-5 text-left shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              
              {/* Icon */}
              <div className="w-10 h-10 flex items-center justify-center text-lg bg-red-50 text-red-500 rounded-xl mb-3 group-hover:scale-110 transition">
                {f.icon}
              </div>

              {/* Title */}
              <h3 className="font-semibold text-gray-800 text-sm">
                {f.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;