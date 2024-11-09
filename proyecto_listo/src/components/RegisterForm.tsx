// src/components/RegisterForm.tsx
import React, { useState } from "react";
import api from "../apis/api"; // Importa la instancia de axios configurada
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
    const [username, setUsername] = useState(""); // Nuevo: username para la API
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState(""); // Nuevo: rol del usuario
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        // Validación de coincidencia de contraseñas
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        // Validación de selección de rol
        if (!role) {
            setError("Por favor, selecciona un rol");
            return;
        }

        try {
            const response = await api.post("/auth/register", {
                username,
                password,
                role,
            });

            if (response.status === 201) {
                setSuccess("Usuario creado exitosamente");
                setError(null);
                // Redirigir al login después de unos segundos o inmediatamente
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 409) {
                setError("Ya existe una cuenta con este correo electrónico.");
            } else {
                setError("Error en el registro: " + (error as Error).message);
            }
            setSuccess(null);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white shadow-md rounded px-8 py-6 border-4 border-blue-700"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>

                {error && <p className="text-red-600 mb-4">{error}</p>}
                {success && <p className="text-green-600 mb-4">{success}</p>}

                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                        Nombre de Usuario
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Tu nombre de usuario"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
                        Rol
                    </label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">Selecciona un rol</option>
                        <option value="admin">Administrador</option>
                        <option value="client">Cliente</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="********"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                        Confirmar Contraseña
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="********"
                        required
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Registrarse
                    </button>
                </div>

                <p className="mt-4 text-center text-gray-600 text-sm">
                    ¿Ya tienes una cuenta?{" "}
                    <a href="/" className="text-blue-600 hover:underline">
                        Inicia Sesión
                    </a>
                </p>
            </form>
        </div>
    );
}

