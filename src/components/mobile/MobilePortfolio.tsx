import { useCallback, useEffect, useMemo, useState } from "react";
import { profile } from "../../data/cv";
import {
  MORE_CHIPS,
  WELCOME_CHIPS,
  answerAssistant,
  cvAction,
} from "../../lib/assistant";
import ChatThread, { type ChatLine } from "./ChatThread";
import MobileMemoji from "./MobileMemoji";
import PromptBar from "./PromptBar";
import SuggestionChips from "./SuggestionChips";
import "./mobile.css";

function nextId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function MobilePortfolio() {
  const [messages, setMessages] = useState<ChatLine[]>([]);
  const [followUps, setFollowUps] = useState<string[]>([]);
  const talking = messages.length > 0;
  const cv = cvAction();

  useEffect(() => {
    document.documentElement.setAttribute("data-skip-intro", "true");
    const boot = document.getElementById("stage-boot");
    if (boot) boot.setAttribute("data-done", "true");
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const frame = document.querySelector<HTMLElement>(".mobile-stage");
    const viewport = window.visualViewport;
    if (!frame || !viewport) return;

    const sync = () => {
      frame.style.setProperty("--vv-height", `${viewport.height}px`);
      frame.style.setProperty("--vv-offset", `${viewport.offsetTop}px`);
    };
    sync();
    viewport.addEventListener("resize", sync);
    viewport.addEventListener("scroll", sync);
    return () => {
      viewport.removeEventListener("resize", sync);
      viewport.removeEventListener("scroll", sync);
    };
  }, []);

  const ask = useCallback((raw: string) => {
    const text = raw.trim();
    if (!text) return;
    const reply = answerAssistant(text);
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

  return (
    <div className="mobile-stage">
      <a href="#mobile-main" className="skip-link">
        Skip to conversation
      </a>

      <header className="mobile-top">
        <p className="mobile-brand">
          <span>SK</span>
          <span aria-hidden="true"> / </span>
          Saman Khan
        </p>
        <p className="mobile-status">Software Engineer · Dubai</p>
      </header>

      <main id="mobile-main" className="mobile-main" tabIndex={-1}>
        {!talking ? (
          <section className="mobile-welcome" aria-labelledby="mobile-hey">
            <MobileMemoji size="hero" />
            <h1 id="mobile-hey">Hey, I&apos;m Saman.</h1>
            <p className="mobile-lead">
              Software Engineer building production web platforms, operational
              systems, and automation.
            </p>
            <p className="mobile-ask-label">
              What would you like to know about me?
            </p>
            <a className="mobile-cv" href={cv.href} download={cv.download}>
              Download CV
            </a>
          </section>
        ) : (
          <ChatThread messages={messages} />
        )}
      </main>

      <footer className="mobile-dock">
        <SuggestionChips items={chips} onPick={ask} />
        <PromptBar onSubmit={ask} />
      </footer>

      <section className="sr-only" aria-label="Professional profile">
        <h2>
          {profile.name}, {profile.title}
        </h2>
        <p>{profile.heroLead}</p>
        <p>{profile.heroSupport}</p>
        <p>{profile.heroDescription}</p>
        <p>
          Email {profile.email}. Phone {profile.phone}. {profile.locationFull}.
        </p>
      </section>
    </div>
  );
}
