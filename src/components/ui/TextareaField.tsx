interface TextareaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
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
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      {/* Textarea */}
      <textarea
        rows={3}
        className={`
          w-full rounded-xl
          bg-gray-50 border border-gray-200
          px-4 py-2.5 text-sm text-gray-800
          placeholder-gray-400

          transition-all duration-200
          resize-none

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
      />

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

export default TextareaField;