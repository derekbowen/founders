import { useEffect, useRef, useState } from 'react';
import { Message, TimelineEvent, Transaction, TxStatus } from '../types/transaction';

const now = () => new Date().toISOString().slice(0, 19);

const autoReplies = [
'Sounds great, thank you! 😊',
'Got it — I’ll make a note of that.',
'Perfect, see you then!'];


export interface TxAction {
  label: string;
  next: TxStatus;
  event: string;
  tone: 'primary' | 'outline' | 'danger';
}

export function actionsFor(t: Transaction, status: TxStatus): TxAction[] {
  if (t.kind === 'booking') {
    if (status === 'Requested') return [{ label: 'Cancel request', next: 'Cancelled', event: 'Request cancelled by you', tone: 'danger' }];
    if (status === 'Confirmed') return [{ label: 'Cancel booking', next: 'Cancelled', event: 'Cancelled by you · full refund', tone: 'danger' }];
    return [];
  }
  if (status === 'Requested')
  return [
  { label: 'Accept job', next: 'Confirmed', event: 'You accepted', tone: 'primary' },
  { label: 'Decline', next: 'Cancelled', event: 'You declined', tone: 'danger' }];

  if (status === 'Confirmed') return [{ label: 'Check in & start sit', next: 'In progress', event: 'Checked in', tone: 'primary' }];
  if (status === 'In progress') return [{ label: 'Mark sit complete', next: 'Completed', event: 'Sit completed', tone: 'primary' }];
  return [];
}

export function useTransactionState(tx: Transaction | undefined) {
  const [status, setStatus] = useState<TxStatus>(tx?.status ?? 'Requested');
  const [messages, setMessages] = useState<Message[]>(tx?.messages ?? []);
  const [timeline, setTimeline] = useState<TimelineEvent[]>(tx?.timeline ?? []);
  const [isTyping, setIsTyping] = useState(false);
  const replyIndex = useRef(0);
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const send = (text: string) => {
    setMessages((m) => [...m, { id: `local-${Date.now()}`, from: 'me', text, at: now() }]);
    setIsTyping(true);
    timer.current = window.setTimeout(() => {
      setIsTyping(false);
      const reply = autoReplies[replyIndex.current++ % autoReplies.length];
      setMessages((m) => [...m, { id: `reply-${Date.now()}`, from: 'them', text: reply, at: now() }]);
    }, 1600);
  };

  const runAction = (a: TxAction) => {
    setStatus(a.next);
    setTimeline((events) => {
      const done = events.map((e): TimelineEvent => e.state === 'current' ? { ...e, state: 'done', at: e.at ?? now() } : e);
      if (a.next === 'Cancelled') {
        const cancelled: TimelineEvent = { label: a.event, at: now(), state: 'cancelled' };
        return [...done.filter((e) => e.state === 'done'), cancelled];
      }
      const firstUpcoming = done.findIndex((e) => e.state === 'upcoming');
      return done.map((e, i): TimelineEvent =>
      i === firstUpcoming ? { ...e, state: a.next === 'Completed' ? 'done' : 'current', at: a.next === 'Completed' ? now() : e.at } : e
      );
    });
  };

  return { status, messages, timeline, isTyping, send, runAction };
}