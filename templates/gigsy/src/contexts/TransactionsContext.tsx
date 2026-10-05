import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { seedTransactions } from '../data/transactions';
import { CURRENT_USER_ID } from '../data/users';
import { DeliveryFile, ProjectBrief, Transaction, TxRole, TxStatus } from '../types/marketplace';
import { formatMoney } from '../utils/format';
import { getListing, getUser } from '../utils/lookup';

interface OfferInput {
  price: number;
  deliveryDate: string;
  scope: string;
}

interface TransactionsContextValue {
  transactions: Transaction[];
  getTransaction: (id: string) => Transaction | undefined;
  unreadCount: number;
  requestQuote: (listingId: string, brief: ProjectBrief) => string;
  sendMessage: (txId: string, text: string) => void;
  sendOffer: (txId: string, role: TxRole, offer: OfferInput) => void;
  acceptOffer: (txId: string, role: TxRole) => void;
  declineOffer: (txId: string, role: TxRole) => void;
  deliver: (txId: string, files: Omit<DeliveryFile, 'id' | 'at'>[], note: string) => void;
  requestRevision: (txId: string, note: string) => void;
  complete: (txId: string) => void;
  markRead: (txId: string) => void;
}

const TransactionsContext = createContext<TransactionsContextValue | null>(null);

const uid = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
const nowIso = () => new Date().toISOString();

function withEvent(tx: Transaction, status: TxStatus, label: string): Transaction {
  const at = nowIso();
  return {
    ...tx,
    status,
    updatedAt: at,
    timeline: [...tx.timeline, { id: uid('e'), status, label, at }]
  };
}

function firstName(userId: string): string {
  return getUser(userId)?.name.split(' ')[0] ?? 'They';
}

export function TransactionsProvider({ children }: {children: React.ReactNode;}) {
  const [transactions, setTransactions] = useState<Transaction[]>(seedTransactions);

  const update = useCallback((id: string, fn: (tx: Transaction) => Transaction) => {
    setTransactions((prev) => prev.map((tx) => tx.id === id ? fn(tx) : tx));
  }, []);

  const getTransaction = useCallback(
    (id: string) => transactions.find((t) => t.id === id),
    [transactions]
  );

  const requestQuote = useCallback((listingId: string, brief: ProjectBrief) => {
    const listing = getListing(listingId);
    const id = `t-${Math.floor(3000 + Math.random() * 6000)}`;
    const at = nowIso();
    const tx: Transaction = {
      id,
      listingId,
      clientId: CURRENT_USER_ID,
      freelancerId: listing?.freelancerId ?? '',
      status: 'quote-requested',
      brief,
      offers: [],
      messages: [],
      timeline: [{ id: uid('e'), status: 'quote-requested', label: 'You requested a quote', at }],
      deliveries: [],
      updatedAt: at
    };
    setTransactions((prev) => [tx, ...prev]);
    return id;
  }, []);

  const sendMessage = useCallback(
    (txId: string, text: string) =>
    update(txId, (tx) => ({
      ...tx,
      updatedAt: nowIso(),
      messages: [...tx.messages, { id: uid('m'), authorId: CURRENT_USER_ID, text, at: nowIso() }]
    })),
    [update]
  );

  const sendOffer = useCallback(
    (txId: string, role: TxRole, input: OfferInput) =>
    update(txId, (tx) => {
      const isCounter = tx.offers.some((o) => o.status === 'pending');
      const offers = tx.offers.map((o) => o.status === 'pending' ? { ...o, status: 'countered' as const } : o);
      const next = {
        ...tx,
        offers: [...offers, { id: uid('o'), from: role, ...input, createdAt: nowIso(), status: 'pending' as const }]
      };
      const status: TxStatus = role === 'client' ? 'countered' : isCounter ? 'countered' : 'offer-sent';
      const verb = isCounter ? 'countered with' : 'sent an offer of';
      return withEvent(next, status, `You ${verb} ${formatMoney(input.price)}`);
    }),
    [update]
  );

  const acceptOffer = useCallback(
    (txId: string, role: TxRole) =>
    update(txId, (tx) => {
      const offers = tx.offers.map((o) => o.status === 'pending' ? { ...o, status: 'accepted' as const } : o);
      const label =
      role === 'client' ? 'You accepted and paid' : `You accepted ${firstName(tx.clientId)}'s counter-offer`;
      return withEvent({ ...tx, offers }, 'accepted', label);
    }),
    [update]
  );

  const declineOffer = useCallback(
    (txId: string, role: TxRole) =>
    update(txId, (tx) => {
      const offers = tx.offers.map((o) => o.status === 'pending' ? { ...o, status: 'declined' as const } : o);
      const label = tx.offers.length === 0 && role === 'freelancer' ? 'You declined the request' : role === 'client' && tx.offers.length === 0 ? 'You withdrew the request' : 'You declined the offer';
      return withEvent({ ...tx, offers }, 'declined', label);
    }),
    [update]
  );

  const deliver = useCallback(
    (txId: string, files: Omit<DeliveryFile, 'id' | 'at'>[], note: string) =>
    update(txId, (tx) => {
      const at = nowIso();
      const deliveries = [...tx.deliveries, ...files.map((f) => ({ ...f, id: uid('d'), at }))];
      return withEvent({ ...tx, deliveries, deliveryNote: note || tx.deliveryNote }, 'delivered', 'You delivered the work');
    }),
    [update]
  );

  const requestRevision = useCallback(
    (txId: string, note: string) =>
    update(txId, (tx) => {
      const messages = note ?
      [...tx.messages, { id: uid('m'), authorId: CURRENT_USER_ID, text: note, at: nowIso() }] :
      tx.messages;
      return withEvent({ ...tx, messages }, 'accepted', 'You requested a revision');
    }),
    [update]
  );

  const complete = useCallback(
    (txId: string) => update(txId, (tx) => withEvent(tx, 'completed', 'You approved the delivery')),
    [update]
  );

  const markRead = useCallback(
    (txId: string) => update(txId, (tx) => tx.unread ? { ...tx, unread: false } : tx),
    [update]
  );

  const unreadCount = transactions.filter((t) => t.unread).length;

  const value = useMemo(
    () => ({
      transactions,
      getTransaction,
      unreadCount,
      requestQuote,
      sendMessage,
      sendOffer,
      acceptOffer,
      declineOffer,
      deliver,
      requestRevision,
      complete,
      markRead
    }),
    [transactions, getTransaction, unreadCount, requestQuote, sendMessage, sendOffer, acceptOffer, declineOffer, deliver, requestRevision, complete, markRead]
  );

  return <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>;
}

export function useTransactions(): TransactionsContextValue {
  const ctx = useContext(TransactionsContext);
  if (!ctx) throw new Error('useTransactions must be used within TransactionsProvider');
  return ctx;
}