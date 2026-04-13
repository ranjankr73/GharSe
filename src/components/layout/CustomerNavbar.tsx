import React from "react";
import { Link, useLocation } from "react-router";
import { useAppSelector } from "../../hooks";
import { selectCartCount } from "../../redux/slices/cartSlice";
import Logo from "../ui/Logo";

const CustomerNavbar: React.FC = () => {
  const cartCount = useAppSelector(selectCartCount);
  const location = useLocation();

  const navItems = [
    { to: "/shop", icon: "🏪", label: "Shops" },
    { to: "/cart", icon: "🛒", label: "Cart", badge: cartCount },
    { to: "/orders", icon: "📦", label: "Orders" },
  ];

  const isActive = (to: string) =>
    location.pathname.startsWith(to.split("?")[0]);

  return (
    <>
      {/* 🔥 DESKTOP NAVBAR */}
      <header className="hidden md:flex fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between px-6 py-3">
          
          {/* Logo */}
          <Link to="/shop/shop-001">
            <Logo />
          </Link>

          {/* Nav */}
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`
                  relative text-sm font-medium transition
                  ${
                    isActive(item.to)
                      ? "text-red-500"
                      : "text-gray-500 hover:text-gray-900"
                  }
                `}
              >
                {item.label}

                {/* Badge */}
                {item.badge ? (
                  <span className="ml-1 text-xs bg-red-500 text-white px-1.5 rounded-full">
                    {item.badge > 9 ? "9+" : item.badge}
                  </span>
                ) : null}

                {/* Active underline */}
                {isActive(item.to) && (
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-red-500 rounded-full" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* 📱 MOBILE NAVBAR */}
      <nav className="fixed md:hidden bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100">
        <div className="flex items-center justify-around py-2 max-w-md mx-auto">
          
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex flex-col items-center gap-0.5 relative"
            >
              {/* Icon */}
              <div
                className={`
                  relative text-xl
                  ${
                    isActive(item.to)
                      ? "text-red-500"
                      : "text-gray-400"
                  }
                `}
              >
                {item.icon}

                {/* Badge */}
                {item.badge ? (
                  <span className="
                    absolute -top-1.5 -right-2
                    w-4 h-4 rounded-full
                    bg-red-500 text-white text-[10px]
                    flex items-center justify-center
                  ">
                    {item.badge > 9 ? "9+" : item.badge}
                  </span>
                ) : null}
              </div>

              {/* Label */}
              <span
                className={`
                  text-[11px] font-medium
                  ${
                    isActive(item.to)
                      ? "text-red-500"
                      : "text-gray-400"
                  }
                `}
              >
                {item.label}
              </span>

              {/* Active indicator */}
              {isActive(item.to) && (
                <span className="absolute -top-1 w-8 h-0.5 bg-red-500 rounded-full" />
              )}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default CustomerNavbar;