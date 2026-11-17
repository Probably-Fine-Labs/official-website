import type { Metadata } from "next";
import { AppTile, PageBoard, Redacted, Scribble } from "@/components/Desk";
import JsonLd, { productListLd } from "@/components/JsonLd";
import ProductCard, { IdeaCard } from "@/components/ProductCard";
import { CtaBand } from "@/components/SiteChrome";
import { pageMeta } from "@/lib/seo";
import { products } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Products",
  "Free, focused apps by Probably Fine Labs: SysInfo Pro (Windows diagnostics), FileDrop (instant file transfer) and Web Scanner (subdomain & URL discovery).",
  "/products",
);

// App tiles on the right of the header board: a loose 2-column stack,
// each column nudged up/down and tilted a little so it still feels scattered.
// Fits up to 4 tiles without overlap; add a row here if the catalogue grows.
const tiles = [
  { right: "21%", top: "12%", r: -5 },
  { right: "4%", top: "7%", r: 3 },
  { right: "20%", top: "52%", r: 2 },
  { right: "5%", top: "47%", r: -4 },
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
          <Scribble>one of these is a secret</Scribble>
        </div>
        <div className="grid3">
          {products.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
          <Redacted still />
          <IdeaCard />
        </div>
      </section>
      <CtaBand />
    </div>
  );
}
