interface EmptyStateProps {
    icon?: string;
    title: string;
    description?: string;
    action?: React.ReactNode;
}

const EmptyState = ({ icon = "📭", title, description, action }: EmptyStateProps) => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
        <span className="text-4xl mb-3">{icon}</span>
        <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
        {description && (
            <p className="text-xs text-slate-400 mt-1 max-w-xs">{description}</p>
        )}
        {action && <div className="mt-4">{action}</div>}
    </div>
);

export default EmptyState;