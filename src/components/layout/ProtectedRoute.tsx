import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "../../hooks/useAppSelector";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { isAuthenticated, status } = useAppSelector((state) => state.auth);
    const location = useLocation();

    const role = location.pathname.split("/")[1];

    if(status === "loading" || status === "idle"){
        return <>Loading...</>
    }

    if(!isAuthenticated){
        return <Navigate to={`/${role}/login`} replace/>;
    }

    return children;
};

export default ProtectedRoute;
