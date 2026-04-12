import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

import InputField from "../ui/InputField";
import Button from "../ui/Button";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { loginAdmin, clearError } from "../../redux/slices/authSlice";

const LoginForm = () => {
  const [email, setEmail] = useState("admin@freshbasket.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated } = useAppSelector(
    (s) => s.auth
  );

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
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await dispatch(loginAdmin({ email, password })).unwrap();
      toast.success("Welcome back! 👋");
    } catch {}
  };

  return (
    <div className="w-full max-w-sm space-y-6">
      
      {/* Heading */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-800">
          Welcome back 👋
        </h1>
        <p className="text-sm text-gray-500">
          Manage your shop with ease
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-5">
        
        {/* Inputs */}
        <div className="space-y-4">
          
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          {/* Password */}
          <div className="relative">
            <InputField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="pr-12"
            />

            {/* Toggle */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-gray-400 hover:text-red-500 transition"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* CTA */}
        <Button
          onClick={handleLogin}
          loading={loading}
          fullWidth
          size="lg"
        >
          Sign In →
        </Button>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-gray-400">
        Customer view?{" "}
        <Link
          to="/shop/shop-001"
          className="text-red-500 font-medium hover:underline"
        >
          Go to shop →
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;