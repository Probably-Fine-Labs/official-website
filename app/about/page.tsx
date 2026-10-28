import type { Metadata } from "next";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import JsonLd, { peopleLd } from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { socialIcons, ArrowRight, PinIcon } from "@/components/Icons";
import { CtaBand } from "@/components/SiteChrome";
import { people, principles, site } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "About",
  "Why Probably Fine Labs exists, how we build, and the people behind it.",
  "/about",
);

export default function About() {
  return (
    <div className="wrap">
      <JsonLd data={peopleLd} />
      <section className="page-head">
        <div className="label mono">{"// about"}</div>
        <h1 className="page">
          A small lab for software that <em>just does its job.</em>
        </h1>
        <p className="lede">
          The name is a joke. The quality bar isn&apos;t. We build focused apps that fix real everyday problems — and
          ship them only when they&apos;re, well, probably fine.
        </p>
      </section>

      <section>
        <div className="split">
          <div className="prose">
            <div className="label mono">{"// purpose"}</div>
            <h2>Why the lab exists</h2>
            <p>
              Too much software asks for an account, your data and a subscription before it does anything useful.
              We think <b>small tools should feel small</b>: open them, get the answer, move on.
            </p>
            <p>
              Every product here started as a fix for something annoying. Probably Fine Labs gives those products{" "}
              <b>one home</b>, so they can share features, stay maintained and make room for what comes next.
            </p>
          </div>
          <div className="prose">
            <div className="label mono">{"// what's next"}</div>
            <h2>Where we&apos;re headed</h2>
            <p>
              Existing products are <b>moving from personal domains to the lab</b>, with one place for downloads,
              updates and support.
            </p>
            <p>
              New tools are in the works, and we share the process — demos, devlogs and launches — on{" "}
              <a href={site.youtube} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
                YouTube
              </a>
              .
            </p>
          </div>
        </div>
        <div className="principles">
          {principles.map((pr, i) => (
            <div className="pr" key={pr.title}>
              <div className="n mono">0{i + 1}</div>
              <h4>{pr.title}</h4>
              <p>{pr.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="people">
        <div className="label mono">{"// people"}</div>
        <h2>The humans behind it</h2>
        <div className="people">
          {people.map((p) => (
            <article className="card person" key={p.name}>
              <div className="avatar">
                <Avatar name={p.name} size={96} />
              </div>
              <div>
                <h3>{p.name}</h3>
                <div className="role mono">{p.role}</div>
              </div>
              <p>{p.bio}</p>
              {p.location && <span className="tag mono"><PinIcon /> {p.location}</span>}
              <div className="socials">
                {p.links.map((l) => {
                  const Icon = socialIcons[l.label];
                  return (
                    <a
                      key={l.href}
                      className="social mono"
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.name} on ${l.label}`}
                    >
                      <Icon />
                      {l.label}
                    </a>
                  );
                })}
              </div>
            </article>
          ))}
          <article className="card soon person">
            <span className="label mono">{"// hiring, eventually"}</span>
            <h3>
              More people coming soon <span className="cursor" />
            </h3>
            <p>Want to build small, sharp tools with us? Say hello and tell us what you&apos;d make.</p>
            <Link className="btn ghost sm" href="/contact?topic=join">
              Get in touch <ArrowRight />
            </Link>
          </article>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
