import type { Metadata } from "next";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import JsonLd, { peopleLd } from "@/components/JsonLd";
import { Note, PageBoard, Polaroid, Scribble } from "@/components/Desk";
import LogoMark from "@/components/LogoMark";
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
      <PageBoard
        label="about"
        title={
          <>
            A small lab for software that <em>just does its job.</em>
          </>
        }
        lede="The name is a joke. The quality bar isn't. We build focused apps that fix real everyday problems — and ship them only when they're, well, probably fine."
      >
        <Polaroid
          at={{ right: "6%", top: "12%", r: 4 }}
          href="#people"
          caption="the lab, 2026 (room for more)"
        />
        <Note at={{ right: "25%", bottom: "11%", r: -5 }} className="note-sm">
          est. 2026
          <br />
          kerala, india
        </Note>
      </PageBoard>

      <section>
        <div className="split">
          <div className="prose">
            <div className="label mono">{"purpose"}</div>
            <h2>Why the lab exists</h2>
            <p>
              Too much software gets in the way before it does anything useful.
              We think <b>small tools should feel small</b>: open them, get the
              answer, move on.
            </p>
            <p>
              Every product here started as a fix for something annoying.
              Probably Fine Labs is where those fixes become{" "}
              <b>products that last</b>: maintained, improved and shaped by the
              people who use them.
            </p>
          </div>
          <div className="prose">
            <div className="label mono">{"what's next"}</div>
            <h2>Where we&apos;re headed</h2>
            <p>
              More tools are in the works, each one aimed at a{" "}
              <b>real everyday problem</b>, and the existing ones keep getting
              better with every release.
            </p>
            <p>
              We share the process — demos, devlogs and launches — on{" "}
              <a
                href={site.youtube}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent)" }}
              >
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
        <div className="how-we-build note-sheet">
          <LogoMark className="note-pin" />
          <div className="label mono">{"how we build"}</div>
          <h3>{site.buildTagline}</h3>
          <p>
            We use a heavy LLM-based workflow to design, write and test our apps
            — it&apos;s how a small lab ships this much. But people decide what
            gets built, review the work and sign off on every release.
          </p>
        </div>
      </section>

      <section id="people">
        <div className="label mono">{"people"}</div>
        <div className="head-row">
          <h2>The humans behind it</h2>
          <Scribble>currently a team of one. working on it</Scribble>
        </div>
        <div className="people">
          {people.map((p) => (
            <article className="card person" key={p.name}>
              <div className="avatar">
                <Avatar name={p.name} size={88} />
              </div>
              <div>
                <h3>{p.name}</h3>
                <div className="role mono">{p.role}</div>
              </div>
              <p>{p.bio}</p>
              {p.location && (
                <span className="tag mono">
                  <PinIcon /> {p.location}
                </span>
              )}
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
            <div className="avatar avatar-empty" aria-hidden>
              <span>your photo here</span>
            </div>
            <span className="label mono">{"hiring, eventually"}</span>
            <h3>
              More people coming soon <span className="cursor" />
            </h3>
            <p>
              Want to build small, sharp tools with us? Say hello and tell us
              what you&apos;d make.
            </p>
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
