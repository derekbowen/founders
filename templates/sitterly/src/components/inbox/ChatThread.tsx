import React, { useEffect, useRef, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { SendIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { Message } from '../../types/transaction';

interface ChatThreadProps {
  messages: Message[];
  counterpartName: string;
  counterpartPhoto?: string;
  myName: string;
  myPhoto?: string;
  onSend: (text: string) => void;
  isTyping?: boolean;
  disabled?: boolean;
}

export function ChatThread({ messages, counterpartName, counterpartPhoto, myName, myPhoto, onSend, isTyping, disabled }: ChatThreadProps) {
  const [draft, setDraft] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages.length, isTyping]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    onSend(draft.trim());
    setDraft('');
  };

  return (
    <section aria-label={`Conversation with ${counterpartName}`} className="flex h-[560px] flex-col rounded-3xl border border-ink-200 bg-white">
      <div className="flex-1 space-y-4 overflow-y-auto p-5" role="log" aria-live="polite">
        {messages.length === 0 && <p className="py-10 text-center text-sm text-ink-600">No messages yet. Say hi 👋</p>}
        {messages.map((m) => {
          const mine = m.from === 'me';
          return (
            <div key={m.id} className={`flex items-end gap-2 ${mine ? 'flex-row-reverse' : ''}`}>
              <Avatar name={mine ? myName : counterpartName} alt="" src={mine ? myPhoto : counterpartPhoto} size="xs" />
              <div className={`max-w-[78%] ${mine ? 'text-right' : ''}`}>
                <p className={`inline-block rounded-2xl px-4 py-2.5 text-left text-sm leading-relaxed ${mine ? 'rounded-br-md bg-primary-600 text-white' : 'rounded-bl-md bg-ink-100 text-ink-900'}`}>
                  {m.text}
                </p>
                <p className="mt-1 text-[11px] text-ink-500">{format(parseISO(m.at), 'MMM d, h:mm a')}</p>
              </div>
            </div>);

        })}
        {isTyping &&
        <div className="flex items-center gap-2 text-xs text-ink-600">
            <span className="flex gap-1 rounded-2xl bg-ink-100 px-3 py-2.5" aria-hidden>
              {[0, 1, 2].map((i) =>
            <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-400" style={{ animationDelay: `${i * 120}ms` }} />
            )}
            </span>
            {counterpartName.split(' ')[0]} is typing…
          </div>
        }
        <div ref={endRef} />
      </div>
      <form onSubmit={submit} className="flex items-center gap-2 border-t border-ink-200 p-3">
        <label htmlFor="chat-input" className="sr-only">Write a message</label>
        <input
          id="chat-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          disabled={disabled}
          placeholder={disabled ? 'Messaging is closed for this booking' : 'Write a message…'}
          className="h-11 flex-1 rounded-full border border-ink-200 bg-ink-50 px-4 text-sm placeholder:text-ink-500 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-200 disabled:opacity-60" />
        
        <button type="submit" disabled={disabled || !draft.trim()} aria-label="Send message" className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-40">
          <SendIcon className="h-4 w-4" aria-hidden />
        </button>
      </form>
    </section>);

}