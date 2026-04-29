interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  icon,
  className = "",
  disabled,
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97]";

  const variants = {
    primary:
      "bg-red-500 hover:bg-red-600 text-white focus:ring-red-400 shadow-sm hover:shadow-md",

    secondary:
      "bg-gray-900 hover:bg-gray-800 text-white focus:ring-gray-400",

    ghost:
      "bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-300",

    danger:
      "bg-red-100 hover:bg-red-200 text-red-600 focus:ring-red-300",

    outline:
      "border border-gray-200 text-gray-700 hover:bg-gray-50 focus:ring-gray-300",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`
        ${base}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {/* Spinner */}
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
      ) : (
        icon && <span className="text-lg">{icon}</span>
      )}

      {children}
    </button>
  );
};

export default Button;