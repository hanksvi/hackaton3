// src/apis/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://nn1h052dp5.execute-api.us-east-2.amazonaws.com/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para incluir el token en las solicitudes
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
