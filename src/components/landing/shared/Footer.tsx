import Logo from "../../ui/Logo";
import { Link } from "react-router";
import { FaXTwitter, FaInstagram, FaYoutube } from "react-icons/fa6";

const footerSections = [
    {
        title: "Customers",
        links: [
            { label: "Browse Shops", to: "/customer/browse-shops" },
            { label: "Track Order", to: "/customer/orders" },
            { label: "My Orders", to: "/customer/orders" },
            { label: "Cart", to: "/customer/cart" },
            { label: "Offers", to: "/offers" },
        ],
    },
    {
        title: "Partners",
        links: [
            { label: "Partner With Us", to: "/partner" },
            { label: "Partner Login", to: "/login/partner" },
            { label: "Pricing", to: "/partner/pricing" },
            { label: "Partner Support", to: "/support" },
        ],
    },
    {
        title: "Riders",
        links: [
            { label: "Become a Rider", to: "/rider" },
            { label: "Rider Login", to: "/login/rider" },
            { label: "Rider Earnings", to: "/rider/earnings" },
            { label: "Rider Support", to: "/support" },
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
        <footer className="relative bg-white border-t border-slate-200 overflow-hidden">
            {/* Soft brand background */}
            <div
                aria-hidden="true"
                className="absolute bottom-44 md:bottom-36 left-1/2 -translate-x-1/2 text-[110px] md:text-[220px] font-bold tracking-tight pointer-events-none select-none opacity-[0.50] whitespace-nowrap leading-none"
            >
                <span className="text-slate-900">Ghar</span>
                <span className="text-red-500">Se</span>
            </div>

            {/* Soft glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-112.5 h-50 bg-red-100 blur-3xl opacity-40 rounded-full" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
                {/* Top */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-10 md:gap-12">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-5">
                        <Logo />

                        <p className="text-sm text-slate-500 leading-relaxed">
                            Fast, local, and reliable ordering from nearby
                            trusted shops.
                        </p>
                    </div>

                    {/* Links */}
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-sm font-semibold text-slate-900 mb-4">
                                {section.title}
                            </h3>

                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            to={link.to}
                                            className="text-sm text-slate-500 hover:text-red-500 transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="md:mt-60 mt-32 h-px bg-slate-200" />

                {/* Bottom */}
                <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-5">
                    <p className="text-sm text-slate-400">
                        © {new Date().getFullYear()} GharSe. All rights
                        reserved.
                    </p>

                    <div className="flex items-center gap-3">
                        {[
                            {
                                icon: <FaXTwitter size={16} />,
                                href: "/",
                                label: "X",
                            },
                            {
                                icon: <FaInstagram size={16} />,
                                href: "/",
                                label: "Instagram",
                            },
                            {
                                icon: <FaYoutube size={16} />,
                                href: "/",
                                label: "YouTube",
                            },
                        ].map(({ icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-2xl bg-slate-50 hover:bg-red-50 flex items-center justify-center text-slate-500 hover:text-red-500 transition-all"
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
