import Link from "next/link";
import { ArrowLeft } from "@/components/Icons";

export default function NotFound() {
  return (
    <div className="wrap">
      <section className="hero">
        <div className="status mono">
          <span className="dot" style={{ background: "var(--accent)" }} />
          status: not so fine (404)
        </div>
        <h1 className="display">
          This page is <em>probably</em> somewhere else.
        </h1>
        <div className="ctas">
          <Link className="btn primary" href="/">
            <ArrowLeft /> Back home
          </Link>
        </div>
      </section>
    </div>
  );
}
