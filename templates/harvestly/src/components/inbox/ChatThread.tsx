import React, { useEffect, useRef, useState } from "react";
import { MessageCircleIcon, SendIcon } from "lucide-react";
import { ChatMessage } from "../../types/marketplace";
import { formatDateTime } from "../../utils/format";
import { Avatar } from "../ui/Avatar";

interface ChatThreadProps {
  messages: ChatMessage[];
  counterpart: string;
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatThread({ messages, counterpart, onSend, disabled }: ChatThreadProps) {
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages.length]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  }

  return (
    <div className="flex flex-col">
      <div className="max-h-80 space-y-3 overflow-y-auto pr-1" aria-live="polite">
        {messages.length === 0 ?
        <div className="flex flex-col items-center py-8 text-center">
            <MessageCircleIcon className="h-6 w-6 text-muted" aria-hidden="true" />
            <p className="mt-2 text-sm text-muted">No messages yet. Say hello to {counterpart}!</p>
          </div> :

        messages.map((m) =>
        <div key={m.id} className={`flex items-end gap-2 ${m.from === "me" ? "flex-row-reverse" : ""}`}>
              {m.from === "them" && <Avatar name={counterpart} size="sm" tone="orange" />}
              <div className={`max-w-[80%] ${m.from === "me" ? "text-right" : ""}`}>
                <p
              className={`inline-block rounded-2xl px-4 py-2.5 text-left text-sm ${
              m.from === "me" ? "rounded-br-sm bg-primary text-white" : "rounded-bl-sm bg-white text-ink ring-1 ring-line"}`
              }>
              
                  {m.text}
                </p>
                <p className="mt-1 text-[11px] text-muted">{formatDateTime(m.at)}</p>
              </div>
            </div>
        )
        }
        <div ref={endRef} />
      </div>
      <form onSubmit={submit} className="mt-4 flex gap-2">
        <label htmlFor="chat-input" className="sr-only">
          Message {counterpart}
        </label>
        <input
          id="chat-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={disabled}
          placeholder={disabled ? "This conversation is closed" : `Message ${counterpart}…`}
          className="field-input rounded-full" />
        
        <button
          type="submit"
          disabled={disabled || !text.trim()}
          aria-label="Send message"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-white transition hover:bg-primary-dark disabled:opacity-40">
          
          <SendIcon className="h-4 w-4" />
        </button>
      </form>
    </div>);

}