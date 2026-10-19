/** Quiet section accents — no continuous motion */

export function AboutAtmosphere() {
  return (
    <div
      className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute -left-16 top-16 h-56 w-56 rounded-full bg-accent/10 blur-[90px]" />
      <div className="absolute right-[12%] top-1/3 h-px w-40 bg-gradient-to-r from-accent/40 to-transparent" />
    </div>
  );
}

export function ExperienceAtmosphere() {
  return (
    <div
      className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute -right-10 top-24 h-64 w-64 rounded-full bg-accent2/10 blur-[100px]" />
      <div className="absolute left-[8%] bottom-24 h-px w-52 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </div>
  );
}

export function EducationAtmosphere() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute left-1/4 top-10 h-40 w-40 rounded-full bg-accent/8 blur-[80px]" />
    </div>
  );
}

export function ContactAtmosphere() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full bg-accent/15 blur-[80px]" />
      <div className="absolute -bottom-10 -left-6 h-44 w-44 rounded-full bg-accent2/12 blur-[80px]" />
    </div>
  );
}
