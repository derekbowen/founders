import React, { useEffect, useRef, useState } from 'react';
import { MessagesSquareIcon, SendIcon } from 'lucide-react';
import { useOrders } from '../../contexts/OrdersContext';
import type { Order } from '../../types/marketplace';
import { formatDateTime } from '../../utils/format';
import { Avatar } from '../ui/Avatar';

export function OrderChat({ order, myName }: {order: Order;myName: string;}) {
  const { sendMessage } = useOrders();
  const [text, setText] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'nearest' });
  }, [order.messages.length]);

  const send = (e: {preventDefault: () => void;}) => {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage(order.id, text.trim());
    setText('');
  };

  return (
    <section className="card flex h-full min-h-[460px] flex-col" aria-labelledby="chat-heading">
      <header className="flex items-center gap-3 border-b border-line px-5 py-4">
        <Avatar name={order.counterparty.name} />
        <div>
          <h2 id="chat-heading" className="font-sans text-sm font-semibold">{order.counterparty.name}</h2>
          <p className="text-xs text-muted">{order.role === 'purchase' ? 'Maker' : 'Buyer'} · {order.counterparty.location}</p>
        </div>
      </header>
      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5" aria-live="polite">
        {order.messages.length === 0 ?
        <div className="flex h-full flex-col items-center justify-center py-10 text-center">
            <MessagesSquareIcon className="h-8 w-8 text-line" aria-hidden />
            <p className="mt-3 text-sm font-medium">No messages yet</p>
            <p className="mt-1 max-w-xs text-xs text-muted">
              Say hello to {order.counterparty.name.split(' ')[0]} — ask about timing, customizations or pickup.
            </p>
          </div> :

        order.messages.map((m) => {
          const mine = m.from === 'me';
          return (
            <div key={m.id} className={`flex items-end gap-2 ${mine ? 'flex-row-reverse' : ''}`}>
                <Avatar name={mine ? myName : order.counterparty.name} size="sm" />
                <div className={`max-w-[78%] ${mine ? 'text-right' : ''}`}>
                  <p className={`inline-block rounded-2xl px-4 py-2.5 text-left text-sm leading-relaxed ${mine ? 'rounded-br-md bg-primary text-white' : 'rounded-bl-md bg-subtle text-ink'}`}>
                    {m.text}
                  </p>
                  <p className="mt-1 px-1 text-[11px] text-muted">{formatDateTime(m.at)}</p>
                </div>
              </div>);

        })
        }
        <div ref={endRef} />
      </div>
      <form onSubmit={send} className="flex items-end gap-2 border-t border-line p-3">
        <label htmlFor="chat-input" className="sr-only">Message {order.counterparty.name}</label>
        <textarea
          id="chat-input"
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) send(e);
          }}
          placeholder={`Message ${order.counterparty.name.split(' ')[0]}…`}
          className="field-input max-h-32 min-h-[44px] flex-1 resize-none" />
        
        <button type="submit" disabled={!text.trim()} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-hover disabled:opacity-40" aria-label="Send message">
          <SendIcon className="h-4 w-4" />
        </button>
      </form>
    </section>);

}