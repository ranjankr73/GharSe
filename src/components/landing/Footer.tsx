import Logo from "../ui/Logo";
import { Link } from "react-router";
import { FaXTwitter, FaInstagram, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="relative bg-white border-t border-gray-100 pt-16 pb-12 overflow-hidden">
      
      {/* 🔥 BIG FADED BRAND (IMPROVED) */}
      <div className="absolute bottom-28 md:bottom-12 left-1/2 -translate-x-1/2 text-[90px] md:text-[180px] font-bold pointer-events-none select-none flex gap-2 opacity-30">
        <span className="text-gray-500">Ghar</span>
        <span className="text-red-500">Se</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10 space-y-32 md:space-y-48">
        
        {/* 🔥 TOP */}
        <div className="grid gap-10 md:grid-cols-4 text-center md:text-left">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex justify-center md:justify-start">
              <Logo />
            </div>
            <p className="text-sm text-gray-500 max-w-xs mx-auto md:mx-0">
              Order from nearby shops easily. Fast, simple, and local.
            </p>
          </div>

          {/* Customer */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              For Customers
            </h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link to="/browse-shops" className="hover:text-red-500 transition">
                  Browse Shops
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-red-500 transition">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-red-500 transition">
                  Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Shops */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              For Shops
            </h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link to="/shops/login" className="hover:text-red-500 transition">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/shops/dashboard" className="hover:text-red-500 transition">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/shops/login" className="hover:text-red-500 transition">
                Start Selling
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="hover:text-red-500 transition cursor-pointer">About</li>
              <li className="hover:text-red-500 transition cursor-pointer">Privacy Policy</li>
              <li className="hover:text-red-500 transition cursor-pointer">Terms</li>
              <li className="hover:text-red-500 transition cursor-pointer">Contact</li>
            </ul>
          </div>
        </div>

        {/* 🔥 BOTTOM */}
        <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          
          <p>
            © {new Date().getFullYear()} GharSe. All rights reserved.
          </p>

          {/* 🔥 SOCIAL (IMPROVED) */}
          <div className="flex items-center gap-3">
            
            <a className="p-2 rounded-full bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-500 transition cursor-pointer">

              <FaXTwitter size={16} />
            </a>

            <a className="p-2 rounded-full bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-500 transition cursor-pointer">
              <FaInstagram size={16} />
            </a>

            <a className="p-2 rounded-full bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-500 transition cursor-pointer">
              <FaYoutube size={16} />
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;