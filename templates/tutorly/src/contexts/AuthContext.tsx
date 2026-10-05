import React, { createContext, useContext, useMemo, useState } from 'react';
import { currentUser } from '../data/currentUser';
import type { CurrentUser } from '../types/marketplace';

interface AuthContextValue {
  isSignedIn: boolean;
  user: CurrentUser;
  signIn: () => void;
  signUp: (details: Partial<CurrentUser>) => void;
  signOut: () => void;
  updateUser: (patch: Partial<CurrentUser>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  children,
  initialSignedIn = false



}: {children: React.ReactNode;initialSignedIn?: boolean;}) {
  const [isSignedIn, setIsSignedIn] = useState(initialSignedIn);
  const [user, setUser] = useState<CurrentUser>(currentUser);

  const value = useMemo<AuthContextValue>(
    () => ({
      isSignedIn,
      user,
      signIn: () => setIsSignedIn(true),
      signUp: (details) => {
        setUser((prev) => ({ ...prev, ...details }));
        setIsSignedIn(true);
      },
      signOut: () => setIsSignedIn(false),
      updateUser: (patch) => setUser((prev) => ({ ...prev, ...patch }))
    }),
    [isSignedIn, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}