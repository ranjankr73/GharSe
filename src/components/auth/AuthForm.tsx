import { useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

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

    const handleSubmit = async () => {
        if (!email || !password || (location.pathname.includes("register") && !fullName)) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            let data;

            if (location.pathname.includes("login")) {
                data = await dispatch(
                    loginUser({ email, password }),
                ).unwrap();

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

            if(data){
                switch(data.user.role as UserRole){
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
        }
    };

    return (
        <div className="w-full max-w-sm space-y-6">
            {location.pathname.includes("register") && (
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
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>

            <Button
                onClick={handleSubmit}
                isLoading={status === "loading"}
                fullWidth
            >
                {location.pathname.includes("login") ? "Log In" : "Create Account"}
            </Button>

            <p className="text-sm text-center">
                {location.pathname.includes("login") ? (
                    <Link to={`/register/${role}`} replace>
                        Create account
                    </Link>
                ) : (
                    <Link to={`/login/${role}`} replace>
                        Already have an account?
                    </Link>
                )}
            </p>
        </div>
    );
};

export default AuthForm;
