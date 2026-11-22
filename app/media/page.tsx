import type { Metadata } from "next";
import { Note, PageBoard } from "@/components/Desk";
import { pageMeta } from "@/lib/seo";
import { products, site } from "@/lib/site";
import AssetActions from "./AssetActions";

export const metadata: Metadata = pageMeta(
  "Media",
  "Official Probably Fine Labs logos and product icons, as SVG: download them, or copy a link to embed.",
  "/media",
);

type Asset = {
  name: string;
  file: string; // under /public
  note: string;
  tile: "light" | "dark"; // the preview background it is made for
};

// The lab's marks, then every product icon that exists as SVG.
const brand: Asset[] = [
  { name: "Ring mark, black", file: "/brand/logo-black.svg", note: "For light backgrounds.", tile: "light" },
  { name: "Ring mark, white", file: "/brand/logo-white.svg", note: "For dark backgrounds.", tile: "dark" },
];
const icons: Asset[] = products
  .filter((p) => p.logo.endsWith(".svg"))
  .map((p) => ({ name: `${p.name} icon`, file: p.logo, note: p.tagline, tile: "light" }));

function AssetCard({ a }: { a: Asset }) {
  const fileName = a.file.split("/").pop();
  return (
    <div className="card asset">
      <div className={`asset-tile ${a.tile}`}>
        {/* The file itself, exactly as it downloads. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={a.file} alt={a.name} width={96} height={96} />
      </div>
      <div>
        <h3>{a.name}</h3>
        <p>{a.note}</p>
      </div>
      <AssetActions file={a.file} name={a.name} size={64} />
      <div className="foot">
        <span>{fileName}</span>
        <strong>SVG</strong>
      </div>
    </div>
  );
}

export default function Media() {
  return (
    <div className="wrap">
      <PageBoard
        label="media"
        title={
          <>
            Our marks, <em>free to use.</em>
          </>
        }
        lede={`Official ${site.name} logos and product icons as SVG. Download them, or copy a link to embed them as they are.`}
      >
        <Note at={{ right: "8%", top: "14%", r: 4 }} className="note-sm">
          please keep
          <br />
          the gap
        </Note>
      </PageBoard>

      <section id="brand">
        <div className="label mono">{"the lab"}</div>
        <h2>The ring</h2>
        <div className="grid3">
          {brand.map((a) => (
            <AssetCard key={a.file} a={a} />
          ))}
        </div>
      </section>

      <section id="products">
        <div className="label mono">{"products"}</div>
        <h2>Product icons</h2>
        <div className="grid3">
          {icons.map((a) => (
            <AssetCard key={a.file} a={a} />
          ))}
        </div>
      </section>

      <section className="prose" style={{ maxWidth: 720 }}>
        <div className="label mono">{"using them"}</div>
        <h2>A few kind requests</h2>
        <p>
          Use the marks to link to us, write about us or show that something
          works with our products. Keep them as they are: <b>black or white</b>,
          the ring&apos;s gap at the top right, and some room around them. Please
          don&apos;t use them to suggest we made or endorse something we
          didn&apos;t.
        </p>
        <p>
          Copied links point at the files on this site, so an embedded icon
          always shows the current version. Questions? <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </section>
    </div>
  );
}
