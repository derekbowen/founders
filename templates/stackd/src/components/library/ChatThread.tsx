import React, { useEffect, useRef, useState } from 'react';
import { MessageCircleIcon, SendIcon } from 'lucide-react';
import type { Message } from '../../types/marketplace';
import { Button } from '../Button';
import { formatDateTime } from '../../utils/format';

interface ChatThreadProps {
  messages: Message[];
  counterpartyName: string;
  counterpartyAvatar?: string;
  onSend: (text: string) => void;
}

export function ChatThread({ messages, counterpartyName, counterpartyAvatar, onSend }: ChatThreadProps) {
  const [text, setText] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'nearest' });
  }, [messages.length]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <div className="card flex flex-col overflow-hidden">
      <div className="flex items-center gap-2 border-b border-ink px-5 py-3.5">
        <MessageCircleIcon className="h-4 w-4" aria-hidden="true" />
        <h2 className="font-display text-base font-bold">Messages with {counterpartyName}</h2>
      </div>
      <div className="max-h-[420px] min-h-[220px] flex-1 space-y-4 overflow-y-auto bg-paper p-5" aria-live="polite">
        {messages.length === 0 ?
        <div className="flex h-full min-h-[180px] flex-col items-center justify-center text-center">
            <p className="font-display font-semibold">No messages yet</p>
            <p className="mt-1 max-w-xs text-sm text-muted">Have a question about the files or license? Say hi to {counterpartyName.split(' ')[0]}.</p>
          </div> :

        messages.map((m) => {
          const mine = m.from === 'me';
          return (
            <div key={m.id} className={`flex items-end gap-2 ${mine ? 'justify-end' : 'justify-start'}`}>
                {!mine && (
              counterpartyAvatar ?
              <img src={counterpartyAvatar} alt="" className="h-7 w-7 rounded-full border border-ink/20 object-cover" /> :

              <span className="grid h-7 w-7 place-items-center rounded-full border border-ink bg-brand-soft text-xs font-bold" aria-hidden="true">
                      {counterpartyName.charAt(0)}
                    </span>)

              }
                <div className={`max-w-[80%] ${mine ? 'items-end' : 'items-start'} flex flex-col`}>
                  <p
                  className={`rounded-2xl border px-4 py-2.5 text-sm leading-relaxed ${
                  mine ? 'rounded-br-md border-ink bg-ink text-white' : 'rounded-bl-md border-ink/15 bg-white'}`
                  }>
                  
                    {m.text}
                  </p>
                  <span className="mt-1 text-[11px] text-muted">{formatDateTime(m.sentAt)}</span>
                </div>
              </div>);

        })
        }
        <div ref={endRef} />
      </div>
      <form onSubmit={submit} className="flex gap-2 border-t border-ink p-3">
        <label htmlFor="chat-input" className="sr-only">
          Write a message
        </label>
        <input
          id="chat-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Message ${counterpartyName.split(' ')[0]}…`}
          className="field" />
        
        <Button type="submit" disabled={!text.trim()} leftIcon={<SendIcon size={16} />}>
          Send
        </Button>
      </form>
    </div>);

}