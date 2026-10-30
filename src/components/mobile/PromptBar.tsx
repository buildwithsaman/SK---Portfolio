import {
  useEffect,
  useId,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import {
  suggestQuestions,
  type AssistantSuggestion,
} from "../../lib/assistant";

export default function PromptBar({
  onSubmit,
  onSelect,
  disabled = false,
}: {
  onSubmit: (value: string) => void;
  onSelect: (item: AssistantSuggestion) => void;
  disabled?: boolean;
}) {
  const listId = useId();
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const trimmed = value.trim();
  const canSend = trimmed.length > 0 && !disabled;
  const suggestions = trimmed.length >= 2 ? suggestQuestions(trimmed, 6) : [];
  const showList = open && suggestions.length > 0;

  useEffect(() => {
    setActive(0);
  }, [trimmed]);

  const send = () => {
    if (!canSend) return;
    onSubmit(trimmed);
    setValue("");
    setOpen(false);
  };

  const pick = (item: AssistantSuggestion) => {
    onSelect(item);
    setValue("");
    setOpen(false);
  };

  const onForm = (event: FormEvent) => {
    event.preventDefault();
    if (showList && suggestions[active]) {
      pick(suggestions[active]);
      return;
    }
    send();
  };

  const onKey = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      return;
    }

    if (showList && event.key === "ArrowDown") {
      event.preventDefault();
      setActive((current) => (current + 1) % suggestions.length);
      return;
    }

    if (showList && event.key === "ArrowUp") {
      event.preventDefault();
      setActive(
        (current) => (current - 1 + suggestions.length) % suggestions.length,
      );
      return;
    }

    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (showList && suggestions[active]) pick(suggestions[active]);
      else send();
    }
  };

  return (
    <form className="mobile-prompt" onSubmit={onForm}>
      {showList ? (
        <ul
          id={listId}
          className="mobile-faq"
          role="listbox"
          aria-label="Suggested questions"
        >
          {suggestions.map((item, index) => (
            <li key={item.id} role="presentation">
              <button
                type="button"
                id={`${listId}-${item.id}`}
                role="option"
                aria-selected={index === active}
                className={
                  index === active
                    ? "mobile-faq__item mobile-faq__item--active"
                    : "mobile-faq__item"
                }
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => pick(item)}
              >
                {item.question}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <label htmlFor="mobile-ask" className="sr-only">
        Ask about Saman Khan
      </label>
      <textarea
        id="mobile-ask"
        rows={1}
        value={value}
        disabled={disabled}
        onChange={(event) => {
          setValue(event.target.value);
          setOpen(event.target.value.trim().length >= 2);
        }}
        onFocus={() => trimmed.length >= 2 && setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        onKeyDown={onKey}
        placeholder="Ask me anything about my work..."
        enterKeyHint="send"
        autoComplete="off"
        autoCorrect="on"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={showList}
        aria-controls={showList ? listId : undefined}
        aria-activedescendant={
          showList ? `${listId}-${suggestions[active]?.id}` : undefined
        }
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
