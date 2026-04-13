import { useNavigate } from "react-router";
import { useState } from "react";

const ShopCard = ({ shop }: any) => {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onClick={() => navigate(`/shops/${shop.id}`)}
      className="group cursor-pointer shadow-sm rounded-2xl overflow-hidden bg-white border border-gray-200 transition hover:shadow-md p-2"
    >
      {/* 🔥 IMAGE */}
      <div className="relative h-44 rounded-xl overflow-hidden bg-gray-100">
        
        {!imgError ? (
          <img
            src={shop.image}
            alt={shop.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            🍔
          </div>
        )}

        {/* 🔥 GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

        {/* 🔥 OFFER BADGE */}
        {shop.offer && (
          <div className="absolute bottom-2 left-2 bg-white text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
            {shop.offer}
          </div>
        )}

        {/* 🔥 RATING */}
        {shop.rating && (
          <div className="absolute top-2 right-2 bg-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
            ⭐ {shop.rating}
          </div>
        )}

        {/* 🔥 CLOSED OVERLAY */}
        {!shop.isOpen && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-semibold text-sm">
            Closed
          </div>
        )}
      </div>

      {/* 🔥 CONTENT */}
      <div className="mt-3 space-y-1 px-1">
        
        {/* Name */}
        <h3 className="font-semibold text-sm text-gray-900 line-clamp-1">
          {shop.name}
        </h3>

        {/* Category */}
        <p className="text-xs text-gray-500 line-clamp-1">
          {shop.category}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
          
          {/* Delivery time */}
          <span>🕒 {shop.deliveryTime}</span>

          {/* Dot */}
          <span>•</span>

          {/* Distance */}
          <span>{shop.distance ?? "2 km"}</span>
        </div>

        {/* Price hint */}
        <p className="text-xs text-gray-400">
          ₹{shop.priceRange ?? 200} for two
        </p>
      </div>
    </div>
  );
};

export default ShopCard;