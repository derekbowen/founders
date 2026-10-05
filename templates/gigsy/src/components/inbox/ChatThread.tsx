import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SendIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { OfferCard } from './OfferCard';
import { CURRENT_USER_ID } from '../../data/users';
import { Transaction, TxRole } from '../../types/marketplace';
import { formatDate } from '../../utils/format';
import { getUser } from '../../utils/lookup';

interface ChatThreadProps {
  tx: Transaction;
  role: TxRole;
  onSend: (text: string) => void;
}

type FeedItem =
{kind: 'message';at: string;id: string;authorId: string;text: string;} |
{kind: 'offer';at: string;id: string;index: number;};

export function ChatThread({ tx, role, onSend }: ChatThreadProps) {
  const [text, setText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const other = getUser(role === 'client' ? tx.freelancerId : tx.clientId);

  const feed = useMemo<FeedItem[]>(() => {
    const items: FeedItem[] = [
    ...tx.messages.map((m) => ({ kind: 'message' as const, at: m.at, id: m.id, authorId: m.authorId, text: m.text })),
    ...tx.offers.map((o, index) => ({ kind: 'offer' as const, at: o.createdAt, id: o.id, index }))];

    return items.sort((a, b) => new Date(a.at).getTime() - new Date(b.at).getTime());
  }, [tx.messages, tx.offers]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [feed.length]);

  const send = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  };

  const disabled = tx.status === 'declined';

  return (
    <section className="flex flex-col rounded-2xl border border-slate-200 bg-white" aria-labelledby="chat-heading">
      <h2 id="chat-heading" className="border-b border-slate-100 px-5 py-3.5 text-sm font-bold text-slate-900">
        Messages with {other?.name.split(' ')[0]}
      </h2>
      <div ref={scrollRef} className="max-h-[440px] min-h-[180px] space-y-4 overflow-y-auto px-5 py-5" aria-live="polite">
        {feed.length === 0 &&
        <p className="py-8 text-center text-sm text-slate-500">No messages yet. Say hello and share any extra context.</p>
        }
        {feed.map((item) => {
          if (item.kind === 'offer') {
            const offer = tx.offers[item.index];
            const mine = offer.from === role;
            return (
              <div key={item.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                <div className="w-full max-w-md">
                  <OfferCard compact offer={offer} authorLabel={mine ? 'You' : other?.name.split(' ')[0] ?? ''} />
                  <p className={`mt-1 text-xs text-slate-400 ${mine ? 'text-right' : ''}`}>{formatDate(offer.createdAt, 'MMM d, h:mm a')}</p>
                </div>
              </div>);

          }
          const mine = item.authorId === CURRENT_USER_ID;
          const author = getUser(item.authorId);
          return (
            <div key={item.id} className={`flex items-end gap-2 ${mine ? 'flex-row-reverse' : ''}`}>
              {!mine && <Avatar name={author?.name ?? ''} alt="" src={author?.avatar} size="xs" />}
              <div className={`max-w-[80%] ${mine ? 'text-right' : ''}`}>
                <p className={`inline-block whitespace-pre-line rounded-2xl px-4 py-2.5 text-left text-sm leading-relaxed ${mine ? 'rounded-br-md bg-primary-600 text-white' : 'rounded-bl-md bg-slate-100 text-slate-800'}`}>
                  {item.text}
                </p>
                <p className="mt-1 text-xs text-slate-400">{formatDate(item.at, 'MMM d, h:mm a')}</p>
              </div>
            </div>);

        })}
      </div>
      <form
        className="flex items-end gap-2 border-t border-slate-100 p-3"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}>
        
        <label htmlFor="chat-input" className="sr-only">Write a message</label>
        <textarea
          id="chat-input"
          rows={1}
          value={text}
          disabled={disabled}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          placeholder={disabled ? 'This conversation is closed' : 'Write a message… (Enter to send)'}
          className="max-h-32 min-h-[44px] flex-1 resize-none rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100 disabled:bg-slate-50" />
        
        <button
          type="submit"
          disabled={!text.trim() || disabled}
          aria-label="Send message"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400">
          
          <SendIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>
    </section>);

}