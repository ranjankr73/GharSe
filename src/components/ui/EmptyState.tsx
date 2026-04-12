interface EmptyStateProps {
  icon: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      
      {/* Icon Container */}
      <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-red-50 text-4xl mb-5 shadow-sm">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800 tracking-tight">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-500 mt-2 max-w-xs leading-relaxed">
          {description}
        </p>
      )}

      {/* Action */}
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;