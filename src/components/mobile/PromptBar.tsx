import { useState, type FormEvent, type KeyboardEvent } from "react";

export default function PromptBar({
  onSubmit,
  disabled = false,
}: {
  onSubmit: (value: string) => void;
  disabled?: boolean;
}) {
  const [value, setValue] = useState("");
  const trimmed = value.trim();
  const canSend = trimmed.length > 0 && !disabled;

  const send = () => {
    if (!canSend) return;
    onSubmit(trimmed);
    setValue("");
  };

  const onForm = (event: FormEvent) => {
    event.preventDefault();
    send();
  };

  const onKey = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      send();
    }
  };

  return (
    <form className="mobile-prompt" onSubmit={onForm}>
      <label htmlFor="mobile-ask" className="sr-only">
        Ask about Saman Khan
      </label>
      <textarea
        id="mobile-ask"
        rows={1}
        value={value}
        disabled={disabled}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={onKey}
        placeholder="Ask me anything about my work..."
        enterKeyHint="send"
        autoComplete="off"
        autoCorrect="on"
      />
      <button
        type="submit"
        className="mobile-prompt__send"
        disabled={!canSend}
        aria-label="Send"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M5 12h12M13 6l6 6-6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </form>
  );
}
