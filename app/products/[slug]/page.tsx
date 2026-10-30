import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { GitHubIcon, ArrowUpRight } from "@/components/Icons";
import JsonLd, { productLd } from "@/components/JsonLd";
import LogoMark from "@/components/LogoMark";
import { AppTile, PageBoard, Receipt } from "@/components/Desk";
import { pageMeta } from "@/lib/seo";
import { CtaBand } from "@/components/SiteChrome";
import { products } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  return p
    ? pageMeta(`${p.name} — ${p.tagline}`, p.summary, `/products/${p.slug}`)
    : {};
}

// The shell is shared by every product URL, so anything that reads the slug
// lives inside <Suspense>. That keeps client navigation instant.
export default function ProductPage({ params }: PageProps<"/products/[slug]">) {
  return (
    <div className="wrap">
      <Suspense fallback={<ProductSkeleton />}>
        <ProductDetails params={params} />
      </Suspense>
      <CtaBand />
    </div>
  );
}

function ProductSkeleton() {
  const bar = (w: number | string, h: number, mt = 0) => (
    <div
      style={{
        width: w,
        maxWidth: "100%",
        height: h,
        marginTop: mt,
        borderRadius: 10,
        background: "var(--line)",
        opacity: 0.6,
      }}
    />
  );
  return (
    <section
      className="board-wrap"
      aria-busy="true"
      aria-label="Loading product"
    >
      <div className="board board-head">
        <div className="board-copy" style={{ width: "100%" }}>
          <LogoMark
            className="spin"
            style={{
              width: 28,
              height: 28,
              color: "var(--muted)",
              marginBottom: 20,
            }}
          />
          {bar(160, 14)}
          {bar(520, 52, 18)}
          {bar(420, 20, 18)}
          {bar(300, 46, 26)}
        </div>
      </div>
    </section>
  );
}

async function ProductDetails({
  params,
}: Pick<PageProps<"/products/[slug]">, "params">) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <>
      <JsonLd data={productLd(p)} />
      <PageBoard
        label={
          <>
            <Link href="/products">products</Link> / {p.slug}
          </>
        }
        title={
          <>
            {p.name}. <em>{p.tagline}</em>
          </>
        }
        lede={p.summary}
        actions={
          <>
            <a
              className="btn primary"
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open {p.name} <ArrowUpRight />
            </a>
            {p.links.map((l) => (
              <a
                key={l.href}
                className="btn ghost"
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {l.label.startsWith("Source") && <GitHubIcon />}
                {l.label}
              </a>
            ))}
          </>
        }
      >
        <AppTile p={p} at={{ right: "24%", top: "12%", r: -4 }} />
        <Receipt
          at={{ right: "5%", top: "22%", r: 3 }}
          title={p.name}
          rows={[
            [
              "platforms",
              p.platforms.filter((x) => x !== "Open source").join(", "),
            ],
            ["status", p.status],
            ["source", p.source ? "open" : "—"],
          ]}
          total={["price", "free"]}
        />
      </PageBoard>

      <section>
        <div className="label mono">{"features"}</div>
        <h2>What it does</h2>
        <div className="feature-grid">
          {p.features.map((f) => (
            <div className="feature" key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
