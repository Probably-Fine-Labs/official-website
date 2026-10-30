import Image from "next/image";
import Link from "next/link";
import DraggableDesk from "./DraggableDesk";
import LogoMark from "./LogoMark";
import { Note, Polaroid, Redacted } from "./Desk";
import { ArrowRight } from "./Icons";
import { products, site } from "@/lib/site";

const logo = (slug: string) => products.find((p) => p.slug === slug)!.logo;

// Home hero: the "lab desk". Headline in the middle, real-ish lab artifacts
// scattered around it — glimpses of shipped products and one thing that isn't
// ready yet — to make visitors curious. Positions live in globals.css (.desk-*).
export default function LabDesk() {
  return (
    <section className="desk-wrap">
      <DraggableDesk className="desk">
        {/* --- artifacts (decorative, but the product ones are real links) --- */}
        <Note className="desk-note">
          lab rule #1: if it annoys you, build the fix.
          <br />
          #2: ship it when it&apos;s probably fine.
        </Note>

        <Link
          href="/products/sysinfopro"
          className="artifact slow desk-slow"
          aria-label="SysInfo Pro: why is my PC slow?"
        >
          <span className="a-head">
            <Image src={logo("sysinfopro")} alt="" width={26} height={26} />
            Why so slow?
            <small>SysInfo Pro</small>
          </span>
          <span className="meter">
            Chrome (42 tabs)
            <span>
              <i style={{ width: "78%" }} />
            </span>
          </span>
          <span className="meter">
            Defender scan
            <span>
              <i style={{ width: "34%" }} />
            </span>
          </span>
        </Link>

        <Polaroid
          className="desk-polaroid"
          href="/about#people"
          caption="the lab, 2026 (room for more)"
        />

        <Redacted className="desk-redacted" />

        {/* --- headline --- */}
        <div className="desk-center">
          <div className="desk-tile">
            <LogoMark />
          </div>
          <h1 className="display">
            Small, sharp tools
            <br />
            that are <em>probably fine.</em>
          </h1>
          <p className="lede">
            We build focused apps for everyday annoyances. Some are shipped.
            Some are still on the desk.
          </p>
          <div className="ctas">
            <Link className="btn primary" href="/about">
              Peek inside the lab <ArrowRight />
            </Link>
            <Link className="btn ghost" href="/products">
              See what shipped
            </Link>
          </div>
        </div>
      </DraggableDesk>

      <div className="desk-stats">
        <span className="desk-hint">psst, things on this desk move</span>
        <span>
          <b>{products.length}</b> products shipped
        </span>
        <span>
          <b>1</b> experiment brewing
        </span>
        <span>
          <b>Human first</b>,{" "}
          {site.buildTagline.replace(/^Human first,\s*/i, "")}
        </span>
      </div>
    </section>
  );
}
