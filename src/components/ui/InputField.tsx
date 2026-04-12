interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  hint,
  icon,
  className = "",
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      
      {/* Label */}
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      {/* Input Wrapper */}
      <div className="relative">
        
        {/* Icon */}
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
            {icon}
          </span>
        )}

        {/* Input */}
        <input
          className={`
            w-full rounded-xl bg-gray-50
            border border-gray-200
            px-4 py-2.5 text-sm text-gray-800
            placeholder-gray-400

            transition-all duration-200
            focus:outline-none focus:bg-white
            focus:ring-2 focus:ring-red-400 focus:border-red-400

            ${icon ? "pl-10" : ""}
            ${
              error
                ? "border-red-400 focus:ring-red-300 focus:border-red-400"
                : ""
            }

            ${className}
          `}
          {...props}
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-xs text-red-500 font-medium mt-0.5">
          {error}
        </p>
      )}

      {/* Hint */}
      {hint && !error && (
        <p className="text-xs text-gray-400 mt-0.5">
          {hint}
        </p>
      )}
    </div>
  );
};

export default InputField;