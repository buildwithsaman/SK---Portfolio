import { profile } from "../data/cv";

export default function Footer() {
  return (
    <footer className="border-t border-edge py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-sm text-muted md:flex-row md:px-10">
        <span className="flex items-center gap-2.5">
          <img
            src="/logo-mark.svg"
            alt=""
            width={22}
            height={22}
            className="block h-[22px] w-[22px] rounded-md object-contain ring-1 ring-edge"
            decoding="async"
          />
          © {new Date().getFullYear()} {profile.name}
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
