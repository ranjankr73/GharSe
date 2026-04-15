import { Link, useLocation } from "react-router";
import Logo from "../ui/Logo";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const role = location.pathname.split("/")[1];

  return (
    <div className="min-h-screen flex bg-linear-to-br from-red-50 via-white to-red-100">
      
      {/* LEFT */}
      <div className="hidden lg:flex w-1/2 relative">
        <img
          src={`/images/${role === "shops" ? "shop" : "customer"}-signup-login.jpg`}
          alt="Auth"
          className="w-full h-full object-cover p-4 rounded-4xl"
        />

        <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
          <Link to="/">
            <Logo />
          </Link>

          <p className={`text-xs ${role === "shops" ? "text-gray-200" : "text-gray-500"}`}>
            © {new Date().getFullYear()} GharSe
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between items-center px-6 py-6">
        <div className="w-full max-w-md flex flex-col items-center justify-center flex-1">
          
          <div className="lg:hidden mb-6">
            <Logo size="md" />
          </div>

          {children}
        </div>

        <p className="text-xs text-center text-gray-400">
          Secure Authentication • Powered by{" "}
          <span className="text-red-500 font-medium">GharSe</span>
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;