import React, { createContext, useContext, useMemo, useState } from 'react';
import { currentUser } from '../data/currentUser';
import type { CurrentUser } from '../types/marketplace';

interface AuthContextValue {
  user: CurrentUser | null;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children, startSignedIn = false }: {children: React.ReactNode;startSignedIn?: boolean;}) {
  const [user, setUser] = useState<CurrentUser | null>(startSignedIn ? currentUser : null);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      signIn: () => setUser(currentUser),
      signOut: () => setUser(null)
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}