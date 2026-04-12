interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  error?: string;
  hint?: string;
  required?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  error,
  hint,
  required,
  className = "",
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      
      {/* Label */}
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && (
          <span className="text-red-500 ml-0.5">*</span>
        )}
      </label>

      {/* Select */}
      <div className="relative">
        <select
          className={`
            w-full rounded-xl
            bg-gray-50 border border-gray-200
            px-4 py-2.5 text-sm text-gray-800
            appearance-none

            transition-all duration-200
            focus:outline-none focus:bg-white
            focus:ring-2 focus:ring-red-400 focus:border-red-400

            ${
              error
                ? "border-red-400 focus:ring-red-300 focus:border-red-400"
                : ""
            }

            ${className}
          `}
          {...props}
        >
          <option value="" disabled>
            Select an option
          </option>

          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Dropdown Icon */}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
          ▼
        </span>
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

export default SelectField;