import React, { useEffect, useRef, useState } from 'react';
import { SendIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import type { Message } from '../../types/marketplace';
import { cn } from '../../utils/cn';

interface ChatPanelProps {
  messages: Message[];
  counterpartName: string;
  counterpartAvatar?: string;
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatPanel({ messages, counterpartName, counterpartAvatar, onSend, disabled }: ChatPanelProps) {
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
    <div className="flex flex-col">
      <ul className="max-h-[520px] min-h-[280px] space-y-4 overflow-y-auto p-5" aria-live="polite">
        {messages.map((m) => {
          if (m.from === 'system') {
            return (
              <li key={m.id} className="flex justify-center">
                <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-bold text-stone-600">
                  {m.text} · {m.time}
                </span>
              </li>);

          }
          const mine = m.from === 'me';
          return (
            <li key={m.id} className={cn('flex items-end gap-2', mine && 'flex-row-reverse')}>
              {!mine && <Avatar name={counterpartName} alt={counterpartName} src={counterpartAvatar} size="sm" />}
              <div className={cn('max-w-[80%]', mine && 'text-right')}>
                <p
                  className={cn(
                    'inline-block rounded-2xl px-4 py-2.5 text-left text-[15px] leading-relaxed',
                    mine ? 'rounded-br-md bg-primary-100 text-stone-900' : 'rounded-bl-md bg-stone-100 text-stone-800'
                  )}>
                  
                  {m.text}
                </p>
                <p className="mt-1 text-xs font-semibold text-stone-400">{m.time}</p>
              </div>
            </li>);

        })}
        <div ref={endRef} />
      </ul>
      <form onSubmit={submit} className="flex items-end gap-2 border-t border-stone-100 p-4">
        <label htmlFor="chat-input" className="sr-only">
          Message {counterpartName}
        </label>
        <textarea
          id="chat-input"
          rows={1}
          value={text}
          disabled={disabled}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              submit(e);
            }
          }}
          placeholder={disabled ? 'Messaging is closed for this booking' : `Message ${counterpartName.split(' ')[0]}…`}
          className="max-h-32 min-h-[48px] flex-1 resize-none rounded-2xl border border-stone-300 bg-white px-4 py-3 text-[15px] text-stone-900 placeholder:text-stone-400 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100 disabled:bg-stone-50" />
        
        <button
          type="submit"
          disabled={disabled || !text.trim()}
          aria-label="Send message"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-500 text-stone-900 transition-colors hover:bg-primary-400 disabled:cursor-not-allowed disabled:opacity-40">
          
          <SendIcon className="h-5 w-5" />
        </button>
      </form>
    </div>);

}