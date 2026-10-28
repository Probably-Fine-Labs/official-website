import type { MetadataRoute } from "next";
import { products, site } from "@/lib/site";

// Bump when content changes meaningfully; a fixed date keeps the build static.
const updated = "2026-10-28";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: `${site.url}${path}`,
    lastModified: updated,
    changeFrequency,
    priority,
  });

  return [
    page("", 1, "weekly"),
    page("/products", 0.9, "weekly"),
    ...products.map((p) => page(`/products/${p.slug}`, 0.8)),
    page("/about", 0.7),
    page("/contact", 0.5),
    page("/privacy", 0.2, "yearly"),
  ];
}
