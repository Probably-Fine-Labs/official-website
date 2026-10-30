import Link from "next/link";
import Orbit, { ImageSatellite } from "@/components/Orbit";
import ProductCard from "@/components/ProductCard";
import { CtaBand } from "@/components/SiteChrome";
import { principles, products, site } from "@/lib/site";
import { ArrowRight, PlayIcon } from "@/components/Icons";

export default function Home() {
  return (
    <div className="wrap">
      <section className="hero hero-grid">
        <div className="hero-copy">
          <div className="status mono">
            <span className="dot" />
            all systems: probably fine
          </div>
          <h1 className="display">
            Small, sharp tools
            <br />
            that are <em>probably fine.</em>
          </h1>
          <p className="lede">{site.description}</p>
          <div className="ctas">
            <Link className="btn primary" href="/products">
              Explore products <ArrowRight />
            </Link>
            <a className="btn ghost" href={site.youtube} target="_blank" rel="noopener noreferrer">
              <PlayIcon /> Watch on YouTube
            </a>
          </div>
          <div className="meta mono">
            <span>
              <b>{products.length}</b> products shipped
            </span>
            <span>
              <b>Windows · Web · Android · CLI</b>
            </span>
            <span>
              <b>Free</b> to use, open source where it counts
            </span>
          </div>
        </div>
        <Orbit
          className="hero-visual"
          satellites={products.map((p) => ({
            key: p.slug,
            label: p.name,
            node: <ImageSatellite id={p.slug} href={p.logo} />,
          }))}
        />
      </section>

      <section id="products">
        <div className="label mono">{"products"}</div>
        <h2>Things we&apos;ve shipped</h2>
        <div className="grid3">
          {products.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>
      </section>

      <section id="about">
        <div className="split">
          <div className="prose">
            <div className="label mono">{"why we exist"}</div>
            <h2>
              Software should solve the problem,
              <br />
              <em>not become one.</em>
            </h2>
            <p>
              Probably Fine Labs builds <b>focused tools for everyday annoyances</b> — a slow PC, a file stuck on the
              wrong device, a website you need to understand. Each one does its job without clutter, trackers or
              upsells.
            </p>
            <p>
              Every product is maintained, improved and shaped by the people who use it, long after launch.
            </p>
            <Link className="btn ghost sm" href="/about">
              More about the lab <ArrowRight />
            </Link>
          </div>
          <div className="panel mono" aria-label="What the lab is working toward">
            <div className="row"><span className="k">build</span><span>tools people actually reach for</span></div>
            <div className="row"><span className="k">keep</span><span>them free, light and private</span></div>
            <div className="row"><span className="k">open</span><span>source where it helps others</span></div>
            <div className="row"><span className="k">share</span><span>the process on YouTube</span></div>
            <div className="row"><span className="k">grow</span><span>the team, one good person at a time</span></div>
            <div className="row"><span className="k">next</span><span>something new <span className="cursor" /></span></div>
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

      <CtaBand />
    </div>
  );
}
