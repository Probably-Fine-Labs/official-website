import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { products, site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Inter (OFL licensed), bundled so the image matches the site's headline weight.
const fontDir = join(process.cwd(), "assets/fonts");
const [inter700, inter800] = await Promise.all([
  readFile(join(fontDir, "Inter-700.ttf")),
  readFile(join(fontDir, "Inter-800.ttf")),
]);
const fonts = [
  { name: "Inter", data: inter700, weight: 700 as const, style: "normal" as const },
  { name: "Inter", data: inter800, weight: 800 as const, style: "normal" as const },
];

// Share card for links posted on social media, chat apps, and search results.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#f6f3ec",
          backgroundImage:
            "linear-gradient(rgba(28,26,23,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(28,26,23,.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          color: "#1c1a17",
          fontFamily: "Inter",
          fontWeight: 700,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#1c1a17",
              color: "#f6f3ec",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
              position: "relative",
            }}
          >
            pf
            <div
              style={{
                position: "absolute",
                top: -8,
                right: -8,
                width: 20,
                height: 20,
                borderRadius: 10,
                background: "#e8590c",
                border: "4px solid #f6f3ec",
              }}
            />
          </div>
          <div style={{ fontSize: 34, fontWeight: 700 }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3 }}>Small, sharp tools</div>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3 }}>
            that are&nbsp;<span style={{ color: "#e8590c" }}>probably fine.</span>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26, color: "#6b665c" }}>
          <div style={{ display: "flex", gap: 14 }}>
            {products.map((p) => (
              <div
                key={p.slug}
                style={{ padding: "8px 18px", border: "2px solid #e2dccf", borderRadius: 999, background: "#fffdf8", color: "#1c1a17" }}
              >
                {p.name}
              </div>
            ))}
          </div>
          <div style={{ fontWeight: 700, color: "#1c1a17" }}>pflabs.in</div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
