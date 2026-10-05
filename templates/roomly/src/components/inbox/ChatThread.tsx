import React, { useEffect, useRef, useState } from 'react';
import { SendIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { useApp } from '../../contexts/AppContext';
import { buttonStyles } from '../../utils/styles';
import { formatDate, formatDateTime } from '../../utils/format';
import type { Inquiry } from '../../types/inquiry';

export function ChatThread({ inquiry }: {inquiry: Inquiry;}) {
  const { currentUser, getUser, sendMessage } = useApp();
  const [text, setText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const closed = inquiry.status === 'closed';

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [inquiry.messages.length]);

  const submit = (e: {preventDefault: () => void;}) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    sendMessage(inquiry.id, value);
    setText('');
  };

  let lastDay = '';

  return (
    <div className="flex h-[65vh] min-h-[460px] flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white">
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6" aria-live="polite">
        {inquiry.messages.map((m) => {
          const mine = m.senderId === currentUser?.id;
          const sender = getUser(m.senderId);
          const day = formatDate(m.sentAt, 'EEEE, d MMM');
          const showDay = day !== lastDay;
          lastDay = day;
          return (
            <React.Fragment key={m.id}>
              {showDay &&
              <div className="flex items-center gap-3 py-1 text-xs font-medium text-navy-400">
                  <span className="h-px flex-1 bg-navy-100" />
                  {day}
                  <span className="h-px flex-1 bg-navy-100" />
                </div>
              }
              <div className={`flex items-end gap-2 ${mine ? 'flex-row-reverse' : ''}`}>
                {!mine && sender && <Avatar name={sender.name} alt={sender.name} size="sm" />}
                <div className={`max-w-[80%] sm:max-w-[70%] ${mine ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    mine ? 'rounded-br-md bg-navy-900 text-white' : 'rounded-bl-md bg-navy-50 text-navy-900'}`
                    }>
                    
                    {m.text}
                  </div>
                  <span className="mt-1 px-1 text-[11px] text-navy-400">{formatDateTime(m.sentAt)}</span>
                </div>
              </div>
            </React.Fragment>);

        })}
      </div>
      {closed ?
      <p className="border-t border-navy-100 bg-navy-50 p-4 text-center text-sm text-navy-500">
          This inquiry is closed. You can no longer send messages.
        </p> :

      <form onSubmit={submit} className="flex items-end gap-2 border-t border-navy-100 p-3 sm:p-4">
          <label htmlFor="chat-input" className="sr-only">
            Write a message
          </label>
          <textarea
          id="chat-input"
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) submit(e);
          }}
          placeholder="Write a message…"
          className="max-h-32 min-h-[44px] flex-1 resize-none rounded-xl border border-navy-200 px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-navy-400 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100" />
        
          <Button
          type="submit"
          disabled={!text.trim()}
          iconOnly={<SendIcon size={18} />}
          aria-label="Send message"
          className={`${buttonStyles.primary} !h-11 !w-11 disabled:!opacity-50`} />
        
        </form>
      }
    </div>);

}