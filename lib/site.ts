// Single source of truth for site content. Edit here; pages read from it.

export const site = {
  name: "Probably Fine Labs",
  shortName: "pflabs",
  tagline: "Small, sharp tools that are probably fine.",
  description:
    "An independent software lab building focused apps for developers and everyday computer people. No bloat, no drama.",
  url: "https://pflabs.in",
  // TODO: confirm this inbox exists (or change it) before going live.
  email: "hello@pflabs.in",
  youtube: "https://www.youtube.com/@ProbablyFineLabs",
  // Open-source home for the lab's public code.
  github: "https://github.com/Probably-Fine-Labs",
  location: "Kerala, India",
  founder: "Anandhu Remanan",
  buildTagline: "Human first, with help of AI.",
  keywords: [
    "Probably Fine Labs",
    "pflabs",
    "SysInfo Pro",
    "FileDrop",
    "Web Scanner",
    "Windows diagnostics",
    "file transfer without account",
    "subdomain finder",
    "free developer tools",
    "indie software lab",
  ],
};

export type Product = {
  slug: string;
  name: string;
  /** Path under /public. */
  logo: string;
  /** Tile behind logos that need one (e.g. transparent dark artwork). */
  logoBg?: string;
  tagline: string;
  summary: string;
  platforms: string[];
  status: string;
  url: string;
  source?: string;
  highlights: string[];
  features: { title: string; body: string }[];
  links: { label: string; href: string }[];
};

export const products: Product[] = [
  {
    slug: "sysinfopro",
    name: "SysInfo Pro",
    logo: "/products/sysinfopro.png",
    tagline: "Find out why. Then fix it.",
    summary:
      "Free Windows diagnostics with developer tools. Ranks what's actually slowing your PC down and tells you what to try.",
    platforms: ["Windows"],
    status: "v3.2",
    url: "https://sysinfopro.imanandhu.in",
    source: "https://github.com/anandhuremanan/sysinfopro",
    highlights: ["Slowdown diagnosis", "Dev & network doctor", "MIT licensed"],
    features: [
      { title: "Why so slow", body: "Ranks what is holding the PC back right now — a busy program, a Defender scan — and suggests what to try." },
      { title: "Network doctor", body: "Checks adapter, router, DNS and internet in order, then names the link that failed." },
      { title: "Dev doctor", body: "Shows which python, node or java runs when you type it, and why another copy wins." },
      { title: "Dev caches", body: "Sizes package caches and old build folders, and frees the ones unused for months." },
      { title: "Duplicates", body: "Finds files with identical contents and sends the extra copies to the Recycle Bin." },
      { title: "Floating widget", body: "A tiny always-on-top window with CPU, memory, battery and free space." },
    ],
    links: [
      { label: "Microsoft Store", href: "https://apps.microsoft.com/detail/9pd2g09hcxk3?cid=DevShareMCLPCS" },
      { label: "GitHub releases", href: "https://github.com/anandhuremanan/sysinfopro/releases/latest" },
    ],
  },
  {
    slug: "filedrop",
    name: "FileDrop",
    logo: "/products/filedrop-icon.png",
    tagline: "Transfer files instantly.",
    summary:
      "Move files between devices with a six-digit code. No account, nothing to install on the web, files deleted after transfer.",
    platforms: ["Web", "Windows", "Android"],
    status: "stable",
    url: "https://filedrop.imanandhu.in",
    highlights: ["No sign-up", "Cross-platform", "Auto-delete"],
    features: [
      { title: "No account", body: "Open it and send. There is nothing to sign up for." },
      { title: "Six-digit code", body: "Pair any two devices with a short code instead of cables or logins." },
      { title: "Auto-delete", body: "Files are removed once the transfer completes." },
      { title: "Native apps", body: "Dedicated apps for Windows and Android, plus the web." },
    ],
    links: [
      { label: "Microsoft Store", href: "https://apps.microsoft.com/detail/9p1wqhjj8hkc?cid=DevShareMCLPCS" },
      { label: "Android APK", href: "https://music-files.imanandhu.in/filedropmobile/FileDrop-1.2.2.apk" },
    ],
  },
  {
    slug: "webscanner",
    name: "Web Scanner",
    logo: "/products/webscanner.svg",
    tagline: "See what's publicly discoverable.",
    summary:
      "Map every publicly discoverable subdomain and URL of a website — from passive recon to a full crawl.",
    platforms: ["Web", "CLI", "Open source"],
    status: "open source",
    url: "https://webscanner.imanandhu.in",
    source: "https://github.com/anandhuremanan/Web-Scanner",
    highlights: ["Passive / standard / full", "Source labeling", "MIT licensed"],
    features: [
      { title: "Passive scan", body: "Builds a map from certificate logs, web archives and DNS without touching the target." },
      { title: "Standard scan", body: "Checks which subdomains are live and reads robots.txt and sitemaps." },
      { title: "Full crawl", body: "Follows links on live hosts to find routes sitemaps don't list." },
      { title: "Source labeling", body: "Every result shows how it was discovered." },
    ],
    links: [{ label: "Source on GitHub", href: "https://github.com/anandhuremanan/Web-Scanner" }],
  },
];

export type Person = {
  name: string;
  role: string;
  bio: string;
  location?: string;
  links: { label: "Web" | "GitHub" | "LinkedIn" | "X" | "YouTube"; href: string }[];
};

export const people: Person[] = [
  {
    name: "Anandhu Remanan",
    role: "Founder · Software Engineer",
    bio: "Builds the tools he wishes existed. Usually deep inside someone's codebase.",
    location: "Kerala, India",
    links: [
      { label: "Web", href: "https://imanandhu.in" },
      { label: "GitHub", href: "https://github.com/anandhuremanan" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/anandhuremanan/" },
      { label: "X", href: "https://twitter.com/anandhu_or" },
    ],
  },
];

export const principles = [
  { title: "Respect your time", body: "Fast to open, quick to be useful, no dark patterns." },
  { title: "Do one thing well", body: "Focused tools over feature soup." },
  { title: "Privacy by default", body: "We collect only what a feature needs, nothing more." },
];
