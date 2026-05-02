import { useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router";
import toast from "react-hot-toast";
import { Eye, EyeOff, Shield } from "lucide-react";

import type { UserRole } from "../../features/auth/authTypes";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { registerUser, loginUser } from "../../features/auth/authThunks";

import InputField from "../ui/InputField";
import Button from "../ui/Button";

const AuthForm = () => {
    const { role } = useParams();

    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useAppDispatch();
    const { status } = useAppSelector((state) => state.auth);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const isAdmin = role === "admin";
    const isLogin = location.pathname.includes("login");
    const isRegister = location.pathname.includes("register");

    const handleSubmit = async () => {
        if (!email || !password || (isRegister && !fullName)) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            let data;

            if (isLogin) {
                data = await dispatch(loginUser({ email, password })).unwrap();

                toast.success("Welcome back");
            } else {
                data = await dispatch(
                    registerUser({
                        fullName,
                        email,
                        password,
                        role: role as UserRole,
                    }),
                ).unwrap();

                toast.success("Account created");
            }

            if (data) {
                switch (data.user.role as UserRole) {
                    case "admin":
                        navigate("/admin/dashboard", { replace: true });
                        break;

                    case "partner":
                        navigate("/partner/dashboard", { replace: true });
                        break;

                    case "rider":
                        navigate("/rider/dashboard", { replace: true });
                        break;

                    case "customer":
                        navigate("/customer/browse-shops", { replace: true });
                        break;

                    default:
                        navigate("/", { replace: true });
                }
            }
        } catch (error: any) {
            toast.error(error?.message);
        } finally {
            setFullName("");
            setEmail("");
            setPassword("");
        }
    };

    return (
        <div className="w-full max-w-sm">
            {isAdmin && (
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
            )}

            <div className="space-y-6">
                {isRegister && (
                    <InputField
                        label="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                )}

                <InputField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className="relative">
                    <InputField
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-9"
                    >
                        {showPassword ? (
                            <EyeOff size={18} />
                        ) : (
                            <Eye size={18} />
                        )}
                    </button>
                </div>

                <Button
                    onClick={handleSubmit}
                    isLoading={status === "loading"}
                    fullWidth
                >
                    {isLogin ? "Log In" : "Create Account"}
                </Button>

                {isAdmin ? (
                    <p className="text-xs text-slate-400 text-center mt-6">
                        All admin actions are logged and monitored.
                    </p>
                ) : (
                    <p className="text-sm text-center">
                        {isLogin ? (
                            <Link to={`/register/${role}`} replace>
                                Create account
                            </Link>
                        ) : (
                            <Link to={`/login/${role}`} replace>
                                Already have an account?
                            </Link>
                        )}
                    </p>
                )}
            </div>
        </div>
    );
};

export default AuthForm;
