import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

import InputField from "../ui/InputField";
import Button from "../ui/Button";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { registerUser, loginUser } from "../../features/auth/authThunks";
import { type UserRole } from "../../features/auth/authTypes";

const AuthForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const role = location.pathname.split("/")[1];
  const mode = location.pathname.split("/")[2];

  const handleSubmit = async () => {
    if (!email || !password || (mode === "register" && !fullName)) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      if (mode === "login") {
        await dispatch(loginUser({ email, password })).unwrap();
        toast.success("Welcome back 👋");
      } else {
        const userRole: UserRole = role === "customers" ? "customer" : "shopOwner";
        await dispatch(registerUser({ fullName, email, password, role: userRole })).unwrap();
        toast.success("Account created 🎉");
      }

      if(role === "customers"){
        navigate("/customers/browse-shops");
      }else{
        navigate("/shops/dashboard");
      }
    } catch(error: any) {
      toast.error(error?.message);
    } finally {
      setFullName("");
      setEmail("");
      setPassword("");
    }
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
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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

        <Button onClick={handleSubmit} loading={status === "loading"} fullWidth>
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