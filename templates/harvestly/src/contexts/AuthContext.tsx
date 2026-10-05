import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { User } from "../types/marketplace";

export const demoUser: User = {
  name: "Hannah Reyes",
  email: "hannah@willowcreek.farm",
  phone: "(845) 555-0142",
  farmId: "willow-creek"
};

interface AuthValue {
  user: User | null;
  login: (email: string) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
  updateUser: (patch: Partial<User>) => void;
}

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: {children: React.ReactNode;}) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string) => {
    setUser({ ...demoUser, email: email || demoUser.email });
  }, []);
  const signup = useCallback((name: string, email: string) => {
    setUser({ ...demoUser, name, email });
  }, []);
  const logout = useCallback(() => setUser(null), []);
  const updateUser = useCallback((patch: Partial<User>) => {
    setUser((prev) => prev ? { ...prev, ...patch } : prev);
  }, []);

  const value = useMemo(
    () => ({ user, login, signup, logout, updateUser }),
    [user, login, signup, logout, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}