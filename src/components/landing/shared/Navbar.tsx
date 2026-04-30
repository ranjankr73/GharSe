import { useEffect, useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import Button from "../../ui/Button";
import Logo from "../../ui/Logo";
import { useAppSelector } from "../../../hooks/useAppSelector";

const navItems = [
    { title: "Order Food", to: "/" },
    { title: "Partner With Us", to: "/partner" },
    { title: "Deliver With Us", to: "/rider" },
];

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (open && !target.closest("header")) {
                setOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () =>
            document.removeEventListener("click", handleClickOutside);
    }, [open]);

    const handleDashboardRedirect = () => {
        switch (user?.role) {
            case "customer":
                navigate("/customer/browse-shops");
                break;

            case "partner":
                navigate("/partner/dashboard");
                break;

            case "rider":
                navigate("/rider/dashboard");
                break;

            case "admin":
                navigate("/admin/dashboard");
                break;

            default:
                navigate("/");
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Logo />

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.to;

                        return (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={`transition-colors duration-200 cursor-pointer ${
                                    isActive
                                        ? "text-red-500"
                                        : "text-gray-600 hover:text-red-500"
                                }`}
                            >
                                {item.title}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-2">
                    {isAuthenticated ? (
                        <Button size="md" onClick={handleDashboardRedirect}>
                            {user?.role === "customer" ? "My Orders" : user?.role === "rider" ? "My Deliveries" : "Dashboard"}
                        </Button>
                    ) : (
                        <>
                            <Button
                                variant="outline"
                                size="md"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </Button>

                            <Button
                                size="md"
                                onClick={() => navigate("/register")}
                            >
                                Get Started
                            </Button>
                        </>
                    )}

                    {/* Mobile Menu */}
                    <button
                        onClick={() => setOpen(!open)}
                        aria-label={open ? "Close menu" : "Open menu"}
                        className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 cursor-pointer"
                    >
                        {open ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {open && (
                <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
                    {navItems.map((item) => (
                        <button
                            key={item.to}
                            onClick={() => {
                                navigate(item.to);
                                setOpen(false);
                            }}
                            className="block w-full text-left text-sm font-medium py-2 text-gray-600 hover:text-red-500"
                        >
                            {item.title}
                        </button>
                    ))}
                </div>
            )}
        </header>
    );
};

export default Navbar;