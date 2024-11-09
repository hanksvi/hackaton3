// src/pages/Dashboard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
export default function Dashboard() {
    const auth = useAuth();

    const handleLogout = () => {
        auth.logout(); // Llama a logout para cerrar sesión y redirigir al inicio de sesión
    };

    return (
        <div>
            <h1>Bienvenido al Dashboard Cliente</h1>
            <button 
                onClick={handleLogout} 
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
                Cerrar Sesión
            </button>
        </div>
    );
}