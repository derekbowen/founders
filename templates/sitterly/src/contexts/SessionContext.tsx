import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { demoUser } from '../data/currentUser';

export type UserType = 'parent' | 'sitter';

export interface SessionUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photo?: string;
  type: UserType;
}

interface SessionValue {
  user: SessionUser | null;
  login: (user?: Partial<SessionUser>) => void;
  logout: () => void;
  updateUser: (patch: Partial<SessionUser>) => void;
}

const SessionContext = createContext<SessionValue | null>(null);

export function SessionProvider({ children }: {children: React.ReactNode;}) {
  const [user, setUser] = useState<SessionUser | null>(null);

  const login = useCallback((patch: Partial<SessionUser> = {}) => {
    setUser({ ...demoUser, type: 'parent', ...patch });
  }, []);
  const logout = useCallback(() => setUser(null), []);
  const updateUser = useCallback((patch: Partial<SessionUser>) => {
    setUser((prev) => prev ? { ...prev, ...patch } : prev);
  }, []);

  const value = useMemo(() => ({ user, login, logout, updateUser }), [user, login, logout, updateUser]);
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionValue {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within SessionProvider');
  return ctx;
}