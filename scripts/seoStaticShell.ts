/**
 * Build-time crawlable HTML shell injected into #root.
 * createRoot() replaces this on the client — no hydration mismatch.
 * Content is read from src/data/cv.ts (same source as the UI).
 */
import {
  certifications,
  education,
  experiences,
  highlightLines,
  profile,
  skillGroups,
  udriveDomains,
  volunteer,
} from "../src/data/cv";

function esc(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function buildSeoStaticShell(): string {
  const summary = profile.summary.map((p) => `<p>${esc(p)}</p>`).join("");
  const achievements = profile.achievements
    .map((a) => `<li><strong>${esc(a.value)}</strong> ${esc(a.label)}</li>`)
    .join("");
  const edu = education
    .map(
      (e) =>
        `<li><strong>${esc(e.degree)}</strong> — ${esc(e.place)} (${esc(e.period)})</li>`,
    )
    .join("");
  const jobs = experiences
    .map((job) => {
      const paras = job.summary.map((p) => `<p>${esc(p)}</p>`).join("");
      const recognition = job.recognition
        ? `<p>${esc(job.recognition)}</p>`
        : "";
      return `<article>
  <h3>${esc(job.role)}</h3>
  <p>${esc(job.company)} | ${esc(job.location)} · ${esc(job.period)}</p>
  ${paras}
  ${recognition}
</article>`;
    })
    .join("\n");
  const work = udriveDomains
    .map((d) => {
      const points = d.contributions.map((c) => `<li>${esc(c)}</li>`).join("");
      return `<article>
  <h3>${esc(d.title)}</h3>
  <p><strong>Role:</strong> ${esc(d.role)}</p>
  <p>${esc(d.ownership)}</p>
  <ul>${points}</ul>
  <p><strong>Focus:</strong> ${esc(d.focus)}</p>
  <p><strong>Stack:</strong> ${esc(d.tech.join(", "))}</p>
</article>`;
    })
    .join("\n");
  const skills = skillGroups
    .map(
      (g) =>
        `<section><h3>${esc(g.category)}</h3><ul>${g.items
          .map((i) => `<li>${esc(i)}</li>`)
          .join("")}</ul></section>`,
    )
    .join("\n");
  const certs = certifications
    .map((c) => `<li>${esc(c.name)} — ${esc(c.org)} (${esc(c.year)})</li>`)
    .join("");
  const vols = volunteer
    .map((v) => `<li>${esc(v.role)} — ${esc(v.org)} (${esc(v.year)})</li>`)
    .join("");
  const highlights = highlightLines
    .map((line) => `<li>${esc(line)}</li>`)
    .join("");

  return `
<main id="seo-static-shell">
  <header>
    <p>Hello, I'm</p>
    <h1>${esc(profile.name)} — ${esc(profile.title)}</h1>
    <p>${esc(profile.heroLead)}</p>
    <p>${esc(profile.heroDescription)}</p>
    <p>${esc(profile.heroSupport)}</p>
    <p>
      <a href="#work">Explore My Work</a>
    </p>
  </header>

  <section id="about">
    <h2>About Me</h2>
    <p>${esc(profile.aboutIntro)}</p>
    ${summary}
    <h3>Selected Achievements</h3>
    <ul>${achievements}</ul>
    <h3>Education</h3>
    <ul>${edu}</ul>
  </section>

  <section id="highlights">
    <h2>Career highlights</h2>
    <ul>${highlights}</ul>
  </section>

  <section id="career">
    <h2>Professional Experience</h2>
    ${jobs}
  </section>

  <section id="work">
    <h2>Production Applications &amp; Engineering Experience</h2>
    <p>A selection of engineering contributions across Udrive's mobility technology ecosystem.</p>
    ${work}
  </section>

  <section id="skills">
    <h2>Technical Skills</h2>
    ${skills}
  </section>

  <section id="contact">
    <h2>Let's Build Something Meaningful</h2>
    <p>${esc(profile.contactIntro)}</p>
    <p>${esc(profile.contactSupport)}</p>
    <ul>
      <li>Email: <a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a></li>
      <li>Location: ${esc(profile.locationFull)}</li>
      <li>LinkedIn: <a href="${esc(profile.linkedin)}">${esc(profile.linkedinLabel)}</a></li>
      <li>GitHub: <a href="${esc(profile.github)}">${esc(profile.githubLabel)}</a></li>
    </ul>
    <h3>Certifications &amp; Professional Development</h3>
    <ul>${certs}</ul>
    <h3>Volunteering</h3>
    <ul>${vols}</ul>
  </section>

  <footer>
    <p>${esc(profile.name)}</p>
    <p>${esc(profile.footerTagline)}</p>
    <p>${esc(profile.locationFull)}</p>
  </footer>
</main>
`.trim();
}
