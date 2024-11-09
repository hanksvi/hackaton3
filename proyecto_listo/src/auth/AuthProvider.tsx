// src/auth/AuthProvider.tsx
import { useContext, createContext, useState, useEffect } from "react";

interface AuthProviderProps {
    children: React.ReactNode;
}

interface AuthContextProps {
    isAuthenticated: boolean;
    userRole: string | null;
    login: (token: string, role: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: false,
    userRole: null,
    login: () => {},
    logout: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);

    const login = (token: string, role: string) => {
        setIsAuthenticated(true);
        setUserRole(role);
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if (token && role) {
            setIsAuthenticated(true);
            setUserRole(role);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
