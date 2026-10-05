import React, { useEffect, useRef, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { SendIcon } from 'lucide-react';
import { Button } from '../Button';
import { brandButton } from '../../utils/buttonStyles';
import type { Lesson } from '../../types/marketplace';

interface LessonChatProps {
  lesson: Lesson;
  onSend: (text: string) => void;
}

export function LessonChat({ lesson, onSend }: LessonChatProps) {
  const [text, setText] = useState('');
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [lesson.messages.length]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <div className="flex h-full flex-col rounded-2xl border border-ink-200 bg-white">
      <h3 className="border-b border-ink-200 px-4 py-3 text-sm font-semibold text-ink-900">Messages</h3>
      <ul ref={listRef} className="max-h-[360px] min-h-[220px] flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
        {lesson.messages.length === 0 &&
        <li className="py-8 text-center text-sm text-ink-500">No messages yet. Say hello 👋</li>
        }
        {lesson.messages.map((m) => {
          const mine = m.sender === 'me';
          return (
            <li key={m.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm ${mine ? 'rounded-br-md bg-primary-600 text-white' : 'rounded-bl-md bg-ink-100 text-ink-900'}`}>
                <p className="leading-relaxed">{m.text}</p>
                <p className={`mt-1 text-[11px] ${mine ? 'text-primary-100' : 'text-ink-500'}`}>
                  {format(parseISO(m.sentAt), 'MMM d, h:mm a')}
                </p>
              </div>
            </li>);

        })}
      </ul>
      <form onSubmit={submit} className="flex items-end gap-2 border-t border-ink-200 p-3">
        <label htmlFor="chat-input" className="sr-only">Write a message</label>
        <textarea
          id="chat-input"
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) submit(e);
          }}
          placeholder={`Message ${lesson.counterpartName.split(' ')[0]}…`}
          className="max-h-32 flex-1 resize-none rounded-xl border border-ink-200 px-3 py-2.5 text-sm focus:border-primary-400 focus:outline-none focus:ring-4 focus:ring-primary-100" />
        
        <Button type="submit" iconOnly={<SendIcon size={16} />} aria-label="Send message" disabled={!text.trim()} className={brandButton.primary} />
      </form>
    </div>);

}