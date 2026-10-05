import React, { useEffect, useRef, useState } from 'react';
import { MessageCircleIcon, SendIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { getUser } from '../../utils/lookup';
import { formatMessageTime } from '../../utils/format';
import type { Message } from '../../types/transaction';

interface ChatThreadProps {
  messages: Message[];
  currentUserId: string;
  otherName: string;
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatThread({ messages, currentUserId, otherName, onSend, disabled }: ChatThreadProps) {
  const [text, setText] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages.length]);

  const send = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <div className="flex h-full flex-col rounded-2xl border border-line bg-surface">
      <div className="border-b border-line px-5 py-3">
        <h3 className="text-sm font-semibold">Messages with {otherName}</h3>
      </div>
      <div className="max-h-[420px] min-h-[240px] flex-1 space-y-4 overflow-y-auto px-5 py-4" aria-live="polite">
        {messages.length === 0 ?
        <div className="flex h-full flex-col items-center justify-center py-10 text-center text-sm text-muted">
            <MessageCircleIcon size={22} className="mb-2" aria-hidden />
            No messages yet. Say hi and share any arrival details.
          </div> :

        messages.map((m) => {
          const mine = m.senderId === currentUserId;
          const sender = getUser(m.senderId);
          return (
            <div key={m.id} className={`flex items-end gap-2 ${mine ? 'flex-row-reverse' : ''}`}>
                {!mine && <Avatar name={sender?.name ?? 'User'} alt={sender?.name ?? 'User'} src={sender?.avatar} size="xs" />}
                <div className={`max-w-[80%] ${mine ? 'text-right' : ''}`}>
                  <p
                  className={`inline-block rounded-2xl px-4 py-2.5 text-left text-sm leading-relaxed ${
                  mine ? 'rounded-br-sm bg-navy text-white' : 'rounded-bl-sm bg-canvas text-ink'}`
                  }>
                  
                    {m.text}
                  </p>
                  <p className="mt-1 text-[11px] text-muted">{formatMessageTime(m.sentAt)}</p>
                </div>
              </div>);

        })
        }
        <div ref={endRef} />
      </div>
      <form onSubmit={send} className="flex items-end gap-2 border-t border-line p-3">
        <label htmlFor="chat-input" className="sr-only">
          Write a message
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
              send();
            }
          }}
          placeholder={disabled ? 'Messaging is closed for this booking' : 'Write a message…'}
          className="max-h-32 min-h-[44px] flex-1 resize-none rounded-xl border border-line bg-canvas px-3 py-2.5 text-sm focus:border-navy focus:bg-surface focus:outline-none focus:ring-2 focus:ring-accent/60 disabled:opacity-60" />
        
        <button
          type="submit"
          disabled={!text.trim() || disabled}
          aria-label="Send message"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-ink transition-colors hover:bg-accent-strong disabled:opacity-40">
          
          <SendIcon size={16} aria-hidden />
        </button>
      </form>
    </div>);

}