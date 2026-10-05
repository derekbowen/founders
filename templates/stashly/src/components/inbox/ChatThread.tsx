import React, { useEffect, useRef, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { SendIcon, InfoIcon } from 'lucide-react';
import { Button } from '../Button';
import type { ChatMessage } from '../../types/marketplace';
import { ui, cx } from '../../utils/styles';

export function ChatThread({ messages, onSend, counterpart }: {messages: ChatMessage[];onSend: (text: string) => void;counterpart: string;}) {
  const [draft, setDraft] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [messages.length]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    onSend(draft.trim());
    setDraft('');
  };

  return (
    <div className="flex h-full min-h-[420px] flex-col rounded-2xl border border-stone-200 bg-white">
      <div className="flex-1 space-y-4 overflow-y-auto p-5" aria-live="polite">
        {messages.map((m) =>
        m.from === 'system' ?
        <div key={m.id} className="flex items-center justify-center gap-2 text-xs text-stone-500">
              <InfoIcon className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{m.text}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={m.time}>{format(parseISO(m.time), 'MMM d')}</time>
            </div> :

        <div key={m.id} className={cx('flex', m.from === 'me' ? 'justify-end' : 'justify-start')}>
              <div className={cx('max-w-[80%] rounded-2xl px-4 py-2.5', m.from === 'me' ? 'rounded-br-md bg-brand-600 text-white' : 'rounded-bl-md bg-stone-100 text-stone-900')}>
                <p className="sr-only">{m.from === 'me' ? 'You' : counterpart}:</p>
                <p className="text-sm leading-relaxed">{m.text}</p>
                <time dateTime={m.time} className={cx('mt-1 block text-[11px]', m.from === 'me' ? 'text-brand-100' : 'text-stone-500')}>
                  {format(parseISO(m.time), 'MMM d, h:mm a')}
                </time>
              </div>
            </div>

        )}
        <div ref={endRef} />
      </div>
      <form onSubmit={submit} className="flex gap-2 border-t border-stone-200 p-3">
        <label htmlFor="chat-input" className="sr-only">Message {counterpart}</label>
        <input id="chat-input" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={`Message ${counterpart.split(' ')[0]}…`} className={ui.field} />
        <Button type="submit" iconOnly={<SendIcon className="h-4 w-4" />} aria-label="Send message" disabled={!draft.trim()} className={ui.btnBrand} />
      </form>
    </div>);

}