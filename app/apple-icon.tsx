import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
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

// Home-screen icon for iOS: same "pf" mark as the favicon, full-bleed tile.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1c1a17",
          position: "relative",
          fontFamily: "Inter",
        }}
      >
        <div style={{ fontSize: 92, fontWeight: 700, color: "#f6f3ec", letterSpacing: -4, marginTop: -6 }}>pf</div>
        <div
          style={{
            position: "absolute",
            top: 26,
            right: 26,
            width: 30,
            height: 30,
            borderRadius: 15,
            background: "#e8590c",
          }}
        />
      </div>
    ),
    { ...size, fonts },
  );
}
