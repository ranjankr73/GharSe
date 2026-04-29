import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

import InputField from "../ui/InputField";
import Button from "../ui/Button";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { registerUser, loginUser } from "../../features/auth/authThunks";
import { roleMap } from "../../utils/authRoleMap";

const AuthForm = ({ mode }: { mode: "login" | "register" }) => {
    const { role } = useParams();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { status } = useAppSelector((state) => state.auth);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async () => {
        if (!email || !password || (mode === "register" && !fullName)) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            if (mode === "login") {
                const user = await dispatch(
                    loginUser({ email, password })
                ).unwrap();

                toast.success("Welcome back");

                switch (user?.user?.role) {
                    case "customer":
                        navigate("/user/browse-shops");
                        break;

                    case "shopOwner":
                        navigate("/partner/dashboard");
                        break;

                    case "deliveryAgent":
                        navigate("/drivers/dashboard");
                        break;

                    case "admin":
                        navigate("/admin/dashboard");
                        break;
                }
            } else {
                await dispatch(
                    registerUser({
                        fullName,
                        email,
                        password,
                        role: roleMap[role as keyof typeof roleMap],
                    })
                ).unwrap();

                toast.success("Account created");

                if (role === "customer") {
                    navigate("/user/browse-shops");
                }

                if (role === "shop-owner") {
                    navigate("/partner/dashboard");
                }

                if (role === "driver") {
                    navigate("/drivers/dashboard");
                }
            }
        } catch (error: any) {
            toast.error(error?.message);
        }
    };

    return (
        <div className="w-full max-w-sm space-y-6">
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
                {mode === "login" ? "Sign In" : "Create Account"}
            </Button>

            <p className="text-sm text-center">
                {mode === "login" ? (
                    <Link to={`/register/${role}`}>
                        Create account
                    </Link>
                ) : (
                    <Link to={`/login/${role}`}>
                        Already have an account?
                    </Link>
                )}
            </p>
        </div>
    );
};

export default AuthForm;