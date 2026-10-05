import React, { useEffect, useRef, useState } from 'react';
import { SendIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { useBookings } from '../../contexts/BookingContext';
import { Transaction } from '../../types/marketplace';

export function ChatThread({ tx, otherName }: {tx: Transaction;otherName: string;}) {
  const { sendMessage } = useBookings();
  const [text, setText] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'nearest' });
  }, [tx.messages.length]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage(tx.id, text.trim());
    setText('');
  };

  return (
    <section className="card flex min-h-[420px] flex-col" aria-label={`Conversation with ${otherName}`}>
      <div className="border-b border-slate-100 px-5 py-3">
        <h3 className="text-sm font-semibold">Messages with {otherName}</h3>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4" aria-live="polite">
        {tx.messages.length === 0 && <p className="py-10 text-center text-sm text-slate-500">No messages yet. Say hi!</p>}
        {tx.messages.map((m) =>
        <div key={m.id} className={`flex items-end gap-2 ${m.fromMe ? 'justify-end' : ''}`}>
            {!m.fromMe && <Avatar name={otherName} alt={otherName} size="xs" />}
            <div className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm ${m.fromMe ? 'rounded-br-md bg-brand text-white' : 'rounded-bl-md bg-slate-100 text-ink'}`}>
              <p>{m.text}</p>
              <p className={`mt-0.5 text-[10px] ${m.fromMe ? 'text-white/70' : 'text-slate-500'}`}>{m.timeLabel}</p>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <form onSubmit={onSubmit} className="flex gap-2 border-t border-slate-100 p-3">
        <label htmlFor={`chat-${tx.id}`} className="sr-only">Write a message</label>
        <input id={`chat-${tx.id}`} value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a message…" className="field" />
        <button type="submit" disabled={!text.trim()} className="btn btn-primary btn-md" aria-label="Send message">
          <SendIcon size={16} />
        </button>
      </form>
    </section>);

}