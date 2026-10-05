import React, { useEffect, useRef, useState } from 'react';
import { MessagesSquareIcon, SendIcon } from 'lucide-react';
import type { Order } from '../../types/marketplace';
import { formatDateTime } from '../../utils/orders';

interface OrderChatProps {
  order: Order;
  onSend: (body: string) => void;
}

export function OrderChat({ order, onSend }: OrderChatProps) {
  const [draft, setDraft] = useState('');
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [order.id, order.messages.length]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    onSend(draft.trim());
    setDraft('');
  };

  return (
    <section className="flex h-full min-h-[420px] flex-col rounded-xl border border-slate-200 bg-white" aria-labelledby="chat-heading">
      <div className="border-b border-slate-100 px-4 py-3">
        <h2 id="chat-heading" className="text-sm font-semibold text-slate-900">
          Messages with {order.counterparty.name}
        </h2>
        <p className="text-xs text-slate-500">{order.counterparty.business}</p>
      </div>
      <div ref={listRef} className="max-h-[520px] flex-1 space-y-3 overflow-y-auto bg-slate-50/60 p-4" aria-live="polite">
        {order.messages.length === 0 ?
        <div className="flex h-full flex-col items-center justify-center py-10 text-center text-sm text-slate-500">
            <MessagesSquareIcon className="mb-2 h-6 w-6 text-slate-300" aria-hidden="true" />
            No messages yet. Say hello or ask about delivery.
          </div> :

        order.messages.map((m) =>
        <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className="max-w-[80%]">
                <div
              className={`rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
              m.from === 'me' ? 'rounded-br-md bg-primary-700 text-white' : 'rounded-bl-md border border-slate-200 bg-white text-slate-800'}`
              }>
              
                  {m.body}
                </div>
                <p className={`mt-1 text-[11px] text-slate-400 ${m.from === 'me' ? 'text-right' : ''}`}>
                  {m.author} · {formatDateTime(m.sentAt)}
                </p>
              </div>
            </div>
        )
        }
      </div>
      <form onSubmit={submit} className="flex gap-2 border-t border-slate-100 p-3">
        <label htmlFor="chat-input" className="sr-only">
          Write a message
        </label>
        <input
          id="chat-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Write a message…"
          className="h-10 flex-1 rounded-lg border border-slate-300 px-3 text-sm placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
        
        <button
          type="submit"
          disabled={!draft.trim()}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-700 text-white transition-colors hover:bg-primary-800 disabled:opacity-40"
          aria-label="Send message">
          
          <SendIcon className="h-4 w-4" />
        </button>
      </form>
    </section>);

}