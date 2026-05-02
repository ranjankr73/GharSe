import {
    Link,
    useLocation,
    useParams,
    Outlet,
    useNavigate,
} from "react-router";
import Logo from "../ui/Logo";
import { useEffect } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import type { UserRole } from "../../features/auth/authTypes";
import toast from "react-hot-toast";

const roleContent = {
    customer: {
        title: "Order from trusted local shops",
        subtitle: "Fast ordering, live tracking, and seamless local shopping.",
    },
    partner: {
        title: "Grow your shop online",
        subtitle: "Accept orders, manage products, and reach nearby customers.",
    },
    rider: {
        title: "Deliver and earn flexibly",
        subtitle: "Work on your schedule and earn with every delivery.",
    },
    admin: {
        title: "Platform management",
        subtitle: "Manage platform operations and monitor activities.",
    },
};

const AuthLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { role } = useParams();
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if(location.pathname === "/register/admin"){
            navigate("/register", { replace: true });

            toast.error("Admin registration is not allowed through this portal. Please contact support.", { duration: 8000 });
        }

    }, []);

    useEffect(() => {
        if(role && !(role in roleContent)){
            if(location.pathname.includes("/login/")){
                navigate("/login", { replace: true });
            }
            if(location.pathname.includes("/register/")){
                navigate("/register", { replace: true });
            }
        }
    }, [role, location.pathname, navigate]);

    useEffect(() => {
        if(isAuthenticated){
            switch(user?.role as UserRole){
                case "customer":
                    navigate("/customer/browse-shops", { replace: true });
                    break;
                case "partner":
                    navigate("/partner/dashboard", { replace: true });
                    break;
                case "rider":
                    navigate("/rider/dashboard", { replace: true });
                    break;
                case "admin":
                    navigate("/admin/dashboard", { replace: true });
                    break;
                default:
                    navigate("/", { replace: true });
            }
        }
    }, [isAuthenticated, user, navigate]);

    const isSelectorPage =
        location.pathname === "/login" || location.pathname === "/register";

    const content =
        role && role in roleContent
            ? roleContent[role as keyof typeof roleContent]
            : null;

    const handleBack = () => {
        if (location.pathname.includes("/login/"))
            navigate("/login", { replace: true });
        else if (location.pathname.includes("/register/"))
            navigate("/register", { replace: true });
        else navigate("/", { replace: true });
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-white">
            {/* Header */}
            <header className="border-b border-gray-100 bg-white/80 backdrop-blur">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link to="/">
                        <Logo />
                    </Link>

                    <button
                        onClick={handleBack}
                        className="text-sm text-gray-500 hover:text-red-500 transition cursor-pointer"
                    >
                        Back
                    </button>
                </div>
            </header>

            {/* Selector pages */}
            {isSelectorPage ? (
                <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-10">
                    <div className="w-full max-w-md">
                        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 md:p-8">
                            <Outlet />
                        </div>

                        <p className="text-xs text-center text-gray-400 mt-6">
                            Secure authentication • Powered by GharSe
                        </p>
                    </div>
                </main>
            ) : (
                /* Role auth pages */
                <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-10">
                    <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-10 items-center">
                        {/* Left content */}
                        <div className="hidden lg:block space-y-6">
                            {content && (
                                <>
                                    <p className="text-sm text-red-500 font-medium">
                                        Welcome to GharSe
                                    </p>

                                    <h1 className="text-4xl font-bold leading-tight text-gray-900">
                                        {content.title}
                                    </h1>

                                    <p className="text-gray-500 text-lg max-w-md">
                                        {content.subtitle}
                                    </p>

                                    <div className="space-y-3 pt-4">
                                        {[
                                            "Secure authentication",
                                            "Fast onboarding",
                                            "Role-based dashboard",
                                        ].map((item) => (
                                            <div
                                                key={item}
                                                className="flex items-center gap-3 text-sm text-gray-600"
                                            >
                                                <span className="w-5 h-5 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-xs">
                                                    ✓
                                                </span>

                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Auth card */}
                        <div className="w-full max-w-md mx-auto">
                            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 md:p-8">
                                <Outlet />
                            </div>

                            <p className="text-xs text-center text-gray-400 mt-6">
                                Secure authentication • Powered by GharSe
                            </p>
                        </div>
                    </div>
                </main>
            )}
        </div>
    );
};

export default AuthLayout;
