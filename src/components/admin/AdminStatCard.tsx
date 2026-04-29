interface Props {
    label: string;
    value: string | number;
    icon: string;
    sub?: string;
    color?: "red" | "green" | "blue" | "yellow" | "purple";
}

const colorMap = {
    red: "bg-red-50 text-red-500",
    green: "bg-green-50 text-green-500",
    blue: "bg-blue-50 text-blue-500",
    yellow: "bg-yellow-50 text-yellow-500",
    purple: "bg-purple-50 text-purple-500",
};

const AdminStatCard = ({
    label,
    value,
    icon,
    sub,
    color = "red",
}: Props) => (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-base mb-3 ${colorMap[color]}`}
        >
            {icon}
        </div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-xl font-bold text-slate-800 mt-0.5">{value}</p>
        {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
);

export default AdminStatCard;