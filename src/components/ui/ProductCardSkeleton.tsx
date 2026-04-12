import Skeleton from "./Skeleton";

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      
      {/* Image */}
      <Skeleton className="h-40 w-full rounded-none" />

      {/* Content */}
      <div className="p-4 space-y-3">
        
        {/* Title */}
        <Skeleton className="h-4 w-3/4" />

        {/* Description */}
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-1/2" />

        {/* Bottom */}
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-5 w-14" />
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;