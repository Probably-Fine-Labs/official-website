import type { Metadata } from "next";
import { PageBoard } from "@/components/Desk";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import AssetActions from "./AssetActions";

export const metadata: Metadata = pageMeta(
  "Media",
  "The official Probably Fine Labs logo as SVG, in black and white: download it, or copy a link to embed it.",
  "/media",
);

// The logo: the ring and the name, its text drawn as outlines so it looks
// the same without Inter installed. Made by scripts outside this repo from
// assets/fonts/Inter-600.ttf, in the proportions of .logo in globals.css.
const versions = [
  { file: "/brand/probably-fine-labs-black.svg", label: "Black", use: "for light backgrounds" },
  { file: "/brand/probably-fine-labs-white.svg", label: "White", use: "for dark backgrounds" },
];

export default function Media() {
  return (
    <div className="wrap">
      <PageBoard
        label="media"
        title={
          <>
            Our logo, <em>free to use.</em>
          </>
        }
        lede={`The official ${site.name} logo as SVG. Download it, or copy a link to embed it as it is.`}
      />

      <section className="media-logo" aria-label="The logo">
        {/* The files themselves, exactly as they download: white on the dark theme, black on the light one. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="on-light" src={versions[0].file} alt={site.name} width={1057} height={164} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="on-dark" src={versions[1].file} alt={site.name} width={1057} height={164} />
      </section>

      <section className="media-versions">
        {versions.map((v) => (
          <div className="media-row" key={v.file}>
            <div>
              <b>{v.label}</b> <span className="muted">{v.use}</span>
              <div className="media-file mono">{v.file.split("/").pop()}</div>
            </div>
            <AssetActions file={v.file} name={site.name} width={212} height={33} />
          </div>
        ))}
      </section>

      <section className="prose" style={{ maxWidth: 720 }}>
        <div className="label mono">{"using it"}</div>
        <h2>A few kind requests</h2>
        <p>
          Use the logo to link to us, write about us or show that something
          works with our products. Keep it as it is: <b>black or white</b>, the
          ring&apos;s gap at the top right, and some room around it. Please
          don&apos;t use it to suggest we made or endorse something we
          didn&apos;t.
        </p>
        <p>
          Copied links point at the files on this site, so an embedded logo
          always shows the current version. Questions?{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </section>
    </div>
  );
}
