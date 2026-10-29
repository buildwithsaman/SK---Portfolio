import { profile } from "../src/data/cv.ts";

export function siteOrigin(): string {
  return profile.siteUrl.replace(/\/$/, "");
}

function escAttr(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function buildSitemapXml(): string {
  const loc = `${siteOrigin()}/`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${loc}</loc>
    <lastmod>${profile.contentUpdated}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
}

export function buildJsonLd(): string {
  const origin = siteOrigin();
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        url: `${origin}/`,
        name: profile.name,
        alternateName: profile.legalName,
        description: profile.seoDescription,
        inLanguage: "en",
        publisher: { "@id": `${origin}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${origin}/#person`,
        name: profile.name,
        alternateName: profile.legalName,
        givenName: profile.givenName,
        familyName: profile.familyName,
        jobTitle: profile.title,
        description: profile.heroDescription,
        url: `${origin}/`,
        image: `${origin}/og-image.png`,
        email: `mailto:${profile.email}`,
        telephone: profile.phoneHref.replace(/^tel:/, ""),
        hasOccupation: {
          "@type": "Occupation",
          name: profile.title,
          occupationLocation: {
            "@type": "City",
            name: profile.locationFull,
          },
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dubai",
          addressRegion: "Dubai",
          addressCountry: "AE",
        },
        homeLocation: {
          "@type": "Place",
          name: profile.locationFull,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Dubai",
            addressCountry: "AE",
          },
        },
        worksFor: {
          "@type": "Organization",
          name: "Udrive",
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Manipal Academy of Higher Education, Dubai",
        },
        sameAs: [profile.github, profile.linkedin],
        knowsAbout: [
          "React.js",
          "Next.js",
          "TypeScript",
          "JavaScript",
          "Python",
          "AWS",
          "D3.js",
          "Mapbox",
          "Apache Kafka",
          "Apache Superset",
          "FastStream",
          "Frontend Development",
          "KYC Automation",
        ],
        mainEntityOfPage: { "@id": `${origin}/#webpage` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${origin}/#webpage`,
        url: `${origin}/`,
        name: profile.seoTitle,
        description: profile.seoDescription,
        dateModified: profile.contentUpdated,
        inLanguage: "en",
        isPartOf: { "@id": `${origin}/#website` },
        about: { "@id": `${origin}/#person` },
        mainEntity: { "@id": `${origin}/#person` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${origin}/og-image.png`,
          width: 1200,
          height: 630,
        },
      },
    ],
  };

  return `${JSON.stringify(graph, null, 2)}`;
}

function setMetaContent(
  html: string,
  attr: "name" | "property",
  key: string,
  value: string,
): string {
  const pattern = new RegExp(
    `(<meta\\s+${attr}="${key}"[\\s\\S]*?content=")[^"]*(")`,
  );
  return html.replace(pattern, `$1${value}$2`);
}

/** Keep index.html metadata aligned with src/data/cv.ts at build/dev time. */
export function applySeoHead(html: string): string {
  const origin = siteOrigin();
  const title = escAttr(profile.seoTitle);
  const description = escAttr(profile.seoDescription);
  const jsonLd = buildJsonLd();

  let next = html.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${title}</title>`,
  );
  next = setMetaContent(next, "name", "description", description);
  next = setMetaContent(next, "property", "og:title", title);
  next = setMetaContent(next, "property", "og:description", description);
  next = setMetaContent(next, "name", "twitter:title", title);
  next = setMetaContent(next, "name", "twitter:description", description);
  next = setMetaContent(
    next,
    "property",
    "og:image:alt",
    `${escAttr(profile.name)}, ${escAttr(profile.title)} in Dubai`,
  );
  next = setMetaContent(
    next,
    "name",
    "twitter:image:alt",
    `${escAttr(profile.name)}, ${escAttr(profile.title)} in Dubai`,
  );
  next = next.replace(
    /(<link\s+rel="canonical"\s+href=")[^"]*(")/,
    `$1${origin}/$2`,
  );
  next = setMetaContent(next, "property", "og:url", `${origin}/`);
  next = next.replaceAll("https://buildwithsaman.dev", origin);
  next = next.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n${jsonLd}\n    </script>`,
  );
  return next;
}
