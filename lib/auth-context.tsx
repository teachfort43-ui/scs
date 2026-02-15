"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: { firstName: string; lastName: string; email: string; password: string; role: string }) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER: User = {
  id: "u1",
  firstName: "Admin",
  lastName: "User",
  email: "admin@schoolpro.edu",
  role: "super_admin",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const stored = document.cookie
        .split("; ")
        .find((row) => row.startsWith("sp_session="));
      if (stored) {
        try {
          return JSON.parse(decodeURIComponent(stored.split("=")[1]));
        } catch {
          return null;
        }
      }
    }
    return null;
  });

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    const loggedInUser = { ...MOCK_USER, email };
    setUser(loggedInUser);
    document.cookie = `sp_session=${encodeURIComponent(JSON.stringify(loggedInUser))}; path=/; max-age=86400`;
    return true;
  }, []);

  const register = useCallback(
    async (data: { firstName: string; lastName: string; email: string; password: string; role: string }): Promise<boolean> => {
      const newUser: User = {
        id: `u${Date.now()}`,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
      };
      setUser(newUser);
      document.cookie = `sp_session=${encodeURIComponent(JSON.stringify(newUser))}; path=/; max-age=86400`;
      return true;
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    document.cookie = "sp_session=; path=/; max-age=0";
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
