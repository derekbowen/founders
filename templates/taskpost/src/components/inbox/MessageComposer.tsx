import React, { useState } from 'react';
import { SendIcon } from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { cn } from '../../utils/styles';

export function MessageComposer({ txId, otherName }: {txId: string;otherName: string;}) {
  const { sendMessage } = useApp();
  const [text, setText] = useState('');

  function submit() {
    const t = text.trim();
    if (!t) return;
    sendMessage(txId, t);
    setText('');
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="flex items-end gap-2 rounded-2xl border border-ink-300 bg-white p-2 shadow-sm focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/30">
      
      <label htmlFor={`msg-${txId}`} className="sr-only">
        Message {otherName}
      </label>
      <textarea
        id={`msg-${txId}`}
        rows={1}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        placeholder={`Message ${otherName}…`}
        className="max-h-32 min-h-[40px] flex-1 resize-none bg-transparent px-2 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none" />
      
      <button
        type="submit"
        disabled={!text.trim()}
        aria-label="Send message"
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors',
          text.trim() ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-ink-100 text-ink-400'
        )}>
        
        <SendIcon className="h-4 w-4" />
      </button>
    </form>);

}