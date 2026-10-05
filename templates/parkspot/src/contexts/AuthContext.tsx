import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { CURRENT_USER_ID, users } from '../data/users';
import type { User } from '../types/user';

interface AuthContextValue {
  currentUser: User | null;
  login: (email: string) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
  updateUser: (patch: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const demoUser = users.find((u) => u.id === CURRENT_USER_ID) as User;

export function AuthProvider({ children, initialSignedIn = false }: {children: React.ReactNode;initialSignedIn?: boolean;}) {
  const [currentUser, setCurrentUser] = useState<User | null>(initialSignedIn ? demoUser : null);

  const login = useCallback((email: string) => {
    setCurrentUser({ ...demoUser, email: email || demoUser.email });
  }, []);

  const signup = useCallback((name: string, email: string) => {
    setCurrentUser({ ...demoUser, name: name || demoUser.name, email: email || demoUser.email });
  }, []);

  const logout = useCallback(() => setCurrentUser(null), []);

  const updateUser = useCallback((patch: Partial<User>) => {
    setCurrentUser((prev) => prev ? { ...prev, ...patch } : prev);
  }, []);

  const value = useMemo(
    () => ({ currentUser, login, signup, logout, updateUser }),
    [currentUser, login, signup, logout, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}