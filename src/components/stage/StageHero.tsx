import { profile } from "../../data/cv";

export default function StageHero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-16"
    >
      <div className="stage-noise absolute inset-0 z-0" aria-hidden="true" />
      <div
        className="hero-vignette pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
      />

      <div className="relative z-[3] mx-auto w-full max-w-6xl px-5 pb-20 pt-4 md:px-8 md:pt-6">
        <p className="flex justify-center">
          <span className="stage-kicker">
            <span className="h-1.5 w-1.5 rounded-full bg-accent2" />
            Hello — I&apos;m
          </span>
        </p>

        <h1 className="sr-only">
          {profile.name} — {profile.title}
        </h1>

        <div className="relative z-[4] mt-5 text-center" aria-hidden="true">
          <span className="display-name block text-[clamp(3rem,12vw,6.5rem)] text-ink drop-shadow-[0_6px_32px_rgba(6,5,9,0.95)]">
            Saman Khan
          </span>
        </div>

        <div className="relative z-[5] mx-auto mt-5 max-w-lg text-center md:mt-8">
          <p className="font-mono text-sm uppercase tracking-[0.28em] md:text-base">
            <span className="gradient-role font-semibold">{profile.title}</span>
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted [text-shadow:0_2px_20px_rgb(6_5_9)] md:text-[0.95rem]">
            {profile.heroDescription}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={profile.resume}
              download={profile.resumeName}
              className="cta-solid"
            >
              Download CV
            </a>
            <a href={`mailto:${profile.email}`} className="cta-ghost">
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
