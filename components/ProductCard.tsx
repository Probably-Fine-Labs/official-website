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
