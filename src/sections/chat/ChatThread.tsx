import { useEffect, useRef } from "react";
import type { AssistantAction } from "../../lib/assistant";
import MobileMemoji from "./MobileMemoji";

export type ChatLine = {
  id: string;
  role: "user" | "saman";
  text: string;
  bullets?: string[];
  actions?: AssistantAction[];
};

export default function ChatThread({ messages }: { messages: ChatLine[] }) {
  const endRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = endRef.current;
    if (!node) return;
    node.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages]);

  return (
    <div ref={scrollerRef} className="mobile-thread" aria-live="polite">
      {messages.map((line) => (
        <article
          key={line.id}
          className={`mobile-msg mobile-msg--${line.role}`}
        >
          {line.role === "saman" ? (
            <div className="mobile-msg__face">
              <MobileMemoji size="avatar" />
            </div>
          ) : null}
          <div className="mobile-msg__body">
            {line.text.split(/\n\n/).map((paragraph, index) => (
              <p key={`${line.id}-${index}`}>{paragraph}</p>
            ))}
            {line.bullets?.length ? (
              <ul className="mobile-msg__list">
                {line.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {line.actions?.length ? (
              <div className="mobile-msg__actions">
                {line.actions.map((action) => (
                  <a
                    key={action.href}
                    href={action.href}
                    download={action.download}
                    target={
                      action.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      action.href.startsWith("http")
                        ? "me noopener noreferrer"
                        : undefined
                    }
                  >
                    {action.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </article>
      ))}
      <div ref={endRef} />
    </div>
  );
}
