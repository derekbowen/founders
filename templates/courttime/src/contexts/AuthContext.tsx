import React, { createContext, useContext, useMemo, useState } from 'react';
import { currentUserId, users } from '../data/users';
import { User } from '../types/marketplace';

interface AuthContextValue {
  user: User | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children, initialLoggedIn }: {children: React.ReactNode;initialLoggedIn: boolean;}) {
  const me = users.find((u) => u.id === currentUserId) ?? null;
  const [user, setUser] = useState<User | null>(initialLoggedIn ? me : null);
  const value = useMemo(
    () => ({ user, login: () => setUser(me), logout: () => setUser(null) }),
    [user, me]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}