interface StatCardProps {
    label: string;
    value: string;
    icon: string;
    trend?: string;
    variant?: "default" | "success" | "warning" | "danger";
}

const variantStyles = {
    default: {
        bg: "bg-white",
        iconBg: "bg-red-50",
        iconColor: "text-red-500",
    },
    success: {
        bg: "bg-white",
        iconBg: "bg-green-50",
        iconColor: "text-green-500",
    },
    warning: {
        bg: "bg-white",
        iconBg: "bg-amber-50",
        iconColor: "text-amber-500",
    },
    danger: {
        bg: "bg-white",
        iconBg: "bg-red-50",
        iconColor: "text-red-500",
    },
};

const StatCard: React.FC<StatCardProps> = ({
    label,
    value,
    icon,
    trend,
    variant = "default",
}) => {
    const styles = variantStyles[variant];

    return (
        <div
            className={`
      ${styles.bg}
      rounded-2xl p-5
      border border-gray-100
      shadow-sm
      transition-all duration-300
      hover:shadow-md hover:-translate-y-1
    `}
        >
            <div className="flex items-center justify-between">
                {/* LEFT */}
                <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {label}
                    </p>

                    <p className="text-2xl font-bold text-gray-900 mt-1">
                        {value}
                    </p>

                    {trend && (
                        <p className="text-xs text-green-600 font-semibold mt-1">
                            {trend}
                        </p>
                    )}
                </div>

                {/* ICON */}
                <div
                    className={`
          w-12 h-12 flex items-center justify-center
          rounded-xl text-xl
          ${styles.iconBg} ${styles.iconColor}
        `}
                >
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default StatCard;
