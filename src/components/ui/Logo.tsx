type Props = {
  symbol?: boolean;
  name?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: "h-6 w-6 text-lg",
  md: "h-8 w-8 text-xl",
  lg: "h-10 w-10 text-2xl",
};

const Logo = ({ symbol = true, name = true, size = "md" }: Props) => {
  return (
    <div className="flex items-center cursor-pointer select-none">
      
      {symbol && (
        <div className={`${sizeMap[size]} flex items-center justify-center`}>
          <svg
            viewBox="0 0 640 640"
            className="w-full h-full"
          >
            <path
              fill="#ff3131"
              d="M309.8 284.9C295.3 267.3 288 245.7 288 224.1C288 143.9 384 63.9 480 63.9C533 63.9 576 106.9 576 159.9C576 255.9 496 351.9 415.8 351.9C394.2 351.9 372.6 344.6 355 330.1L118.6 566.6C106.1 579.1 85.8 579.1 73.3 566.6C60.8 554.1 60.8 533.8 73.3 521.3L309.8 284.9z"
            />
          </svg>
        </div>
      )}

      {name && (
        <span
          className={`
            font-bold tracking-tight
            ${size === "sm" && "text-lg"}
            ${size === "md" && "text-xl"}
            ${size === "lg" && "text-2xl"}
          `}
        >
          <span className="text-black">Ghar</span>
          <span className="text-red-500">Se</span>
        </span>
      )}
    </div>
  );
};

export default Logo;