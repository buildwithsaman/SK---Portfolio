import StageIntro from "./components/stage/StageIntro";
import StageChrome from "./components/stage/StageChrome";
import SocialRail from "./components/stage/SocialRail";
import StageHero from "./components/stage/StageHero";
import StageAbout from "./components/stage/StageAbout";
import StageTextScroll from "./components/stage/StageTextScroll";
import StageCareer from "./components/stage/StageCareer";
import StageWork from "./components/stage/StageWork";
import StageSkills from "./components/stage/StageSkills";
import StageContact from "./components/stage/StageContact";
import StageFooter from "./components/stage/StageFooter";

export default function App() {
  return (
    <div className="relative isolate min-h-screen">
      <StageIntro />
      <StageChrome />
      <SocialRail />
      <main id="main-content">
        <StageHero />
        <StageAbout />
        <StageTextScroll />
        <StageCareer />
        <StageWork />
        <StageSkills />
        <StageContact />
      </main>
      <StageFooter />
    </div>
  );
}
