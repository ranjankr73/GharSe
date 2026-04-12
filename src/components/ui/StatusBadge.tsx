import type { OrderStatus } from "../../types";

interface StatusBadgeProps {
  status: OrderStatus;
  size?: "sm" | "md";
}

const STATUS_STYLES: Record<OrderStatus, any> = {
  pending: {
    label: "Pending",
    bg: "bg-amber-50",
    text: "text-amber-600",
    dot: "bg-amber-500",
  },
  accepted: {
    label: "Accepted",
    bg: "bg-blue-50",
    text: "text-blue-600",
    dot: "bg-blue-500",
  },
  preparing: {
    label: "Preparing",
    bg: "bg-purple-50",
    text: "text-purple-600",
    dot: "bg-purple-500",
  },
  out_for_delivery: {
    label: "On the way",
    bg: "bg-orange-50",
    text: "text-orange-600",
    dot: "bg-orange-500",
  },
  delivered: {
    label: "Delivered",
    bg: "bg-green-50",
    text: "text-green-600",
    dot: "bg-green-500",
  },
  rejected: {
    label: "Rejected",
    bg: "bg-red-50",
    text: "text-red-600",
    dot: "bg-red-500",
  },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = "md",
}) => {
  const cfg = STATUS_STYLES[status];

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full font-medium
        ${cfg.bg} ${cfg.text}
        transition-all duration-200
        ${size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-3 py-1"}
      `}
    >
      {/* Animated dot */}
      <span
        className={`
          w-2 h-2 rounded-full ${cfg.dot}
          ${status === "pending" || status === "preparing" ? "animate-pulse" : ""}
        `}
      />

      {cfg.label}
    </span>
  );
};

export default StatusBadge;