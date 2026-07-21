import { profile } from "../data/cv";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-slate-500 md:flex-row md:px-10">
        <span>
          © {new Date().getFullYear()} {profile.name}. Built with React,
          Three.js & Framer Motion.
        </span>
        <div className="flex gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent"
          >
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-accent">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
