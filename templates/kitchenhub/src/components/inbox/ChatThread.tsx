import React, { useEffect, useRef, useState } from 'react';
import { MessagesSquareIcon, SendIcon } from 'lucide-react';
import type { Message } from '../../types/marketplace';
import { formatDate } from '../../utils/format';
import { cn, focusRing } from '../../utils/styles';

interface ChatThreadProps {
  messages: Message[];
  counterpartName: string;
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatThread({ messages, counterpartName, onSend, disabled = false }: ChatThreadProps) {
  const [text, setText] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [messages.length]);

  const send = () => {
    const t = text.trim();
    if (!t) return;
    onSend(t);
    setText('');
  };

  return (
    <div className="flex min-h-[420px] flex-col xl:h-full xl:min-h-0">
      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6 sm:px-6" aria-live="polite">
        {messages.length === 0 ?
        <div className="flex h-full flex-col items-center justify-center py-12 text-center text-sm text-steel-500">
            <MessagesSquareIcon className="mb-3 h-8 w-8 text-steel-300" aria-hidden="true" />
            No messages yet. Say hi to {counterpartName.split(' ')[0]}.
          </div> :

        messages.map((m) =>
        <div key={m.id} className={cn('flex flex-col', m.from === 'me' ? 'items-end' : 'items-start')}>
              <div
            className={cn(
              'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed sm:max-w-[70%]',
              m.from === 'me' ? 'rounded-br-md bg-steel-900 text-white' : 'rounded-bl-md bg-steel-100 text-steel-900'
            )}>
            
                {m.text}
              </div>
              <span className="mt-1 px-1 text-[11px] text-steel-500">
                {m.from === 'me' ? 'You' : counterpartName.split(' ')[0]} · {formatDate(m.at, 'MMM d, h:mm a')}
              </span>
            </div>
        )
        }
        <div ref={endRef} />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="flex items-end gap-2 border-t border-steel-200 bg-white p-3 sm:p-4">
        
        <label htmlFor="chat-input" className="sr-only">Message {counterpartName}</label>
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
          placeholder={disabled ? 'This conversation is closed' : `Message ${counterpartName.split(' ')[0]}…`}
          className="max-h-32 min-h-[44px] flex-1 resize-none rounded-xl border border-steel-300 px-4 py-2.5 text-sm placeholder:text-steel-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-steel-50" />
        
        <button
          type="submit"
          disabled={disabled || !text.trim()}
          aria-label="Send message"
          className={cn('grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-white transition-colors hover:bg-primary-hover disabled:opacity-40', focusRing)}>
          
          <SendIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>
    </div>);

}