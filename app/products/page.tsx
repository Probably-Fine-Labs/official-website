import type { Metadata } from "next";
import { PageBoard, Redacted, Scribble } from "@/components/Desk";
import JsonLd, { productListLd } from "@/components/JsonLd";
import ShuffledTiles from "@/components/ShuffledTiles";
import ProductCard, { IdeaCard } from "@/components/ProductCard";
import { CtaBand } from "@/components/SiteChrome";
import { pageMeta } from "@/lib/seo";
import { products } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Products",
  "Free, focused apps by Probably Fine Labs: SysInfo Pro (Windows diagnostics), FileDrop (instant file transfer) and Web Scanner (subdomain & URL discovery).",
  "/products",
);

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
        {/* 3 random apps per page load */}
        <ShuffledTiles products={products} />
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
