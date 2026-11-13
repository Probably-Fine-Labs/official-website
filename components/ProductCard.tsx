import Link from "next/link";
import type { Product } from "@/lib/site";
import ProductLogo from "./ProductLogo";
import { ArrowRight } from "./Icons";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/products/${p.slug}`} className="card">
      <div className="top">
        <ProductLogo p={p} />
        <span className="tag-row">
          {p.stage && <span className="tag stage mono">{p.stage}</span>}
          <span className="tag mono">{p.platforms.join(" · ")}</span>
        </span>
      </div>
      <h3>{p.name}</h3>
      <p>{p.summary}</p>
      <ul className="mono">
        {p.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      <div className="foot mono">
        <span>{p.status}</span>
        <strong>
          details <ArrowRight />
        </strong>
      </div>
    </Link>
  );
}

// Fills the product grid: invites visitors to suggest the next tool.
export function IdeaCard() {
  return (
    <Link href="/contact?topic=feedback" className="card idea-card">
      <span className="label mono">{"your turn"}</span>
      <h3>What should we build next?</h3>
      <p>
        Got an everyday annoyance that deserves a small, sharp fix? Tell us.
        The best ideas end up on the desk.
      </p>
      <div className="foot mono">
        <span>suggestions open</span>
        <strong>
          suggest a tool <ArrowRight />
        </strong>
      </div>
    </Link>
  );
}
