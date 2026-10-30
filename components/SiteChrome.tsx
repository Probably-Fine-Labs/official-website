import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import LogoMark from "./LogoMark";
import { site } from "@/lib/site";
import { ArrowRight, ArrowUpRight } from "./Icons";

const links = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label={`${site.name} home`}>
      <LogoMark className="logo-mark" />
      <span>{site.name}</span>
    </Link>
  );
}

export function Nav() {
  return (
    <header className="site-header">
      <nav className="nav wrap" aria-label="Main">
        <Logo />
        <div className="nav-links">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
          <a href={site.youtube} target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
          <div className="nav-right">
            <ThemeToggle />
            <MobileMenu>
              {links.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
              <a href={site.youtube} target="_blank" rel="noopener noreferrer">
                YouTube <ArrowUpRight />
              </a>
            </MobileMenu>
          </div>
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <div className="wrap">
      <footer className="footer">
        <div className="footer-brand">
          <Logo />
          <span>© 2026 {site.name}. {site.buildTagline}</span>
        </div>
        <nav aria-label="Footer">
          <Link href="/products">Products</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <a href={site.youtube} target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
          <Link href="/privacy">Privacy</Link>
        </nav>
      </footer>
    </div>
  );
}

export function CtaBand() {
  return (
    <section>
      <div className="cta">
        <div>
          <h2>Got an idea, bug, or hello?</h2>
          <p>Feedback shapes what we build next.</p>
        </div>
        <Link className="btn accent" href="/contact">
          Get in touch <ArrowRight />
        </Link>
      </div>
    </section>
  );
}
