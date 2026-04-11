import React from 'react';
import { STATUS_STEPS, STATUS_ICONS, ORDER_STATUS_CONFIG } from '../../utils';
import type { OrderStatus } from '../../types';

interface StepTrackerProps {
  status: OrderStatus;
}

const StepTracker: React.FC<StepTrackerProps> = ({ status }) => {
  if (status === 'rejected') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-5 text-center">
        <div className="text-4xl mb-3">❌</div>
        <p className="font-display font-bold text-red-700 text-lg">Order Rejected</p>
        <p className="text-sm text-red-500 mt-1">The shop could not accept your order. Please try again.</p>
      </div>
    );
  }

  const currentStep = ORDER_STATUS_CONFIG[status].step;

  return (
    <div className="relative">
      {STATUS_STEPS.map((step, index) => {
        const cfg = ORDER_STATUS_CONFIG[step];
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isPending = index > currentStep;

        return (
          <div key={step} className="flex gap-4">
            {/* Timeline column */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold
                  transition-all duration-300 flex-shrink-0
                  ${isCompleted ? 'bg-green-500 text-white shadow-md' : ''}
                  ${isCurrent ? 'bg-brand-500 text-white shadow-brand ring-4 ring-brand-100 animate-pulse-slow' : ''}
                  ${isPending ? 'bg-slate-100 text-slate-400' : ''}
                `}
              >
                {isCompleted ? '✓' : STATUS_ICONS[step]}
              </div>
              {index < STATUS_STEPS.length - 1 && (
                <div className={`w-0.5 h-12 my-1 rounded-full transition-colors duration-500
                  ${isCompleted ? 'bg-green-400' : 'bg-slate-200'}`} />
              )}
            </div>

            {/* Content column */}
            <div className={`pb-12 pt-1.5 ${index === STATUS_STEPS.length - 1 ? 'pb-0' : ''}`}>
              <p className={`font-semibold text-sm leading-tight
                ${isCompleted ? 'text-green-700' : isCurrent ? 'text-brand-700' : 'text-slate-400'}`}>
                {cfg.label}
              </p>
              <p className={`text-xs mt-0.5
                ${isCompleted ? 'text-green-500' : isCurrent ? 'text-slate-500' : 'text-slate-300'}`}>
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
    pending:          ['Order received', 'Waiting for shop to confirm'],
    accepted:         ['Order confirmed!', 'Shop accepted your order'],
    preparing:        ['Being prepared', 'Your items are being packed'],
    out_for_delivery: ['On the way!', 'Your order is headed to you'],
    delivered:        ['Delivered 🎉', 'Enjoy your order!'],
    rejected:         ['Rejected', ''],
  };
  const [done, current] = descriptions[step];
  return isCurrent ? current : done;
}

export default StepTracker;