import React from 'react';

// ─── Button ──────────────────────────────────────────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children, variant = 'primary', size = 'md', loading = false,
  fullWidth = false, icon, className = '', disabled, ...props
}) => {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';
  const variants = {
    primary: 'bg-brand-500 hover:bg-brand-600 text-white focus:ring-brand-400 shadow-brand hover:shadow-lg',
    secondary: 'bg-slate-900 hover:bg-slate-800 text-white focus:ring-slate-400',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-700 focus:ring-slate-300',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-400',
    outline: 'border-2 border-brand-500 text-brand-600 hover:bg-brand-50 focus:ring-brand-400',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-base',
  };
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      ) : icon}
      {children}
    </button>
  );
};

// ─── InputField ───────────────────────────────────────────────────────────────
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
}

export const InputField: React.FC<InputFieldProps> = ({ label, error, hint, icon, className = '', ...props }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-slate-700">{label}</label>
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>
      )}
      <input
        className={`w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400
          focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent
          transition-all duration-150 bg-white
          ${icon ? 'pl-10' : ''} ${error ? 'border-red-400 focus:ring-red-300' : ''}
          ${className}`}
        {...props}
      />
    </div>
    {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    {hint && !error && <p className="text-xs text-slate-400">{hint}</p>}
  </div>
);

// ─── TextareaField ────────────────────────────────────────────────────────────
interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const TextareaField: React.FC<TextareaFieldProps> = ({ label, error, className = '', ...props }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-slate-700">{label}</label>
    <textarea
      className={`w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400
        focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent
        transition-all duration-150 bg-white resize-none
        ${error ? 'border-red-400 focus:ring-red-300' : ''} ${className}`}
      rows={3}
      {...props}
    />
    {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
  </div>
);

// ─── StatusBadge ──────────────────────────────────────────────────────────────
import { ORDER_STATUS_CONFIG } from '../../utils';
import type { OrderStatus } from '../../types';

interface StatusBadgeProps {
  status: OrderStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const cfg = ORDER_STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold
      ${cfg.color} ${cfg.bg}
      ${size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-3 py-1'}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {cfg.label}
    </span>
  );
};

// ─── Skeleton Loader ──────────────────────────────────────────────────────────
export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-slate-200 rounded-xl ${className}`} />
);

export const ProductCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-card">
    <Skeleton className="h-44 rounded-none" />
    <div className="p-4 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-1/2" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-8 w-20 rounded-xl" />
      </div>
    </div>
  </div>
);

// ─── Empty State ──────────────────────────────────────────────────────────────
interface EmptyStateProps {
  icon: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
    <div className="text-5xl mb-4">{icon}</div>
    <h3 className="font-display text-xl font-bold text-slate-800 mb-2">{title}</h3>
    {description && <p className="text-slate-500 text-sm mb-6 max-w-xs">{description}</p>}
    {action}
  </div>
);

// ─── Toggle ───────────────────────────────────────────────────────────────────
interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label }) => (
  <label className="flex items-center gap-3 cursor-pointer">
    <div
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-6 rounded-full transition-colors duration-200
        ${checked ? 'bg-brand-500' : 'bg-slate-300'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200
        ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
    </div>
    {label && <span className="text-sm font-semibold text-slate-700">{label}</span>}
  </label>
);

// ─── Stat Card ────────────────────────────────────────────────────────────────


// ─── Modal ────────────────────────────────────────────────────────────────────
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-up">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h2 className="font-display text-lg font-bold text-slate-900">{title}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-500">✕</button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};