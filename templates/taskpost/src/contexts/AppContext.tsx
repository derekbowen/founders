import React, { createContext, useCallback, useMemo, useState } from 'react';
import { jobs as initialJobs } from '../data/jobs';
import { neighborhoods } from '../data/neighborhoods';
import { transactions as initialTransactions } from '../data/transactions';
import { CURRENT_USER_ID, defaultCurrentUser, users as initialUsers } from '../data/users';
import type {
  CurrentUser,
  Job,
  NewJobInput,
  OfferInput,
  PayoutDetails,
  Transaction,
  TransactionEvent,
  User,
  UserRole } from
'../types/marketplace';
import { formatMoney } from '../utils/format';
import { createId, nowISO } from '../utils/time';
import { customerTotal, getActiveOffer, viewerRole } from '../utils/transactions';

export interface AppContextValue {
  user: CurrentUser | null;
  users: User[];
  jobs: Job[];
  transactions: Transaction[];
  getUser: (id: string) => User | undefined;
  getJob: (id: string) => Job | undefined;
  getTransaction: (id: string) => Transaction | undefined;
  login: (email: string) => void;
  signup: (input: {name: string;email: string;role: UserRole;}) => void;
  logout: () => void;
  updateContact: (input: {email: string;phone: string;}) => void;
  updatePayout: (payout: PayoutDetails) => void;
  enableRole: (role: UserRole) => void;
  postJob: (input: NewJobInput) => Job;
  makeOffer: (jobId: string, input: OfferInput) => string;
  counterOffer: (txId: string, input: OfferInput) => void;
  acceptOffer: (txId: string) => void;
  declineOffer: (txId: string) => void;
  payTransaction: (txId: string) => void;
  markDone: (txId: string) => void;
  confirmCompletion: (txId: string) => void;
  leaveReview: (txId: string, rating: number, text: string) => void;
  sendMessage: (txId: string, text: string) => void;
}

export const AppContext = createContext<AppContextValue | null>(null);

function event(type: TransactionEvent['type'], label: string): TransactionEvent {
  return { id: createId('e'), type, label, createdAt: nowISO() };
}

function firstName(name: string): string {
  return name.split(' ')[0];
}

