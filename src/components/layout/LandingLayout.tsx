import { Outlet } from "react-router";
import Navbar from "../landing/shared/Navbar";
import Footer from "../landing/shared/Footer";

const LandingLayout = () => {
    return (
        <div className="bg-white text-gray-900 min-h-screen">
            <Navbar />

            <main>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default LandingLayout;
