import { Navigate, Outlet, useLocation } from "react-router";
import { useAppSelector } from "../../hooks/useAppSelector";
import Spinner from "../ui/Spinner";

interface Props {
    allowedRoles?: string[];
    loginPath?: string;
}

const ProtectedRoute = ({ allowedRoles, loginPath = "/login" }: Props) => {
    const { isAuthenticated, isInitialized, user } = useAppSelector(
        (s) => s.auth,
    );
    
    const location = useLocation();

    if (!isInitialized) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }


    if (!isAuthenticated) {
        return <Navigate to={loginPath} state={{ from: location }} replace/>;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        const redirectPath =
            user?.role === "admin"
                ? "/admin/dashboard"
                : user?.role === "shopOwner"
                  ? "/shops/dashboard"
                  : user?.role === "deliveryAgent"
                    ? "/driver/dashboard"
                    : "/";

        return (
            <Navigate to={redirectPath} replace />
        );
    }

    return <Outlet/>;
};

export default ProtectedRoute;
