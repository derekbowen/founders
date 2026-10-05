import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { brand } from '../data/brand';
import { currentUser } from '../data/content';
import type { User } from '../types/marketplace';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  signup: (firstName: string, lastName: string, email: string) => void;
  logout: () => void;
  updateUser: (patch: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const storageKey = `${brand.slug}-auth-user`;

function readStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) as User : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: {children: React.ReactNode;}) {
  const [user, setUser] = useState<User | null>(readStoredUser);

  useEffect(() => {
    try {
      if (user) localStorage.setItem(storageKey, JSON.stringify(user));else
      localStorage.removeItem(storageKey);
    } catch {

      /* storage unavailable */}
  }, [user]);

  const login = useCallback((email: string) => {
    setUser({ ...currentUser, email: email || currentUser.email });
  }, []);

  const signup = useCallback((firstName: string, lastName: string, email: string) => {
    setUser({
      ...currentUser,
      firstName,
      name: `${firstName} ${lastName}`.trim(),
      email,
      memberSince: String(new Date().getFullYear())
    });
  }, []);

  const logout = useCallback(() => setUser(null), []);
  const updateUser = useCallback((patch: Partial<User>) => setUser((u) => u ? { ...u, ...patch } : u), []);

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, login, signup, logout, updateUser }),
    [user, login, signup, logout, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}