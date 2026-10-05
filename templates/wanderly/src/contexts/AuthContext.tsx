import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { User } from '../types/marketplace';

interface AuthContextValue {
  user: User | null;
  signIn: (email: string) => void;
  signUp: (user: Omit<User, 'phone'>) => void;
  signOut: () => void;
  updateUser: (patch: Partial<User>) => void;
}

const demoUser: User = {
  firstName: 'Alex',
  lastName: 'Morgan',
  email: 'alex.morgan@example.com',
  phone: '+1 (415) 555-0142'
};

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
  startSignedIn?: boolean;
}

export function AuthProvider({ children, startSignedIn = false }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(startSignedIn ? demoUser : null);

  const signIn = useCallback((email: string) => {
    setUser({ ...demoUser, email: email || demoUser.email });
  }, []);

  const signUp = useCallback((next: Omit<User, 'phone'>) => {
    setUser({ ...next, phone: '' });
  }, []);

  const signOut = useCallback(() => setUser(null), []);

  const updateUser = useCallback((patch: Partial<User>) => {
    setUser((prev) => prev ? { ...prev, ...patch } : prev);
  }, []);

  const value = useMemo(
    () => ({ user, signIn, signUp, signOut, updateUser }),
    [user, signIn, signUp, signOut, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}