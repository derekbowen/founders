import React, { useEffect, useRef, useState } from 'react';
import { MessageCircleIcon, SendIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import type { TxMessage } from '../../types/transaction';
import { getUser } from '../../utils/lookup';
import { formatDateTime } from '../../utils/time';

interface ChatPanelProps {
  messages: TxMessage[];
  currentUserId: string;
  otherName: string;
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatPanel({ messages, currentUserId, otherName, onSend, disabled = false }: ChatPanelProps) {
  const [text, setText] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'nearest' });
  }, [messages.length]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    onSend(value);
    setText('');
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white">
      <div className="border-b border-line px-5 py-3">
        <h3 className="font-sans text-sm font-semibold">Messages with {otherName}</h3>
      </div>
      <div className="max-h-[420px] min-h-[220px] flex-1 space-y-4 overflow-y-auto p-5" aria-live="polite">
        {messages.length === 0 ?
        <div className="flex h-full min-h-[180px] flex-col items-center justify-center text-center">
            <MessageCircleIcon size={22} className="text-ink-subtle" aria-hidden="true" />
            <p className="mt-2 text-sm text-ink-muted">No messages yet. Say hello to {otherName}.</p>
          </div> :

        messages.map((m) => {
          const mine = m.senderId === currentUserId;
          const sender = getUser(m.senderId);
          return (
            <div key={m.id} className={`flex items-end gap-2 ${mine ? 'flex-row-reverse' : ''}`}>
                <Avatar name={sender?.name ?? 'User'} alt={sender?.name ?? 'User'} size="xs" />
                <div className={`max-w-[78%] ${mine ? 'text-right' : ''}`}>
                  <p
                  className={`inline-block rounded-2xl px-3.5 py-2 text-left text-sm leading-relaxed ${
                  mine ? 'rounded-br-md bg-brand-700 text-white' : 'rounded-bl-md bg-mist text-ink'}`
                  }>
                  
                    {m.text}
                  </p>
                  <p className="mt-1 text-[11px] text-ink-subtle">{formatDateTime(m.at)}</p>
                </div>
              </div>);

        })
        }
        <div ref={endRef} />
      </div>
      <form onSubmit={submit} className="flex items-center gap-2 border-t border-line p-3">
        <label htmlFor="chat-input" className="sr-only">
          Write a message
        </label>
        <input
          id="chat-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={disabled}
          placeholder={disabled ? 'Messaging is closed for this booking' : `Message ${otherName}…`}
          className="field !rounded-full" />
        
        <button
          type="submit"
          disabled={disabled || !text.trim()}
          className="focus-ring grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-700 text-white transition-colors hover:bg-brand-800 disabled:cursor-not-allowed disabled:bg-line disabled:text-ink-subtle"
          aria-label="Send message">
          
          <SendIcon size={16} />
        </button>
      </form>
    </div>);

}