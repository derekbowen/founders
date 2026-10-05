import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { currentUser } from '../data/currentUser';
import type { User } from '../types/marketplace';

interface AuthContextValue {
  user: User | null;
  login: (email: string) => void;
  signup: (firstName: string, lastName: string, email: string) => void;
  logout: () => void;
  updateUser: (patch: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children, initialSignedIn }: {children: React.ReactNode;initialSignedIn: boolean;}) {
  const [user, setUser] = useState<User | null>(initialSignedIn ? currentUser : null);

  const login = useCallback((email: string) => {
    setUser({ ...currentUser, email: email || currentUser.email });
  }, []);

  const signup = useCallback((firstName: string, lastName: string, email: string) => {
    setUser({
      ...currentUser,
      firstName,
      lastName,
      email,
      shippingAddress: { ...currentUser.shippingAddress, fullName: `${firstName} ${lastName}` }
    });
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const updateUser = useCallback((patch: Partial<User>) => {
    setUser((prev) => prev ? { ...prev, ...patch } : prev);
  }, []);

  const value = useMemo(() => ({ user, login, signup, logout, updateUser }), [user, login, signup, logout, updateUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}