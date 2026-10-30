import { profile } from "../../data/cv";

export default function StageFooter() {
  return (
    <footer className="border-t border-edge/60 py-5 pb-[max(5.5rem,calc(env(safe-area-inset-bottom)+4.5rem))] lg:py-5 lg:pb-5">
      <div className="stage-shell">
        <p className="text-sm leading-relaxed text-muted">
          {profile.name}
          <span aria-hidden="true"> · </span>
          {profile.footerTagline}
          <span aria-hidden="true"> · </span>
          {profile.locationFull}
          <span aria-hidden="true"> · </span>© {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
