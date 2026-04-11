import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { InputField, Button } from "../../components/ui";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { loginAdmin, clearError } from "../../redux/slices/authSlice";

const LoginForm = () => {
    const [email, setEmail] = useState("admin@freshbasket.com");
    const [password, setPassword] = useState("admin123");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading, error, isAuthenticated } = useAppSelector((s) => s.auth);

    useEffect(() => {
        if (isAuthenticated) navigate("/admin/dashboard");
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [error, dispatch]);

    const handleLogin = async () => {
        try {
            await dispatch(loginAdmin({ email, password })).unwrap();
            toast.success("Welcome back! 👋");
        } catch {}
    };

    return (
        <div className="w-full max-w-sm">
            
            {/* Heading */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                    Welcome Back 🍔
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Login to manage your shop
                </p>
            </div>

            {/* Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-5">
                
                {/* Inputs */}
                <div className="space-y-4">
                    <InputField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@freshbasket.com"
                        className="bg-gray-50 border-gray-200 focus:ring-red-400 focus:border-red-400"
                    />

                    <div className="relative">
                        <InputField
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="bg-gray-50 border-gray-200 focus:ring-red-400 focus:border-red-400 pr-16"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(prev => !prev)}
                            className="absolute right-3 bottom-3.5 text-xs font-medium text-gray-500 hover:text-red-500 transition"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                {/* CTA */}
                <Button
                    onClick={handleLogin}
                    variant="primary"
                    size="lg"
                    loading={loading}
                    className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
                >
                    Sign In →
                </Button>
            </div>

            {/* Footer */}
            <p className="text-center text-gray-400 text-xs mt-6">
                Customer view?{" "}
                <Link
                    to="/shop/shop-001"
                    className="text-red-500 font-semibold hover:underline"
                >
                    Go to shop →
                </Link>
            </p>
        </div>
    );
};

export default LoginForm;