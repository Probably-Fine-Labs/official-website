import Link from "next/link";
import type { Product } from "@/lib/site";
import ProductLogo from "./ProductLogo";
import { ArrowRight } from "./Icons";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/products/${p.slug}`} className="card">
      <div className="top">
        <ProductLogo p={p} />
        <span className="tag mono">{p.platforms.join(" · ")}</span>
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

export function SoonCard() {
  return (
    <div className="card soon">
      <span className="label mono">{"in the lab"}</span>
      <h3>
        Something new <span className="cursor" />
      </h3>
      <p>New tools are brewing. Follow along on YouTube to see them first.</p>
    </div>
  );
}
