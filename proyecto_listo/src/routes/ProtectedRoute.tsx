// src/routes/ProtectedRoute.tsx
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

interface ProtectedRouteProps {
    requiredRole?: string;
}

export default function ProtectedRoute({ requiredRole }: ProtectedRouteProps) {
    const auth = useAuth();

    if (!auth.isAuthenticated) {
        return <Navigate to="/" />;
    }

    if (requiredRole && auth.userRole !== requiredRole) {
        return <Navigate to="/unauthorized" />;
    }

    return <Outlet />;
}
