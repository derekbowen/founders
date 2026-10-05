import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { listings as seedListings } from '../data/listings';
import { inquiries as seedInquiries } from '../data/inquiries';
import { users as seedUsers, DEMO_LANDLORD_ID, DEMO_RENTER_ID } from '../data/users';
import { nowIso } from '../utils/format';
import type { Listing } from '../types/listing';
import type { User, UserType } from '../types/user';
import type { Inquiry, InquiryStatus } from '../types/inquiry';

export interface NewInquiryInput {
  listingId: string;
  moveIn: string;
  stayMonths: number;
  aboutYou: string;
  message: string;
}

export interface SignupInput {
  firstName: string;
  lastName: string;
  email: string;
  type: UserType;
}

interface AppContextValue {
  currentUser: User | null;
  users: User[];
  listings: Listing[];
  inquiries: Inquiry[];
  unreadCount: number;
  loginAsDemo: (type: UserType) => User;
  loginWithEmail: (email: string) => User | null;
  signup: (input: SignupInput) => User;
  logout: () => void;
  updateCurrentUser: (patch: Partial<User>) => void;
  getUser: (id: string) => User | undefined;
  getListing: (id: string) => Listing | undefined;
  addListing: (listing: Omit<Listing, 'id' | 'landlordId' | 'createdAt'>) => string;
  addInquiry: (input: NewInquiryInput) => string;
  sendMessage: (inquiryId: string, text: string) => void;
  setInquiryStatus: (inquiryId: string, status: InquiryStatus, note?: string) => void;
  markRead: (inquiryId: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: {children: React.ReactNode;}) {
  const [users, setUsers] = useState<User[]>(seedUsers);
  const [listings, setListings] = useState<Listing[]>(seedListings);
  const [inquiries, setInquiries] = useState<Inquiry[]>(seedInquiries);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const currentUser = useMemo(
    () => users.find((u) => u.id === currentUserId) ?? null,
    [users, currentUserId]
  );

  const unreadCount = useMemo(
    () => currentUserId ? inquiries.filter((i) => i.unreadFor.includes(currentUserId)).length : 0,
    [inquiries, currentUserId]
  );

  const getUser = useCallback((id: string) => users.find((u) => u.id === id), [users]);
  const getListing = useCallback((id: string) => listings.find((l) => l.id === id), [listings]);

  const loginAsDemo = useCallback(
    (type: UserType) => {
      const id = type === 'renter' ? DEMO_RENTER_ID : DEMO_LANDLORD_ID;
      setCurrentUserId(id);
      return users.find((u) => u.id === id) as User;
    },
    [users]
  );

  const loginWithEmail = useCallback(
    (email: string) => {
      const user = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
      if (user) setCurrentUserId(user.id);
      return user ?? null;
    },
    [users]
  );

  const signup = useCallback((input: SignupInput) => {
    const user: User = {
      id: `u-${Date.now()}`,
      name: `${input.firstName.trim()} ${input.lastName.trim()}`,
      type: input.type,
      email: input.email.trim(),
      city: '',
      bio: '',
      joined: nowIso().slice(0, 10),
      languages: ['English'],
      verified: false,
      ...(input.type === 'landlord' ? { responseRate: 100, responseTime: 'within a day' } : {})
    };
    setUsers((prev) => [...prev, user]);
    setCurrentUserId(user.id);
    return user;
  }, []);

  const logout = useCallback(() => setCurrentUserId(null), []);

  const updateCurrentUser = useCallback(
    (patch: Partial<User>) => {
      if (!currentUserId) return;
      setUsers((prev) => prev.map((u) => u.id === currentUserId ? { ...u, ...patch } : u));
    },
    [currentUserId]
  );

  const addListing = useCallback(
    (listing: Omit<Listing, 'id' | 'landlordId' | 'createdAt'>) => {
      const id = `l-${Date.now()}`;
      setListings((prev) => [
      { ...listing, id, landlordId: currentUserId ?? DEMO_LANDLORD_ID, createdAt: nowIso().slice(0, 10) },
      ...prev]
      );
      return id;
    },
    [currentUserId]
  );

  const addInquiry = useCallback(
    (input: NewInquiryInput) => {
      const listing = listings.find((l) => l.id === input.listingId);
      const id = `inq-${Date.now()}`;
      const at = nowIso();
      const renterId = currentUserId ?? DEMO_RENTER_ID;
      const inquiry: Inquiry = {
        id,
        listingId: input.listingId,
        renterId,
        landlordId: listing?.landlordId ?? '',
        status: 'sent',
        moveIn: input.moveIn,
        stayMonths: input.stayMonths,
        aboutYou: input.aboutYou,
        createdAt: at,
        messages: [{ id: `m-${Date.now()}`, senderId: renterId, text: input.message, sentAt: at }],
        timeline: [{ status: 'sent', at }],
        unreadFor: [listing?.landlordId ?? '']
      };
      setInquiries((prev) => [inquiry, ...prev]);
      return id;
    },
    [listings, currentUserId]
  );

  const sendMessage = useCallback(
    (inquiryId: string, text: string) => {
      if (!currentUserId) return;
      const at = nowIso();
      setInquiries((prev) =>
      prev.map((inq): Inquiry => {
        if (inq.id !== inquiryId) return inq;
        const isLandlord = inq.landlordId === currentUserId;
        const shouldMarkReplied = isLandlord && inq.status === 'sent';
        const otherId = isLandlord ? inq.renterId : inq.landlordId;
        return {
          ...inq,
          status: shouldMarkReplied ? 'replied' : inq.status,
          timeline: shouldMarkReplied ? [...inq.timeline, { status: 'replied', at }] : inq.timeline,
          messages: [...inq.messages, { id: `m-${Date.now()}`, senderId: currentUserId, text, sentAt: at }],
          unreadFor: Array.from(new Set([...inq.unreadFor.filter((u) => u !== currentUserId), otherId]))
        };
      })
      );
    },
    [currentUserId]
  );

  const setInquiryStatus = useCallback((inquiryId: string, status: InquiryStatus, note?: string) => {
    const at = nowIso();
    setInquiries((prev) =>
    prev.map((inq) =>
    inq.id === inquiryId ?
    {
      ...inq,
      status,
      viewingAt: status === 'viewing' && note ? note : inq.viewingAt,
      timeline: [...inq.timeline, { status, at, note: status === 'viewing' ? undefined : note }]
    } :
    inq
    )
    );
  }, []);

  const markRead = useCallback(
    (inquiryId: string) => {
      if (!currentUserId) return;
      setInquiries((prev) =>
      prev.map((inq) =>
      inq.id === inquiryId && inq.unreadFor.includes(currentUserId) ?
      { ...inq, unreadFor: inq.unreadFor.filter((u) => u !== currentUserId) } :
      inq
      )
      );
    },
    [currentUserId]
  );

  const value: AppContextValue = {
    currentUser,
    users,
    listings,
    inquiries,
    unreadCount,
    loginAsDemo,
    loginWithEmail,
    signup,
    logout,
    updateCurrentUser,
    getUser,
    getListing,
    addListing,
    addInquiry,
    sendMessage,
    setInquiryStatus,
    markRead
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}