import { useNavigate } from "react-router";

const roles = [
    {
        title: "Customer",
        desc: "Order from nearby shops",
        path: "customer",
        icon: "🛒",
    },
    {
        title: "Shop Owner",
        desc: "Manage your shop",
        path: "partner",
        icon: "🏪",
    },
    {
        title: "Delivery Partner",
        desc: "Deliver and earn",
        path: "agent",
        icon: "🛵",
    },
];

const AuthRoleSelector = ({ mode }: { mode: "login" | "register" }) => {
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-semibold">
                    {mode === "login"
                        ? "Choose your account"
                        : "Join GharSe"}
                </h1>

                <p className="text-sm text-gray-500 mt-2">
                    Continue as your role
                </p>
            </div>

            <div className="space-y-4">
                {roles.map((role) => (
                    <button
                        key={role.path}
                        onClick={() => navigate(`/${mode}/${role.path}`)}
                        className="w-full text-left border border-gray-100 rounded-2xl p-5 hover:border-red-200 hover:bg-red-50 transition"
                    >
                        <div className="flex items-center gap-4">
                            <div className="text-2xl">{role.icon}</div>

                            <div>
                                <h3 className="font-medium">
                                    {role.title}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {role.desc}
                                </p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AuthRoleSelector;