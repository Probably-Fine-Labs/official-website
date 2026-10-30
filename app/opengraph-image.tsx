import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { ring } from "@/components/LogoMark";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Static Inter instances cut from the brand's variable inter.woff2
// (the image renderer can't read woff2 or variable fonts).
const fontDir = join(process.cwd(), "assets/fonts");
const [inter400, inter600] = await Promise.all([
  readFile(join(fontDir, "Inter-400.ttf")),
  readFile(join(fontDir, "Inter-600.ttf")),
]);

// Share card: the brand banner (ring + wordmark on black), plus tagline and domain.
export default function OpengraphImage() {
  const c = ring.circle;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        color: "#fff",
        fontFamily: "Inter",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
        <svg width="100" height="100" viewBox={ring.viewBox}>
          <circle
            cx={c.cx}
            cy={c.cy}
            r={c.r}
            fill="none"
            stroke="#fff"
            strokeWidth={c.strokeWidth}
            strokeDasharray={c.dasharray}
            transform={`rotate(${c.rotate} 100 100)`}
          />
        </svg>
        <div style={{ fontSize: 70, fontWeight: 600, letterSpacing: -2.8 }}>
          {site.name}
        </div>
      </div>
      <div
        style={{
          marginTop: 34,
          fontSize: 30,
          fontWeight: 400,
          color: "#8f8f8f",
          letterSpacing: -0.6,
        }}
      >
        {site.tagline}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 48,
          fontSize: 24,
          fontWeight: 600,
          color: "#6b6b6b",
          letterSpacing: -0.4,
        }}
      >
        pflabs.in
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Inter", data: inter400, weight: 400, style: "normal" },
        { name: "Inter", data: inter600, weight: 600, style: "normal" },
      ],
    },
  );
}
