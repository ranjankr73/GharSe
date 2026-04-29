interface BadgeProps {
    label: string;
    variant?: "green" | "yellow" | "red" | "blue" | "gray" | "orange";
}

const variantStyles = {
    green: "bg-green-50 text-green-700 border-green-100",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-100",
    red: "bg-red-50 text-red-700 border-red-100",
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    gray: "bg-gray-50 text-gray-600 border-gray-100",
    orange: "bg-orange-50 text-orange-700 border-orange-100",
};

const Badge = ({ label, variant = "gray" }: BadgeProps) => (
    <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantStyles[variant]}`}
    >
        {label}
    </span>
);

export default Badge;