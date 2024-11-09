// src/auth/AuthProvider.tsx
import { useContext, createContext, useState, useEffect } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  userId: string | null;
  userRole: string | null;
  login: (token: string, userId: string, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  userId: null,
  userRole: null,
  login: () => {}, // Esto evita errores de tipo, aunque la implementación real está en AuthProvider
  logout: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  // La función login ahora acepta el userId
  const login = (token: string, userId: string, role: string) => {
    setIsAuthenticated(true);
    setUserId(userId);
    setUserRole(role);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("role", role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    setUserRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");
    if (token && storedUserId && role) {
      setIsAuthenticated(true);
      setUserId(storedUserId);
      setUserRole(role);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userId, userRole, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
