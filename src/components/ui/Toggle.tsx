interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}

const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
}) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      
      {/* Hidden checkbox (for accessibility) */}
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />

      {/* Toggle Track */}
      <div
        onClick={() => onChange(!checked)}
        className={`
          relative w-11 h-6 rounded-full
          transition-all duration-300
          ${checked ? "bg-red-500" : "bg-gray-300"}
        `}
      >
        {/* Thumb */}
        <span
          className={`
            absolute top-0.5 left-0.5
            w-5 h-5 rounded-full bg-white
            shadow-sm
            transition-all duration-300
            ${checked ? "translate-x-5" : "translate-x-0"}
          `}
        />
      </div>

      {/* Label */}
      {label && (
        <span className="text-sm font-medium text-gray-700">
          {label}
        </span>
      )}
    </label>
  );
};

export default Toggle;