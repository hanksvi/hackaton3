// src/pages/Dashboard.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import ProductDetail from "./ProductDetail";
import Cart from "./Cart"; // Importa el componente Cart

export default function Dashboard() {
    const auth = useAuth();
    const [showCart, setShowCart] = useState(false); // Estado para controlar la visibilidad del carrito

    const handleLogout = () => {
        auth.logout(); // Llama a logout para cerrar sesión y redirigir al inicio de sesión
    };

    const toggleCart = () => {
        setShowCart((prevShowCart) => !prevShowCart); // Alterna la visibilidad del carrito
    };

    return (
        <div className="relative">
            {/* Ícono de carrito en la esquina superior derecha */}
            <img 
                src="/img/cart-icon.png"  // Ruta desde la carpeta public
                alt="Carrito" 
                onClick={toggleCart} // Llama a toggleCart al hacer clic
                style={{
                    position: "fixed",
                    top: "1rem",
                    right: "1rem",
                    width: "2rem",
                    height: "2rem",
                    cursor: "pointer"
                }}
            />

            {showCart ? (
                <Cart /> // Muestra el carrito si showCart es true
            ) : (
                <>
                    <h1>Bienvenido al Dashboard Cliente</h1>
                    <ProductDetail />
                    
                    {/* Botón de Cerrar Sesión en la esquina inferior derecha */}
                    <button 
                        onClick={handleLogout} 
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        style={{
                            position: "fixed",
                            bottom: "1rem",
                            right: "1rem",
                        }}
                    >
                        Cerrar Sesión
                    </button>
                </>
            )}
        </div>
    );
}
