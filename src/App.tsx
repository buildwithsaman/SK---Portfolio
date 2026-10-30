import { type MouseEvent } from "react";
import StageCursor from "./components/ui/StageCursor";
import SiteChat from "./sections/chat";
import StageCareer from "./sections/career";
import StageContact from "./sections/contact";
import StageIdentity from "./sections/hero";
import StagePractice from "./sections/highlights";
import {
  SocialRail,
  StageChrome,
  StageFooter,
  StageIntro,
} from "./sections/layout";
import StageSkills from "./sections/skills";
import StageWork from "./sections/work";

function skipToMain(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  document.querySelectorAll("#root [inert]").forEach((node) => {
    node.removeAttribute("inert");
  });
  const main = document.getElementById("main-content");
  if (!main) return;
  main.focus({ preventScroll: true });
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  root.style.scrollBehavior = previous;
}

export default function App() {
  return (
    <div className="relative isolate min-h-screen">
      <a href="#main-content" className="skip-link" onClick={skipToMain}>
        Skip to main content
      </a>
      <StageIntro />
      <StageCursor />
      <StageChrome />
      <SocialRail />
      <main id="main-content" tabIndex={-1}>
        <StageIdentity />
        <StagePractice />
        <StageCareer />
        <StageWork />
        <StageSkills />
        <StageContact />
      </main>
      <StageFooter />
      <SiteChat />
    </div>
  );
}
