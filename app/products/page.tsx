import type { Metadata } from "next";
import { AppTile, PageBoard, Redacted, Scribble } from "@/components/Desk";
import JsonLd, { productListLd } from "@/components/JsonLd";
import ProductCard from "@/components/ProductCard";
import { CtaBand } from "@/components/SiteChrome";
import { pageMeta } from "@/lib/seo";
import { products } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Products",
  "Free, focused apps by Probably Fine Labs: SysInfo Pro (Windows diagnostics), FileDrop (instant file transfer) and Web Scanner (subdomain & URL discovery).",
  "/products",
);

// App tiles scattered on the right of the header board.
// Staggered up/down so no tile hides another's text.
const tiles = [
  { right: "27%", top: "18%", r: -5 },
  { right: "15%", bottom: "12%", r: 3 },
  { right: "4%", top: "13%", r: -2 },
];

export default function Products() {
  return (
    <div className="wrap">
      <JsonLd data={productListLd} />
      <PageBoard
        label="products"
        title={
          <>
            Tools we&apos;ve <em>shipped.</em>
          </>
        }
        lede="Free, focused apps for Windows, web and Android. More are on the desk."
      >
        {products.map((p, i) => (
          <AppTile key={p.slug} p={p} at={tiles[i % tiles.length]} className="sm" />
        ))}
      </PageBoard>

      <section>
        <div className="head-row">
          <h2>Everything, in one place</h2>
          <Scribble>the fourth one is a secret</Scribble>
        </div>
        <div className="grid3">
          {products.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
          <Redacted still />
        </div>
      </section>
      <CtaBand />
    </div>
  );
}
