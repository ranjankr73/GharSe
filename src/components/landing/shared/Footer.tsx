import Logo from "../../ui/Logo";
import { Link } from "react-router";
import { FaXTwitter, FaInstagram, FaYoutube } from "react-icons/fa6";

const footerSections = [
    {
        title: "Customers",
        links: [
            { label: "Browse Shops", to: "/customers/browse-shops" },
            { label: "Track Order", to: "/customers/orders" },
            { label: "My Orders", to: "/customers/orders" },
            { label: "Cart", to: "/customers/cart" },
            { label: "Offers", to: "/offers" },
        ],
    },
    {
        title: "Partners",
        links: [
            { label: "Partner With Us", to: "/partner" },
            { label: "Partner Login", to: "/login/shop-owner" },
            { label: "Pricing", to: "/partner/pricing" },
            { label: "Partner Support", to: "/support" },
        ],
    },
    {
        title: "Drivers",
        links: [
            { label: "Become a Driver", to: "/driver" },
            { label: "Driver Login", to: "/login/driver" },
            { label: "Driver Earnings", to: "/drivers/earnings" },
            { label: "Driver Support", to: "/support" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About", to: "/about" },
            { label: "Careers", to: "/careers" },
            { label: "Blog", to: "/blog" },
            { label: "Press", to: "/press" },
            { label: "Contact", to: "/contact" },
        ],
    },
    {
        title: "Support",
        links: [
            { label: "Help Center", to: "/help" },
            { label: "FAQs", to: "/faq" },
            { label: "Report Issue", to: "/report-issue" },
            { label: "Contact Support", to: "/support" },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "Privacy Policy", to: "/privacy" },
            { label: "Terms", to: "/terms" },
            { label: "Refund Policy", to: "/refund-policy" },
            { label: "Cancellation Policy", to: "/cancellation-policy" },
            { label: "Cookie Policy", to: "/cookie-policy" },
        ],
    },
];

const Footer = () => {
    return (
        <footer className="relative bg-white border-t border-gray-100 pt-16 pb-12 overflow-hidden">
            {/* Big faded brand */}
            <div
                aria-hidden="true"
                className="absolute bottom-28 md:bottom-12 left-1/2 -translate-x-1/2 text-[90px] md:text-[180px] font-bold pointer-events-none select-none flex gap-2 opacity-30"
            >
                <span className="text-gray-500">Ghar</span>
                <span className="text-red-500">Se</span>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-32 md:space-y-48">
                {/* Top */}
                <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-7 text-center md:text-left">
                    {/* Brand */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="flex justify-center md:justify-start">
                            <Logo />
                        </div>

                        <p className="text-sm text-gray-500 max-w-xs mx-auto md:mx-0">
                            Fast, local, and reliable ordering from nearby
                            shops.
                        </p>
                    </div>

                    {/* Sections */}
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-sm font-semibold text-gray-800 mb-3">
                                {section.title}
                            </h3>

                            <ul className="space-y-2 text-sm text-gray-500">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            to={link.to}
                                            className="hover:text-red-500 transition"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
                    <p>
                        © {new Date().getFullYear()} GharSe. All rights
                        reserved.
                    </p>

                    <div className="flex items-center gap-3">
                        {[
                            {
                                icon: <FaXTwitter size={16} />,
                                href: "https://twitter.com/gharse",
                                label: "X",
                            },
                            {
                                icon: <FaInstagram size={16} />,
                                href: "https://instagram.com/gharse",
                                label: "Instagram",
                            },
                            {
                                icon: <FaYoutube size={16} />,
                                href: "https://youtube.com/@gharse",
                                label: "YouTube",
                            },
                        ].map(({ icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-500 transition"
                            >
                                {icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;