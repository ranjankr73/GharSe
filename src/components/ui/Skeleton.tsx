const Skeleton: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div
      className={`
        relative overflow-hidden rounded-xl
        bg-gray-200
        ${className}
      `}
    >
      {/* Shimmer */}
      <div className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
};

export default Skeleton;