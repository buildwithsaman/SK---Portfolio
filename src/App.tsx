import { type MouseEvent } from "react";
import MobilePortfolio from "./components/mobile/MobilePortfolio";
import StageCareer from "./components/stage/StageCareer";
import StageChrome from "./components/stage/StageChrome";
import StageContact from "./components/stage/StageContact";
import StageFooter from "./components/stage/StageFooter";
import StageIdentity from "./components/stage/StageIdentity";
import StageIntro from "./components/stage/StageIntro";
import StagePractice from "./components/stage/StagePractice";
import StageSkills from "./components/stage/StageSkills";
import StageWork from "./components/stage/StageWork";
import SocialRail from "./components/stage/SocialRail";
import StageCursor from "./components/ui/StageCursor";
import useMediaQuery from "./hooks/useMediaQuery";

function skipToMain(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  document.querySelectorAll("#root [inert]").forEach((node) => {
    node.removeAttribute("inert");
  });
  const main = document.getElementById("main-content");
  if (!main) return;
  main.focus({ preventScroll: true });
  main.scrollIntoView({ behavior: "auto", block: "start" });
}

function DesktopPortfolio() {
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

export default function App() {
  const desktop = useMediaQuery("(min-width: 1024px)");

  if (!desktop) return <MobilePortfolio />;
  return <DesktopPortfolio />;
}
