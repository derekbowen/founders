import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { demoUser } from "../data/currentUser";
import type { SignupInput, User } from "../types/marketplace";

interface AuthContextValue {
  user: User | null;
  login: (email: string) => void;
  signup: (input: SignupInput) => void;
  logout: () => void;
  updateContact: (contact: {email: string;phone: string;}) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
  initialSignedIn?: boolean;
}

export function AuthProvider({ children, initialSignedIn = false }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(initialSignedIn ? demoUser : null);

  const login = useCallback((email: string) => {
    setUser({ ...demoUser, email: email || demoUser.email });
  }, []);

  const signup = useCallback((input: SignupInput) => {
    setUser({
      id: `user-${Date.now()}`,
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: "",
      ownerId: input.accountType === "vendor" ? demoUser.ownerId : undefined
    });
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const updateContact = useCallback((contact: {email: string;phone: string;}) => {
    setUser((prev) => prev ? { ...prev, ...contact } : prev);
  }, []);

  const value = useMemo(
    () => ({ user, login, signup, logout, updateContact }),
    [user, login, signup, logout, updateContact]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}