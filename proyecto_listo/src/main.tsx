// src/index.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import { AuthProvider } from './auth/AuthProvider';
import Unauthorized from './pages/Unauthorized';
import ProductDetail from './pages/ProductDetail';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    element: <ProtectedRoute />, // Ruta protegida para usuarios autenticados
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
      {
        element: <ProtectedRoute requiredRole="admin" />, // Ruta protegida para administradores
        children: [
          {
            path: "/admin",
            element: <AdminDashboard />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);