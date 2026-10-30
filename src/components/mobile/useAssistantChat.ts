import { useCallback, useMemo, useState } from "react";
import {
  MORE_CHIPS,
  WELCOME_CHIPS,
  answerAssistant,
} from "../../lib/assistant";
import type { ChatLine } from "./ChatThread";

function nextId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function useAssistantChat() {
  const [messages, setMessages] = useState<ChatLine[]>([]);
  const [followUps, setFollowUps] = useState<string[]>([]);
  const talking = messages.length > 0;

  const ask = useCallback((raw: string, topicId?: string) => {
    const text = raw.trim();
    if (!text) return;
    const reply = answerAssistant(text, topicId);
    setMessages((current) => [
      ...current,
      { id: nextId(), role: "user", text },
      {
        id: nextId(),
        role: "saman",
        text: reply.text,
        bullets: reply.bullets,
        actions: reply.actions,
      },
    ]);
    setFollowUps(reply.followUps);
  }, []);

  const chips = useMemo(() => {
    if (!talking) return [...WELCOME_CHIPS, MORE_CHIPS[1]];
    return followUps;
  }, [followUps, talking]);

  return { messages, talking, chips, ask };
}
