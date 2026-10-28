import type { Metadata } from "next";
import JsonLd, { productListLd } from "@/components/JsonLd";
import ProductCard, { SoonCard } from "@/components/ProductCard";
import { pageMeta } from "@/lib/seo";
import { CtaBand } from "@/components/SiteChrome";
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
      <section className="page-head">
        <div className="label mono">{"// products"}</div>
        <h1 className="page">
          Tools we&apos;ve <em>shipped.</em>
        </h1>
        <p className="lede">Free, focused apps for Windows, web and Android. More are on the way.</p>
      </section>
      <section style={{ paddingTop: 16 }}>
        <div className="grid3">
          {products.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
          <SoonCard />
        </div>
      </section>
      <CtaBand />
    </div>
  );
}
