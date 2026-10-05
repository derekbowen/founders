import React, { useEffect, useRef, useState } from 'react';
import { CircleDotIcon, SendIcon } from 'lucide-react';
import type { Transaction } from '../../types/transaction';
import { formatTimestamp } from '../../utils/dates';

type FeedItem =
{kind: 'message';id: string;at: string;text: string;fromMe: boolean;} |
{kind: 'event';id: string;at: string;text: string;};

export function ChatThread({ tx, otherName, onSend }: {tx: Transaction;otherName: string;onSend: (text: string) => void;}) {
  const [draft, setDraft] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  const feed: FeedItem[] = [
  ...tx.messages.map((m) => ({ kind: 'message' as const, id: m.id, at: m.at, text: m.text, fromMe: m.fromMe })),
  ...tx.timeline.map((e, i) => ({ kind: 'event' as const, id: `e-${i}`, at: e.at, text: e.label }))].
  sort((a, b) => a.at.localeCompare(b.at));

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [feed.length]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    onSend(draft.trim());
    setDraft('');
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-6 sm:px-6" aria-live="polite">
        {feed.map((item) =>
        item.kind === 'event' ?
        <div key={item.id} className="flex items-center justify-center gap-2 text-xs text-ink-500">
              <CircleDotIcon size={12} className="text-primary-500" aria-hidden="true" />
              <span className="font-medium text-ink-600">{item.text}</span>
              <span>· {formatTimestamp(item.at)}</span>
            </div> :

        <div key={item.id} className={`flex ${item.fromMe ? 'justify-end' : 'justify-start'}`}>
              <div className="max-w-[80%]">
                <div
              className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
              item.fromMe ? 'rounded-br-md bg-primary-700 text-white' : 'rounded-bl-md border border-sand-200 bg-white text-ink-900'}`
              }>
              
                  {item.text}
                </div>
                <p className={`mt-1 text-[11px] text-ink-500 ${item.fromMe ? 'text-right' : ''}`}>
                  {item.fromMe ? 'You' : otherName.split(' ')[0]} · {formatTimestamp(item.at)}
                </p>
              </div>
            </div>

        )}
        <div ref={endRef} />
      </div>
      <form onSubmit={submit} className="flex items-end gap-2 border-t border-sand-200 bg-white p-3 sm:p-4">
        <label htmlFor="chat-input" className="sr-only">
          Message {otherName}
        </label>
        <textarea
          id="chat-input"
          rows={1}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) submit(e);
          }}
          placeholder={`Message ${otherName.split(' ')[0]}…`}
          className="input max-h-32 min-h-[44px] flex-1 resize-none" />
        
        <button type="submit" className="btn-primary h-11 px-4" disabled={!draft.trim()} aria-label="Send message">
          <SendIcon size={17} />
        </button>
      </form>
    </div>);

}