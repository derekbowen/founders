import React, { useEffect, useRef, useState } from 'react';
import { MessageCircleIcon, SendIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { Avatar } from '../Avatar';
import type { Message } from '../../types/marketplace';
import { formatDate } from '../../utils/format';

interface ChatThreadProps {
  messages: Message[];
  counterpartName: string;
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatThread({ messages, counterpartName, onSend, disabled }: ChatThreadProps) {
  const [text, setText] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages.length]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-5 py-3">
        <h3 className="text-sm font-semibold text-slate-900">Messages with {counterpartName.split(' ')[0]}</h3>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5" aria-live="polite">
        {messages.length === 0 &&
        <div className="flex flex-col items-center py-10 text-center">
            <MessageCircleIcon className="h-8 w-8 text-slate-300" aria-hidden />
            <p className="mt-2 text-sm text-slate-600">No messages yet. Say hello!</p>
          </div>
        }
        {messages.map((m) => {
          const mine = m.from === 'me';
          return (
            <div key={m.id} className={twMerge('flex items-end gap-2', mine && 'flex-row-reverse')}>
              {!mine && <Avatar name={counterpartName} alt={counterpartName} size="xs" />}
              <div className={twMerge('max-w-[78%]', mine && 'text-right')}>
                <p
                  className={twMerge(
                    'inline-block rounded-2xl px-4 py-2.5 text-left text-sm leading-relaxed',
                    mine ? 'rounded-br-md bg-accent-700 text-white' : 'rounded-bl-md bg-sand-100 text-slate-800'
                  )}>
                  
                  {m.text}
                </p>
                <p className="mt-1 text-[11px] text-slate-500">{formatDate(m.at, 'MMM d, h:mm a')}</p>
              </div>
            </div>);

        })}
        <div ref={endRef} />
      </div>
      <form onSubmit={submit} className="flex items-center gap-2 border-t border-slate-100 p-3">
        <label htmlFor="chat-input" className="sr-only">Write a message</label>
        <input
          id="chat-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={disabled}
          placeholder={disabled ? 'Messaging is closed for this booking' : 'Write a message…'}
          className="h-11 flex-1 rounded-full border border-slate-300 px-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30 disabled:bg-slate-50" />
        
        <button
          type="submit"
          disabled={disabled || !text.trim()}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-600 text-white transition hover:bg-primary-700 disabled:opacity-40"
          aria-label="Send message">
          
          <SendIcon className="h-4 w-4" />
        </button>
      </form>
    </div>);

}