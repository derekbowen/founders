import React, { FormEvent, KeyboardEvent, useState } from "react";
import { SendIcon } from "lucide-react";
import { Button } from "../ui/Button";

interface MessageComposerProps {
  onSend: (text: string) => void;
  disabled?: boolean;
  disabledReason?: string;
  placeholder: string;
}

export function MessageComposer({ onSend, disabled, disabledReason, placeholder }: MessageComposerProps) {
  const [text, setText] = useState("");

  const submit = (e?: FormEvent) => {
    e?.preventDefault();
    if (!text.trim() || disabled) return;
    onSend(text);
    setText("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  if (disabled) {
    return (
      <div className="border-t border-line bg-canvas px-4 py-4 text-center text-sm text-muted">{disabledReason}</div>);

  }

  return (
    <form onSubmit={submit} className="flex items-end gap-2 border-t border-line p-3 sm:p-4">
      <label htmlFor="composer" className="sr-only">Write a message</label>
      <textarea
        id="composer"
        rows={2}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="max-h-40 min-h-[48px] flex-1 resize-none rounded-2xl border border-line bg-canvas px-4 py-3 text-sm text-ink placeholder:text-muted/70 hover:border-ink/25 focus:border-primary focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20" />
      
      <Button type="submit" disabled={!text.trim()} className="h-12 w-12 shrink-0 px-0" aria-label="Send message">
        <SendIcon aria-hidden="true" className="h-4 w-4" />
      </Button>
    </form>);

}