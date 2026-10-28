# Probably Fine Labs

Website for **[Probably Fine Labs](https://pflabs.in)**: an independent software lab building small, focused, free apps. This site is the home for the lab's products, its story and its people.

- Live: **https://pflabs.in**
- YouTube: [@ProbablyFineLabs](https://www.youtube.com/@ProbablyFineLabs)

| Product | What it is | Platforms |
| --- | --- | --- |
| [SysInfo Pro](https://pflabs.in/products/sysinfopro) | Windows diagnostics with developer tools | Windows |
| [FileDrop](https://pflabs.in/products/filedrop) | Send files between devices with a six-digit code | Web, Windows, Android |
| [Web Scanner](https://pflabs.in/products/webscanner) | Find a site's publicly discoverable subdomains and URLs | Web, CLI |

## Quick start

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # production build; every page is prerendered
npm start        # serve the production build
```

Built with Next.js 16 (App Router, `cacheComponents`, partial prefetching), React 19 and TypeScript. Styles are plain CSS in `app/globals.css`, with Tailwind v4 loaded but barely used.

> **Note:** Next.js 16 differs from older versions. Check the docs bundled in `node_modules/next/dist/docs/` before changing framework-level code (see `AGENTS.md`).

## Editing content

Almost everything you'll want to change lives in **[`lib/site.ts`](lib/site.ts)**:

| To… | Edit |
| --- | --- |
| Change the tagline, contact email, URL or YouTube link | `site` |
| Add or update a product | `products` (and put its logo in `public/products/`) |
| Add a team member | `people` (they get a generated avatar automatically) |
| Change the principles shown on Home and About | `principles` |

Product pages, the sitemap, `llms.txt`, structured data and the share image all read from this file, so a new product or person shows up everywhere without touching other code.

**Adding a product:**

1. Drop its logo in `public/products/` (square PNG or SVG).
2. Add an entry to `products` in `lib/site.ts` with a unique `slug`. Set `logoBg` if the logo needs a backdrop to stay visible in dark mode.
3. Its page appears at `/products/<slug>`.

## Project structure

```
app/
  page.tsx                  Home
  about/                    Purpose, principles, people
  products/                 Product list + [slug] detail pages
  contact/                  Contact page + mailto form (ContactForm.tsx)
  privacy/  not-found.tsx
  layout.tsx                Fonts, theme script, site metadata, nav/footer
  globals.css               Design tokens (light/dark) and all styles
  icon.svg  favicon.ico  apple-icon.tsx  opengraph-image.tsx  manifest.ts
  robots.ts  sitemap.ts  llms.txt/  llms-full.txt/
components/
  SiteChrome.tsx            Sticky nav, footer, contact band
  ThemeToggle.tsx           Light/dark switch + no-flash script
  MobileMenu.tsx            Mobile nav menu
  Avatar.tsx                Generated cartoon faces for people
  ProductCard.tsx  ProductLogo.tsx  Icons.tsx  JsonLd.tsx
lib/
  site.ts                   All site content (start here)
  seo.ts                    Per-page metadata helper
  llms.ts                   Builds llms.txt / llms-full.txt
assets/fonts/               Inter TTFs for generated images (OFL)
```

## How things work

- **Theme:** an inline script in `<head>` sets `data-theme` on `<html>` before the page paints. It uses the saved choice from `localStorage`, otherwise the system setting, so the page never flashes the wrong theme. Colors are CSS variables in `globals.css`. The toggle's active state is pure CSS.
- **Icons and arrows:** draw every arrow and symbol as SVG (`components/Icons.tsx`). Don't type `→ ↗ ▶`, because Apple devices may render them as emoji.
- **Avatars:** `Avatar.tsx` draws a deliberately wonky face, seeded from the person's name. The same name always gets the same face.
- **Contact form:** there's no backend yet. The form opens the visitor's email app with a pre-filled message. To use a form service or server action instead, replace `handleSubmit` in `app/contact/ContactForm.tsx`.
- **Product pages:** content that depends on the URL sits inside `<Suspense>`, as Next.js 16 instant navigation requires. All known products are still fully prerendered via `generateStaticParams`.

## SEO and discoverability

| URL | Purpose |
| --- | --- |
| `/sitemap.xml`, `/robots.txt` | Search engine crawling (all crawlers allowed) |
| `/llms.txt`, `/llms-full.txt` | Plain-text summaries for AI assistants ([llmstxt.org](https://llmstxt.org)) |
| `/opengraph-image` | 1200×630 share card used by every page |
| `/manifest.webmanifest`, `/icon.svg`, `/favicon.ico`, `/apple-icon` | App and browser icons |

Every page also has a canonical URL, Open Graph and Twitter tags, and schema.org JSON-LD (Organization, WebSite, SoftwareApplication, Person).

- **Content dates:** update `updated` in `app/sitemap.ts` when content changes meaningfully.
- **Favicon:** if you change `app/icon.svg`, regenerate `favicon.ico` to match.

## Before going live

- [ ] Confirm the contact inbox (`site.email` in `lib/site.ts`, currently `hello@pflabs.in`).
- [ ] Point **pflabs.in** at the deployment (e.g. Vercel) and enable HTTPS.
- [ ] Verify the domain in Google Search Console and Bing Webmaster Tools, then submit `https://pflabs.in/sitemap.xml`. Verification codes go in the commented `verification` field in `app/layout.tsx`.
- [ ] Redirect the old `*.imanandhu.in` product sites to pflabs.in as each product moves over, or link to it from them until then.
- [ ] Link pflabs.in from the YouTube channel, GitHub profile and imanandhu.in.

## Credits

Product logos belong to their respective products. Inter is used under the SIL Open Font License.

© 2026 Probably Fine Labs
