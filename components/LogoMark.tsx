import type { SVGProps } from "react";

// Brand mark: the "probably fine" ring. Geometry is copied from the brand
// sheet (public/brand/logo-white.svg). Uses currentColor so it follows the theme.
export const ring = {
  viewBox: "0 0 200 200",
  circle: {
    cx: 100,
    cy: 100,
    r: 74,
    strokeWidth: 20,
    dasharray: "418 47",
    rotate: -62,
  },
} as const;

export default function LogoMark(props: SVGProps<SVGSVGElement>) {
  const c = ring.circle;
  return (
    <svg viewBox={ring.viewBox} aria-hidden {...props}>
      <circle
        cx={c.cx}
        cy={c.cy}
        r={c.r}
        fill="none"
        stroke="currentColor"
        strokeWidth={c.strokeWidth}
        strokeDasharray={c.dasharray}
        transform={`rotate(${c.rotate} 100 100)`}
      />
    </svg>
  );
}
