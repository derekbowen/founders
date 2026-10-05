import React, { useEffect, useRef, useState } from 'react';
import { SendIcon } from 'lucide-react';
import type { Message, User } from '../../types/marketplace';
import { UserAvatar } from '../UserAvatar';
import { cx } from '../../utils/styles';

interface ChatThreadProps {
  messages: Message[];
  counterparty: User;
  onSend: (text: string) => void;
}

export function ChatThread({ messages, counterparty, onSend }: ChatThreadProps) {
  const [text, setText] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'nearest' });
  }, [messages.length]);

  return (
    <div className="flex flex-col">
      <div className="max-h-[420px] min-h-[200px] space-y-4 overflow-y-auto p-1" aria-live="polite">
        {messages.length === 0 &&
        <p className="py-10 text-center text-sm text-muted">No messages yet — say hello.</p>
        }
        {messages.map((m) =>
        <div key={m.id} className={cx('flex items-end gap-2', m.fromMe && 'flex-row-reverse')}>
            {!m.fromMe && <UserAvatar user={counterparty} size="sm" />}
            <div className={cx('max-w-[80%]', m.fromMe && 'text-right')}>
              <p
              className={cx(
                'inline-block px-4 py-2.5 text-left text-sm leading-relaxed',
                m.fromMe ? 'bg-ink text-paper' : 'bg-cream text-ink'
              )}>
              
                {m.text}
              </p>
              <p className="mt-1 text-[10px] text-muted">{m.time}</p>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <form
        className="mt-4 flex gap-2 border-t border-line pt-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!text.trim()) return;
          onSend(text.trim());
          setText('');
        }}>
        
        <label htmlFor="chat-input" className="sr-only">
          Message {counterparty.name}
        </label>
        <input
          id="chat-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Message ${counterparty.name.split(' ')[0]}…`}
          className="h-11 flex-1 border border-line bg-paper px-3 text-sm focus:border-ink focus:outline-none" />
        
        <button
          type="submit"
          disabled={!text.trim()}
          aria-label="Send message"
          className="flex h-11 w-11 items-center justify-center bg-ink text-paper transition hover:bg-accent-dark disabled:opacity-40">
          
          <SendIcon size={16} aria-hidden="true" />
        </button>
      </form>
    </div>);

}