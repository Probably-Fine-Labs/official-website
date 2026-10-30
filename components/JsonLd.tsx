import { people, products, site, type Product } from "@/lib/site";

// Schema.org structured data. Helps search engines show the brand, logo,
// products and founder correctly (knowledge panel, rich results).
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

const orgId = `${site.url}/#organization`;

export const organizationLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": orgId,
      name: site.name,
      alternateName: ["pflabs", "PF Labs"],
      url: site.url,
      logo: `${site.url}/apple-icon`,
      description: site.description,
      email: site.email,
      founder: {
        "@type": "Person",
        name: site.founder,
        url: "https://imanandhu.in",
      },
      address: {
        "@type": "PostalAddress",
        addressRegion: "Kerala",
        addressCountry: "IN",
      },
      sameAs: [site.youtube],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      alternateName: "pflabs",
      publisher: { "@id": orgId },
      inLanguage: "en",
    },
  ],
};

export function productLd(p: Product) {
  const os = p.platforms
    .filter((x) => ["Windows", "Android", "Web"].includes(x))
    .join(", ");
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: p.name,
    description: p.summary,
    url: `${site.url}/products/${p.slug}`,
    sameAs: [p.url, ...(p.source ? [p.source] : [])],
    image: `${site.url}${p.logo}`,
    applicationCategory:
      p.slug === "webscanner" ? "SecurityApplication" : "UtilitiesApplication",
    operatingSystem: os || undefined,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@id": orgId },
    ...(p.status.startsWith("v") ? { softwareVersion: p.status.slice(1) } : {}),
  };
}

export const peopleLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: `${site.url}/about`,
  about: { "@id": orgId },
  mainEntity: people.map((p) => ({
    "@type": "Person",
    name: p.name,
    jobTitle: p.role,
    worksFor: { "@id": orgId },
    sameAs: p.links.map((l) => l.href),
  })),
};

export const productListLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: products.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${site.url}/products/${p.slug}`,
    name: p.name,
  })),
};
