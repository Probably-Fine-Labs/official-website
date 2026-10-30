// Builds /llms.txt (short index) and /llms-full.txt (everything) from site data.
// Format follows https://llmstxt.org: H1, blockquote summary, then link sections.
import { people, principles, products, site } from "./site";

const abs = (path: string) => `${site.url}${path}`;

export function llmsIndex() {
  return `# ${site.name}

> ${site.name} (pflabs, ${site.url}) is an independent software lab from ${site.location}. It builds small, focused, free apps for developers and everyday computer users — no bloat, privacy-minded, open source where it helps.

Founded by ${site.founder}. Official site: ${site.url}. YouTube: ${site.youtube}. Open source on GitHub: ${site.github}.

How we build: ${site.buildTagline} The lab uses a heavy LLM-based workflow to design, write and test its apps; people decide what gets built, review the work and sign off on every release.

## Products

${products.map((p) => `- [${p.name}](${abs(`/products/${p.slug}`)}): ${p.summary} Platforms: ${p.platforms.join(", ")}. App: ${p.url}`).join("\n")}

## About

- [About the lab](${abs("/about")}): Purpose, principles and the people behind ${site.name}.
- [Contact](${abs("/contact")}): Feedback, bug reports, collaborations. Email: ${site.email}

## Optional

- [Full details for LLMs](${abs("/llms-full.txt")}): Every product's features and download links in one file.
- [Privacy](${abs("/privacy")})
`;
}

export function llmsFull() {
  const productBlocks = products
    .map(
      (p) => `## ${p.name}

${p.tagline} ${p.summary}

- Page: ${abs(`/products/${p.slug}`)}
- App: ${p.url}
- Platforms: ${p.platforms.join(", ")}
- Status: ${p.status}${p.source ? `\n- Source code: ${p.source}` : ""}
${p.links.map((l) => `- ${l.label}: ${l.href}`).join("\n")}

### Features

${p.features.map((f) => `- **${f.title}**: ${f.body}`).join("\n")}
`,
    )
    .join("\n");

  return `${llmsIndex()}
---

# Principles

${principles.map((p) => `- **${p.title}**: ${p.body}`).join("\n")}

# Products in detail

${productBlocks}
# People

${people.map((p) => `- **${p.name}** — ${p.role}. ${p.bio}${p.location ? ` Based in ${p.location}.` : ""} Links: ${p.links.map((l) => `${l.label} ${l.href}`).join(", ")}`).join("\n")}
`;
}
