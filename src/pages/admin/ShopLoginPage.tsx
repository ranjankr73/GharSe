import LoginForm from "../../components/admin/LoginForm";
import Logo from "../../components/ui/Logo";

const ShopLoginPage: React.FC = () => {
    return (
        <div className="min-h-screen flex bg-linear-to-br from-red-50 via-white to-red-100">
            {/* LEFT SIDE (IMAGE / BRANDING) */}
            <div className="hidden lg:flex w-1/2 relative">
                <img
                    src="/images/shop-login.jpg"
                    alt="Shop Login"
                    className="w-full h-full object-cover"
                />

                {/* Gradient Overlay (better than black) */}
                <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70 flex flex-col justify-between p-8 text-white">
                    <Logo />

                    <div className="space-y-3 max-w-sm">
                        <h1 className="text-4xl font-bold leading-tight">
                            Run your shop
                            <br />
                            like a pro 🚀
                        </h1>
                        <p className="text-sm text-gray-200">
                            Accept orders, manage deliveries, and grow faster
                            with GharSe.
                        </p>
                    </div>

                    <p className="text-xs text-gray-300">
                        © {new Date().getFullYear()} GharSe
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE (FORM) */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between items-center px-6 py-6">
                {/* Center Content */}
                <div className="w-full max-w-md flex flex-col items-center justify-center flex-1">
                    {/* Logo (mobile only) */}
                    <div className="lg:hidden mb-6">
                        <Logo size="md" />
                    </div>

                    <LoginForm />
                </div>

                {/* Footer (ALWAYS CENTERED BOTTOM) */}
                <p className="text-xs text-center text-gray-400">
                    Secure login • Powered by{" "}
                    <span className="text-red-500 font-medium">GharSe</span>
                </p>
            </div>
        </div>
    );
};

export default ShopLoginPage;
