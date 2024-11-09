import React from "react";
import { useAuth } from "../auth/AuthProvider";

export default function Navbar() {
    const auth = useAuth();

    const handleLogout = () => {
        auth.logout();
    };

    return (
        <nav>
            <h1>Mi Aplicación</h1>
            {auth.isAuthenticated && (
                <button onClick={handleLogout}>Cerrar Sesión</button>
            )}
        </nav>
    );
}