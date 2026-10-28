import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Everything is public. AI crawlers are welcome too: being cited by assistants is discovery.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
