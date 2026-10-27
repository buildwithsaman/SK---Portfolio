import type { MouseEvent } from "react";
import StageIntro from "./components/stage/StageIntro";
import StageCursor from "./components/ui/StageCursor";
import StageChrome from "./components/stage/StageChrome";
import SocialRail from "./components/stage/SocialRail";
import StageIdentity from "./components/stage/StageIdentity";
import StagePractice from "./components/stage/StagePractice";
import StageCareer from "./components/stage/StageCareer";
import StageWork from "./components/stage/StageWork";
import StageSkills from "./components/stage/StageSkills";
import StageContact from "./components/stage/StageContact";
import StageFooter from "./components/stage/StageFooter";

function skipToMain(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  const main = document.getElementById("main-content");
  if (!main) return;
  main.focus({ preventScroll: true });
  main.scrollIntoView({ behavior: "auto", block: "start" });
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
    </div>
  );
}
