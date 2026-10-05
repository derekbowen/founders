import React, { useEffect, useRef, useState } from 'react';
import { SendIcon } from 'lucide-react';
import { formatRelativeTime } from '../../utils/format';
import type { ChatMessage } from '../../types/transaction';

interface ChatThreadProps {
  messages: ChatMessage[];
  counterpartName: string;
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatThread({ messages, counterpartName, onSend, disabled }: ChatThreadProps) {
  const [text, setText] = useState('');
  const endRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'nearest' });
  }, [messages.length]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <div className="flex flex-col">
      <ol className="max-h-[440px] min-h-[240px] space-y-3 overflow-y-auto pr-1" aria-label="Messages" aria-live="polite">
        {messages.length === 0 && <li className="py-10 text-center text-sm text-ink-600">No messages yet. Say hi to {counterpartName.split(' ')[0]}!</li>}
        {messages.map((m) =>
        <li key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-3xl px-4 py-2.5 ${m.from === 'me' ? 'rounded-br-lg bg-primary-100 text-ink-900' : 'rounded-bl-lg border border-ink-200 bg-white text-ink-800'}`}>
              <p className="text-sm leading-relaxed">{m.text}</p>
              <p className="mt-1 text-[11px] font-semibold text-ink-500">{formatRelativeTime(m.time)}</p>
            </div>
          </li>
        )}
        <li ref={endRef} aria-hidden="true" />
      </ol>
      <form onSubmit={send} className="mt-4 flex items-end gap-2">
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
            if (e.key === 'Enter' && !e.shiftKey) send(e);
          }}
          placeholder={disabled ? 'This conversation is closed' : `Message ${counterpartName.split(' ')[0]}…`}
          className="field min-h-[44px] flex-1 resize-none rounded-2xl" />
        
        <button type="submit" disabled={disabled || !text.trim()} className="btn btn-md btn-primary h-11 w-11 px-0" aria-label="Send message">
          <SendIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>
    </div>);

}