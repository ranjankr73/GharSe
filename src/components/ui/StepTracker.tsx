import React from "react";
import { STATUS_STEPS, STATUS_ICONS, ORDER_STATUS_CONFIG } from "../../utils";
import type { OrderStatus } from "../../types";

interface StepTrackerProps {
    status: OrderStatus;
}

const StepTracker: React.FC<StepTrackerProps> = ({ status }) => {
    if (status === "rejected") {
        return (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 text-center">
                <div className="text-3xl mb-2">❌</div>
                <p className="text-base font-semibold text-red-600">
                    Order Rejected
                </p>
                <p className="text-sm text-red-500 mt-1">
                    The shop couldn’t accept your order. Please try again.
                </p>
            </div>
        );
    }

    const currentStep = ORDER_STATUS_CONFIG[status].step;

    return (
        <div className="space-y-5">
            {STATUS_STEPS.map((step, index) => {
                const cfg = ORDER_STATUS_CONFIG[step];

                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;

                return (
                    <div key={step} className="flex gap-4">
                        {/* Timeline */}
                        <div className="flex flex-col items-center">
                            <div
                                className={`
                  w-9 h-9 rounded-full flex items-center justify-center text-sm
                  ${
                      isCompleted
                          ? "bg-green-500 text-white"
                          : isCurrent
                            ? "bg-red-500 text-white ring-4 ring-red-100"
                            : "bg-gray-100 text-gray-400"
                  }
                `}
                            >
                                {isCompleted ? "✓" : STATUS_ICONS[step]}
                            </div>

                            {index < STATUS_STEPS.length - 1 && (
                                <div
                                    className={`
                    w-0.5 h-8 my-1
                    ${isCompleted ? "bg-green-400" : "bg-gray-200"}
                  `}
                                />
                            )}
                        </div>

                        {/* Content */}
                        <div className="pt-1">
                            <p
                                className={`text-sm font-medium ${
                                    isCompleted || isCurrent
                                        ? "text-gray-800"
                                        : "text-gray-400"
                                }`}
                            >
                                {cfg.label}
                            </p>

                            <p
                                className={`text-xs mt-0.5 ${
                                    isCurrent ? "text-red-500" : "text-gray-400"
                                }`}
                            >
                                {getStepDescription(step, isCurrent)}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

function getStepDescription(step: OrderStatus, isCurrent: boolean): string {
    const descriptions: Record<OrderStatus, [string, string]> = {
        pending: ["Order placed", "Waiting for confirmation"],
        accepted: ["Confirmed", "Shop accepted your order"],
        preparing: ["Preparing", "Your food is being prepared"],
        out_for_delivery: ["On the way", "Rider is heading to you"],
        delivered: ["Delivered 🎉", "Enjoy your meal!"],
        rejected: ["Rejected", ""],
    };

    const [done, current] = descriptions[step];
    return isCurrent ? current : done;
}

export default StepTracker;
