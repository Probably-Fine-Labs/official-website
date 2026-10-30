import { ImageResponse } from "next/og";
import { ring } from "@/components/LogoMark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Home-screen icon for iOS: brand ring, white on black (iOS rounds the corners).
export default function AppleIcon() {
  const c = ring.circle;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#000" }}>
        <svg width="112" height="112" viewBox={ring.viewBox}>
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
      </div>
    ),
    size,
  );
}
