import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import Button from "../ui/Button";
import Logo from "../ui/Logo";
import { useAppSelector } from "../../hooks/useAppSelector";

const navItems = [
    { label: "How it works", id: "how" },
    { label: "Features", id: "features" },
    { label: "For Shops", id: "shops" },
];

const Navbar = () => {
    const [active, setActive] = useState<string>("how");
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    const navigate = useNavigate();

    // 🔥 Scroll shadow + active section tracking
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);

            navItems.forEach((item) => {
                const el = document.getElementById(item.id);
                if (!el) return;

                const rect = el.getBoundingClientRect();
                if (rect.top <= 120 && rect.bottom >= 120) {
                    setActive(item.id);
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (open && !target.closest("header")) setOpen(false);
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [open]);

    // 🔥 Smooth scroll
    const scrollToSection = (id: string) => {
        setOpen(false);
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
        });
    };

    const handleCTA = () => {
        navigate(
            user?.role === "shopOwner"
                ? "/shops/dashboard"
                : "/customers/browse-shops",
        );
    };

    return (
        <header
            className={`
        sticky top-0 z-50 transition-all duration-300
        ${scrolled ? "bg-white shadow-sm" : "bg-white/70 backdrop-blur"}
      `}
        >
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Logo />

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`
                relative transition-colors duration-200 cursor-pointer
                ${
                    active === item.id
                        ? "text-red-500"
                        : "text-gray-600 hover:text-red-500"
                }
              `}
                        >
                            {item.label}

                            {/* Underline */}
                            <span
                                className={`
                  absolute left-0 -bottom-1 h-0.5 w-full bg-red-500 rounded-full
                  transition-transform duration-300 origin-left
                  ${active === item.id ? "scale-x-100" : "scale-x-0"}
                `}
                            />
                        </button>
                    ))}
                </nav>

                {/* CTA + Mobile Menu */}
                <div className="flex items-center gap-2">
                    {isAuthenticated ? (
                        <Button size="md" onClick={handleCTA}>
                            {user?.role === "shopOwner"
                                ? "Dashboard"
                                : "Browse Shops"}
                        </Button>
                    ) : (
                        <>
                            <Button
                                size="md"
                                onClick={() => navigate("/customers/login")}
                            >
                                For Customer
                            </Button>
                            <Button
                                size="md"
                                onClick={() => navigate("/shops/login")}
                            >
                                For Shop
                            </Button>
                        </>
                    )}

                    {/* Mobile toggle */}
                    <button
                        onClick={() => setOpen(!open)}
                        aria-label={open ? "Close menu" : "Open menu"}
                        className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 cursor-pointer"
                    >
                        {open ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </div>

            {/* 🔥 MOBILE MENU */}
            {open && (
                <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3 animate-fade-in">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`
                block w-full text-left text-sm font-medium py-2 cursor-pointer
                ${active === item.id ? "text-red-500" : "text-gray-600"}
              `}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </header>
    );
};

export default Navbar;
