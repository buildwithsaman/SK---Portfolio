import { profile } from "../../data/cv";

export default function StageFooter() {
  return (
    <footer className="border-t border-edge/50 px-5 py-8 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          Designed as SK Stage Theater · {profile.title}
        </p>
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}
