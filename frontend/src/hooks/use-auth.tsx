"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { api } from "@/lib/api";
import type { User, AuthResponse } from "@/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.setToken(token);
      api
        .get<User>("/auth/me")
        .then((u) => setUser(u))
        .catch(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          api.setToken(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await api.post<AuthResponse>("/auth/login", { email, password });
    localStorage.setItem("token", res.token);
    localStorage.setItem("refreshToken", res.refreshToken);
    api.setToken(res.token);
    setUser({ id: res.id, name: res.name, email: res.email, role: res.role, isActive: true, createdAt: "" });
  }, []);

  const register = useCallback(async (name: string, email: string, password: string, phone?: string) => {
    const res = await api.post<AuthResponse>("/auth/register", { name, email, password, phone });
    localStorage.setItem("token", res.token);
    localStorage.setItem("refreshToken", res.refreshToken);
    api.setToken(res.token);
    setUser({ id: res.id, name: res.name, email: res.email, role: res.role, isActive: true, createdAt: "" });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    api.setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, register, logout, isAdmin: user?.role === "ADMIN" }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
