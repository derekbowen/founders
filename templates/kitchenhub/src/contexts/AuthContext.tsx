import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { currentUserId, hosts } from '../data/hosts';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  business: string;
  avatar?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (email: string) => void;
  signup: (name: string, email: string, business: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const demo = hosts.find((h) => h.id === currentUserId) ?? hosts[0];
const demoUser: AuthUser = { id: demo.id, name: demo.name, email: demo.email, business: demo.business, avatar: demo.avatar };

export function AuthProvider({ children }: {children: React.ReactNode;}) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = useCallback((email: string) => setUser({ ...demoUser, email: email || demoUser.email }), []);
  const signup = useCallback(
    (name: string, email: string, business: string) =>
    setUser({ id: demoUser.id, name, email, business: business || 'My food business' }),
    []
  );
  const logout = useCallback(() => setUser(null), []);

  const value = useMemo(() => ({ user, login, signup, logout }), [user, login, signup, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}