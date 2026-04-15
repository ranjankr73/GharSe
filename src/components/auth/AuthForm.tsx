import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

import InputField from "../ui/InputField";
import Button from "../ui/Button";

import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  loginUser,
  registerUser,
  clearError,
} from "../../redux/slices/authSlice";

const AuthForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("admin@freshbasket.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();

  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated } = useAppSelector(
    (s) => s.auth
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const role = location.pathname.split("/")[1];
  const mode = location.pathname.split("/")[2];

  const handleSubmit = async () => {
    if (!email || !password || (mode === "register" && !name)) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      if (mode === "login") {
        await dispatch(loginUser({ email, password, role })).unwrap();
        toast.success("Welcome back 👋");
      } else {
        await dispatch(registerUser({ name, email, password, role })).unwrap();
        toast.success("Account created 🎉");
      }
    } catch {}
  };

  return (
    <div className="w-full max-w-sm space-y-6">
      
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          {mode === "login" ? "Welcome back 👋" : "Create account 🚀"}
        </h1>
        <p className="text-sm text-gray-500">
          {role === "shops" ? 
            (mode === "login" ? "Manage your shop with ease" : "Open your shop to increase revenue")
            : (mode === "login" ? "Start ordering from nearby shops" : "Start using GharSe today")}
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm space-y-5">
        
        {mode === "register" && (
          <InputField
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <InputField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="relative">
          <InputField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pr-12"
          />

          <button
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-9"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <Button onClick={handleSubmit} loading={loading} fullWidth>
          {mode === "login" ? "Sign In →" : "Sign Up →"}
        </Button>

        <p className="text-[13px] text-center text-gray-400">
          {`${mode === "register" ? "Already have an account?" : "Don't have an account?"}`}{" "}
          <Link to={mode === "register" ? `/${role}/login` : `/${role}/register`} className="text-red-500 font-medium underline">{`${mode === "register" ? "Login" : "Register"}`}</Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;