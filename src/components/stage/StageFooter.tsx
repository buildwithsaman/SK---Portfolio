import { profile } from "../../data/cv";

export default function StageFooter() {
  return (
    <footer className="border-t border-edge/60 px-5 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-base font-semibold tracking-tight text-ink">
            {profile.name}
          </p>
          <p className="mt-1 text-sm text-muted">{profile.footerTagline}</p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            {profile.locationFull}
          </p>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
