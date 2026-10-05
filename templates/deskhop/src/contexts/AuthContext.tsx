import React, { createContext, useContext, useMemo, useState } from 'react';
import { CURRENT_USER_ID, users } from '../data/users';
import type { User } from '../types/user';

interface AuthContextValue {
  user: User | null;
  login: () => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
  updateUser: (patch: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const demoUser = users.find((u) => u.id === CURRENT_USER_ID) as User;

export function AuthProvider({
  children,
  initialSignedIn = false



}: {children: React.ReactNode;initialSignedIn?: boolean;}) {
  const [user, setUser] = useState<User | null>(initialSignedIn ? demoUser : null);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login: () => setUser(demoUser),
      signup: (name, email) =>
      setUser({ ...demoUser, name, firstName: name.split(' ')[0] || name, email }),
      logout: () => setUser(null),
      updateUser: (patch) => setUser((prev) => prev ? { ...prev, ...patch } : prev)
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}