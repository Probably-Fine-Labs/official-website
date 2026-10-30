import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import DraggableDesk from "./DraggableDesk";
import { Postcard } from "./Desk";
import LogoMark from "./LogoMark";
import LogoLink from "./LogoLink";
import { site } from "@/lib/site";
import { ArrowRight, ArrowUpRight } from "./Icons";

const links = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Logo() {
  return (
    <LogoLink label={`${site.name} home`}>
      <LogoMark className="logo-mark" />
      <span>{site.name}</span>
    </LogoLink>
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
          <span>
            © 2026 {site.name}. {site.buildTagline}
          </span>
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
      <DraggableDesk className="board board-cta">
        <Postcard
          at={{ right: "6%", top: "16%", r: 4 }}
          to={site.email}
          message={
            <>
              dear lab,
              <br />
              your app did a thing…
            </>
          }
        />
        <div className="board-copy">
          <h2>Got an idea, bug, or hello?</h2>
          <p>Feedback shapes what we build next. We read everything.</p>
          <div className="ctas">
            <Link className="btn primary" href="/contact">
              Get in touch <ArrowRight />
            </Link>
          </div>
        </div>
      </DraggableDesk>
    </section>
  );
}
