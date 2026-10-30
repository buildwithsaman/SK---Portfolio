import { useEffect, useId, useRef, useState } from "react";
import { cvAction } from "../../lib/assistant";
import { SITE_CHAT_OPEN, type SiteChatOpenDetail } from "../../lib/siteChat";
import ChatThread from "./ChatThread";
import MobileMemoji from "./MobileMemoji";
import PromptBar from "./PromptBar";
import SuggestionChips from "./SuggestionChips";
import useAssistantChat from "./useAssistantChat";
import "./mobile.css";

export default function SiteChat() {
  const titleId = useId();
  const panelRef = useRef<HTMLElement>(null);
  const launchRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const [open, setOpen] = useState(false);
  const [heroAskVisible, setHeroAskVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    if (!window.matchMedia("(min-width: 1280px)").matches) return false;
    return window.scrollY < window.innerHeight * 0.85;
  });
  const { messages, talking, chips, ask } = useAssistantChat();
  const cv = cvAction();

  useEffect(() => {
    const onOpen = (event: Event) => {
      const detail = (event as CustomEvent<SiteChatOpenDetail>).detail;
      setOpen(true);
      if (detail?.question) ask(detail.question, detail.topicId);
    };
    window.addEventListener(SITE_CHAT_OPEN, onOpen);
    return () => window.removeEventListener(SITE_CHAT_OPEN, onOpen);
  }, [ask]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1280px)");
    let observer: IntersectionObserver | null = null;

    const stop = () => {
      observer?.disconnect();
      observer = null;
    };

    const bind = () => {
      stop();
      if (!desktop.matches) {
        setHeroAskVisible(false);
        return;
      }

      const target = document.getElementById("hero-ask");
      if (!target) {
        setHeroAskVisible(false);
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => setHeroAskVisible(entry.isIntersecting),
        { threshold: 0 },
      );
      observer.observe(target);
    };

    bind();
    const retry = window.setTimeout(bind, 0);
    desktop.addEventListener("change", bind);
    return () => {
      window.clearTimeout(retry);
      desktop.removeEventListener("change", bind);
      stop();
    };
  }, []);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      const onKey = (event: KeyboardEvent) => {
        if (event.key !== "Escape") return;
        if (panelRef.current?.querySelector(".mobile-faq")) return;
        event.preventDefault();
        setOpen(false);
      };
      window.addEventListener("keydown", onKey);
      const field = document.getElementById("site-ask");
      if (field instanceof HTMLElement) field.focus();
      return () => window.removeEventListener("keydown", onKey);
    }

    if (!wasOpen.current) return;
    wasOpen.current = false;
    if (!heroAskVisible) launchRef.current?.focus({ preventScroll: true });
  }, [open, heroAskVisible]);

  return (
    <div
      className={
        heroAskVisible ? "site-chat site-chat--hero-covered" : "site-chat"
      }
    >
      {open ? (
        <aside
          ref={panelRef}
          id="site-chat-panel"
          className="site-chat__panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
        >
          <header className="site-chat__bar">
            <p id={titleId} className="site-chat__title">
              Ask Saman
            </p>
            <button
              type="button"
              className="site-chat__close"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </header>
          <div className="site-chat__body">
            {!talking ? (
              <section className="mobile-welcome" aria-labelledby={titleId}>
                <MobileMemoji size="hero" />
                <h2 className="site-chat__hey">Hey, I&apos;m Saman.</h2>
                <p className="mobile-lead">
                  Ask about my work, stack, or experience. Answers come from
                  stored portfolio replies.
                </p>
                <a className="mobile-cv" href={cv.href} download={cv.download}>
                  Download CV
                </a>
              </section>
            ) : (
              <ChatThread messages={messages} />
            )}
          </div>
          <div className="mobile-dock site-chat__dock">
            <SuggestionChips items={chips} onPick={ask} />
            <PromptBar
              fieldId="site-ask"
              onSubmit={ask}
              onSelect={(item) => ask(item.question, item.id)}
            />
          </div>
        </aside>
      ) : (
        <button
          ref={launchRef}
          type="button"
          className="site-chat__launch"
          aria-expanded="false"
          aria-controls="site-chat-panel"
          onClick={() => setOpen(true)}
        >
          <MobileMemoji size="avatar" />
          <span>Ask me</span>
        </button>
      )}
    </div>
  );
}
