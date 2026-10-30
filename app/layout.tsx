import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Caveat } from "next/font/google";
import JsonLd, { organizationLd } from "@/components/JsonLd";
import { Nav, Footer } from "@/components/SiteChrome";
import { themeScript } from "@/components/ThemeToggle";
import { site } from "@/lib/site";
import "./globals.css";

// Brand font: variable Inter (weights 100–900) from the brand kit, self-hosted.
const inter = localFont({
  src: "./fonts/inter.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});
// Handwriting for desk notes and margin scribbles (OFL, Google Fonts).
const hand = Caveat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-hand",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: site.keywords,
  authors: [{ name: site.founder, url: "https://imanandhu.in" }],
  creator: site.founder,
  publisher: site.name,
  category: "technology",
  alternates: { canonical: "/", types: { "text/plain": "/llms.txt" } },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Paste the codes from Google Search Console / Bing Webmaster Tools here once you verify pflabs.in.
  // verification: { google: "…", other: { "msvalidate.01": "…" } },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-theme is set by themeScript before hydration, hence suppressHydrationWarning.
    <html
      lang="en"
      // Next 16: lets the router switch smooth scrolling off during page changes,
      // so navigating lands at the top instead of mid-animation.
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${hand.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd data={organizationLd} />
      </head>
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
