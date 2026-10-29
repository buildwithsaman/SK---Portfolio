import { profile } from "../../data/cv";

const links = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Email", href: `mailto:${profile.email}` },
];

export default function SocialRail() {
  return (
    <aside
      className="stage-rail-start pointer-events-none fixed bottom-0 top-0 z-40 hidden flex-col items-center justify-end pb-10 xl:flex"
      aria-label="Social links"
    >
      <div className="pointer-events-auto flex flex-col items-center gap-4">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={
              link.href.startsWith("http")
                ? "me noopener noreferrer"
                : undefined
            }
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent2"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            {link.label}
          </a>
        ))}
        <span className="mt-2 h-16 w-px bg-gradient-to-b from-accent2/60 to-transparent" />
      </div>
    </aside>
  );
}
