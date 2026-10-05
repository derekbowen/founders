import React, { createContext, useContext, useMemo, useState } from 'react';
import { currentUserId } from '../data/users';
import type { User } from '../types/user';
import { getUser } from '../utils/lookup';

interface AuthValue {
  isSignedIn: boolean;
  user: User;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children, initialSignedIn = false }: {children: React.ReactNode;initialSignedIn?: boolean;}) {
  const [isSignedIn, setIsSignedIn] = useState(initialSignedIn);
  const value = useMemo<AuthValue>(
    () => ({
      isSignedIn,
      user: getUser(currentUserId),
      signIn: () => setIsSignedIn(true),
      signOut: () => setIsSignedIn(false)
    }),
    [isSignedIn]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}