export function AppProvider({ children }: {children: React.ReactNode;}) {
  const [user, setUser] = useState<CurrentUser | null>(defaultCurrentUser);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const getUser = useCallback((id: string) => users.find((u) => u.id === id), [users]);
  const getJob = useCallback((id: string) => jobs.find((j) => j.id === id), [jobs]);
  const getTransaction = useCallback(
    (id: string) => transactions.find((t) => t.id === id),
    [transactions]
  );

  const nameOf = useCallback(
    (id: string) => firstName(users.find((u) => u.id === id)?.name ?? 'Someone'),
    [users]
  );

  const updateTx = useCallback((txId: string, fn: (tx: Transaction) => Transaction) => {
    setTransactions((prev) =>
    prev.map((t) => t.id === txId ? { ...fn(t), updatedAt: nowISO() } : t)
    );
  }, []);

  const login = useCallback((email: string) => {
    setUser({ ...defaultCurrentUser, email });
  }, []);

  const signup = useCallback((input: {name: string;email: string;role: UserRole;}) => {
    setUser({
      ...defaultCurrentUser,
      name: input.name,
      email: input.email,
      roles: [input.role],
      payout: input.role === 'pro' ? undefined : defaultCurrentUser.payout
    });
    setUsers((prev) =>
    prev.map((u) => u.id === CURRENT_USER_ID ? { ...u, name: input.name, roles: [input.role] } : u)
    );
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const updateContact = useCallback((input: {email: string;phone: string;}) => {
    setUser((prev) => prev ? { ...prev, ...input } : prev);
  }, []);

  const updatePayout = useCallback((payout: PayoutDetails) => {
    setUser((prev) => prev ? { ...prev, payout } : prev);
  }, []);

  const enableRole = useCallback((role: UserRole) => {
    setUser((prev) =>
    prev && !prev.roles.includes(role) ? { ...prev, roles: [...prev.roles, role] } : prev
    );
    setUsers((prev) =>
    prev.map((u) =>
    u.id === CURRENT_USER_ID && !u.roles.includes(role) ? { ...u, roles: [...u.roles, role] } : u
    )
    );
  }, []);

  const postJob = useCallback(
    (input: NewJobInput): Job => {
      const hood = neighborhoods.find((n) => n.name === input.area) ?? neighborhoods[0];
      const job: Job = {
        id: createId('j'),
        title: input.title.trim(),
        categoryId: input.categoryId,
        description: input.description.trim(),
        details: input.accessNotes.trim() ? [input.accessNotes.trim()] : [],
        photos: input.photos,
        area: hood.name,
        city: 'Portland, OR',
        lat: hood.lat,
        lng: hood.lng,
        distanceMi: hood.distanceMi,
        preferredDate: input.preferredDate,
        timing: input.timing,
        timeOfDay: input.timeOfDay,
        budgetMin: input.budgetMin,
        budgetMax: input.budgetMax,
        size: input.size,
        customerId: user?.id ?? CURRENT_USER_ID,
        offerCount: 0,
        postedAt: nowISO(),
        status: 'open'
      };
      setJobs((prev) => [job, ...prev]);
      return job;
    },
    [user]
  );

  const makeOffer = useCallback(
    (jobId: string, input: OfferInput): string => {
      const job = jobs.find((j) => j.id === jobId);
      const id = createId('tx');
      if (!job) return id;
      const createdAt = nowISO();
      const tx: Transaction = {
        id,
        jobId,
        customerId: job.customerId,
        proId: user?.id ?? CURRENT_USER_ID,
        status: 'offer_sent',
        proMarkedDone: false,
        offers: [{ id: createId('o'), by: 'pro', ...input, createdAt, state: 'active' }],
        messages: [],
        events: [event('offer', `You sent an offer · ${formatMoney(input.amount)}`)],
        updatedAt: createdAt
      };
      setTransactions((prev) => [tx, ...prev]);
      setJobs((prev) => prev.map((j) => j.id === jobId ? { ...j, offerCount: j.offerCount + 1 } : j));
      return id;
    },
    [jobs, user]
  );

  const counterOffer = useCallback(
    (txId: string, input: OfferInput) => {
      updateTx(txId, (tx) => {
        const by = viewerRole(tx, user?.id ?? CURRENT_USER_ID);
        return {
          ...tx,
          status: 'countered',
          offers: [
          ...tx.offers.map((o) => o.state === 'active' ? { ...o, state: 'superseded' as const } : o),
          { id: createId('o'), by, ...input, createdAt: nowISO(), state: 'active' }],

          events: [...tx.events, event('counter', `You countered · ${formatMoney(input.amount)}`)]
        };
      });
    },
    [updateTx, user]
  );

  const acceptOffer = useCallback(
    (txId: string) => {
      updateTx(txId, (tx) => {
        const active = getActiveOffer(tx);
        return {
          ...tx,
          status: 'accepted',
          offers: tx.offers.map((o) => o.state === 'active' ? { ...o, state: 'accepted' as const } : o),
          events: [
          ...tx.events,
          event('accepted', `You accepted the offer · ${formatMoney(active?.amount ?? 0)}`)]

        };
      });
    },
    [updateTx]
  );

  const declineOffer = useCallback(
    (txId: string) => {
      updateTx(txId, (tx) => ({
        ...tx,
        status: 'declined',
        offers: tx.offers.map((o) => o.state === 'active' ? { ...o, state: 'declined' as const } : o),
        events: [...tx.events, event('declined', 'You declined the offer')]
      }));
    },
    [updateTx]
  );

  const payTransaction = useCallback(
    (txId: string) => {
      const jobId = transactions.find((t) => t.id === txId)?.jobId;
      updateTx(txId, (tx) => {
        const agreed = tx.offers.find((o) => o.state === 'accepted');
        return {
          ...tx,
          status: 'paid',
          events: [
          ...tx.events,
          event('paid', `Payment of ${formatMoney(customerTotal(agreed?.amount ?? 0))} secured`)]

        };
      });
      setJobs((prev) => prev.map((j) => j.id === jobId ? { ...j, status: 'in_progress' } : j));
    },
    [updateTx, transactions]
  );

  const markDone = useCallback(
    (txId: string) => {
      updateTx(txId, (tx) => ({
        ...tx,
        proMarkedDone: true,
        events: [...tx.events, event('marked_done', 'You marked the job as done')]
      }));
    },
    [updateTx]
  );

  const confirmCompletion = useCallback(
    (txId: string) => {
      const jobId = transactions.find((t) => t.id === txId)?.jobId;
      updateTx(txId, (tx) => ({
        ...tx,
        status: 'completed',
        proMarkedDone: true,
        events: [
        ...tx.events,
        event('completed', `You confirmed completion · payout released to ${nameOf(tx.proId)}`)]

      }));
      setJobs((prev) => prev.map((j) => j.id === jobId ? { ...j, status: 'completed' } : j));
    },
    [updateTx, nameOf, transactions]
  );

  const leaveReview = useCallback(
    (txId: string, rating: number, text: string) => {
      updateTx(txId, (tx) => ({
        ...tx,
        review: { rating, text },
        events: [...tx.events, event('reviewed', `You left a ${rating}-star review`)]
      }));
    },
    [updateTx]
  );

  const sendMessage = useCallback(
    (txId: string, text: string) => {
      updateTx(txId, (tx) => ({
        ...tx,
        messages: [
        ...tx.messages,
        { id: createId('m'), senderId: user?.id ?? CURRENT_USER_ID, text, createdAt: nowISO() }]

      }));
    },
    [updateTx, user]
  );

  const value = useMemo<AppContextValue>(
    () => ({
      user, users, jobs, transactions,
      getUser, getJob, getTransaction,
      login, signup, logout, updateContact, updatePayout, enableRole,
      postJob, makeOffer, counterOffer, acceptOffer, declineOffer,
      payTransaction, markDone, confirmCompletion, leaveReview, sendMessage
    }),
    [
    user, users, jobs, transactions, getUser, getJob, getTransaction, login, signup, logout,
    updateContact, updatePayout, enableRole, postJob, makeOffer, counterOffer, acceptOffer,
    declineOffer, payTransaction, markDone, confirmCompletion, leaveReview, sendMessage]

  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}