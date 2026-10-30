import Link from "next/link";
import LabDesk from "@/components/LabDesk";
import ProductCard from "@/components/ProductCard";
import { CtaBand } from "@/components/SiteChrome";
import { principles, products } from "@/lib/site";
import { ArrowRight } from "@/components/Icons";
import { Scribble } from "@/components/Desk";
import LogoMark from "@/components/LogoMark";

export default function Home() {
  return (
    <>
      <LabDesk />
      <div className="wrap">
        <section id="products">
          <div className="label mono">{"products"}</div>
          <div className="head-row">
            <h2>Things we&apos;ve shipped</h2>
            <Scribble>all free. pick one up</Scribble>
          </div>
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
                Probably Fine Labs builds{" "}
                <b>focused tools for everyday annoyances</b> — a slow PC, a file
                stuck on the wrong device, a website you need to understand.
                Each one does its job without clutter, trackers or upsells.
              </p>
              <p>
                Every product is maintained, improved and shaped by the people
                who use it, long after launch.
              </p>
              <Link className="btn ghost sm" href="/about">
                More about the lab <ArrowRight />
              </Link>
            </div>
            <div
              className="panel notebook mono"
              aria-label="What the lab is working toward"
            >
              <span className="rings" aria-hidden>
                <LogoMark />
                <LogoMark />
                <LogoMark />
                <LogoMark />
              </span>
              <div className="row">
                <span className="k">build</span>
                <span>tools people actually reach for</span>
              </div>
              <div className="row">
                <span className="k">keep</span>
                <span>them free, light and private</span>
              </div>
              <div className="row">
                <span className="k">open</span>
                <span>source where it helps others</span>
              </div>
              <div className="row">
                <span className="k">share</span>
                <span>the process on YouTube</span>
              </div>
              <div className="row">
                <span className="k">grow</span>
                <span>the team, one good person at a time</span>
              </div>
              <div className="row">
                <span className="k">next</span>
                <span>
                  something new <span className="cursor" />
                </span>
              </div>
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
    </>
  );
}
