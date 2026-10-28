import type { Metadata } from "next";
import { site } from "./site";

const ogImage = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` };

// Per-page metadata: canonical URL plus matching Open Graph / Twitter text.
// Next.js replaces (not merges) a parent's openGraph/twitter objects, so the
// shared fields (site name, share image, card type) are repeated here.
// Relative URLs resolve against metadataBase (https://pflabs.in) set in the root layout.
export function pageMeta(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      title,
      description,
      url: path,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
  };
}
