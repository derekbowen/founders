import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { CURRENT_USER_ID } from '../data/users';
import { User } from '../types/marketplace';
import { getUser } from '../utils/lookup';

interface AuthContextValue {
  user: User | null;
  isSignedIn: boolean;
  login: () => void;
  signup: (name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
  initialSignedIn?: boolean;
}

export function AuthProvider({ children, initialSignedIn = false }: AuthProviderProps) {
  const demoUser = getUser(CURRENT_USER_ID) ?? null;
  const [user, setUser] = useState<User | null>(initialSignedIn ? demoUser : null);

  const login = useCallback(() => setUser(demoUser), [demoUser]);
  const signup = useCallback(
    (name: string) => setUser(demoUser ? { ...demoUser, name: name.trim() || demoUser.name } : null),
    [demoUser]
  );
  const logout = useCallback(() => setUser(null), []);

  const value = useMemo(
    () => ({ user, isSignedIn: !!user, login, signup, logout }),
    [user, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}