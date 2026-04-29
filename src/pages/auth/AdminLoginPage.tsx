import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { loginUser } from "../../features/auth/authThunks";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";
import { Shield } from "lucide-react";

interface FormData {
    email: string;
    password: string;
}

const AdminLoginPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { status, error, isAuthenticated, user } = useAppSelector(
        (s) => s.auth
    );

    // Redirect if already logged in as admin
    useEffect(() => {
        if (isAuthenticated && user?.role === "admin") {
            navigate("/admin/dashboard", { replace: true });
        }
    }, [isAuthenticated, user, navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        const result = await dispatch(loginUser(data));

        if (loginUser.fulfilled.match(result)) {
            const role = result.payload.user.role;

            if (role !== "admin") {
                toast.error("Access denied. Admin credentials required.");
                return;
            }

            toast.success("Welcome back, Admin!");
            navigate("/admin/dashboard", { replace: true });
        } else {
            toast.error(error ?? "Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">

                {/* Card */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Shield size={22} className="text-red-500" />
                        </div>
                        <div className="text-xl font-bold mb-1">
                            <span className="text-slate-800">Ghar</span>
                            <span className="text-red-500">Se</span>
                        </div>
                        <h1 className="text-sm font-semibold text-slate-800 mt-2">
                            Admin Login
                        </h1>
                        <p className="text-xs text-slate-400 mt-1">
                            Restricted access — authorised personnel only
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <InputField
                            label="Email Address"
                            type="email"
                            placeholder="admin@gharse.com"
                            error={errors.email?.message}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email",
                                },
                            })}
                        />

                        <InputField
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            error={errors.password?.message}
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            isLoading={status === "loading"}
                        >
                            Sign In
                        </Button>
                    </form>

                    {/* Security note */}
                    <p className="text-xs text-slate-400 text-center mt-6">
                        All admin actions are logged and monitored.
                    </p>
                </div>

                {/* Back link */}
                <p className="text-center text-xs text-slate-400 mt-4">
                    Not an admin?{" "}
                    <button
                        onClick={() => navigate("/")}
                        className="text-red-500 hover:text-red-600 cursor-pointer"
                    >
                        Go to homepage
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AdminLoginPage;