import { MdOutlineFoodBank } from "react-icons/md";

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
          <MdOutlineFoodBank className="text-[#ff3131] size-32" />
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