import type { ReactNode } from "react";

// Decorative brand animation: the "probably fine" ring at the centre, slowly
// turning, with satellites (product logos, people...) circling on two orbits.
// Pure SVG + CSS (see .orbit-* in globals.css); it stays still for
// prefers-reduced-motion. Each satellite is drawn centred on (0, 0), ~48px wide.

const C = 260; // centre of the 520×520 canvas
const ORBITS = [
  { r: 150, dur: 46 },
  { r: 222, dur: 70 },
];

export type Satellite = { key: string; label: string; node: ReactNode };

export default function Orbit({ satellites, className }: { satellites: Satellite[]; className?: string }) {
  // Spread satellites over both orbits, evenly spaced, offset so none overlap.
  const placed = satellites.map((s, i) => {
    const orbit = i % ORBITS.length;
    const onOrbit = satellites.filter((_, j) => j % ORBITS.length === orbit).length;
    const index = Math.floor(i / ORBITS.length);
    const angle = (index / onOrbit) * Math.PI * 2 + (orbit === 0 ? -Math.PI / 2.6 : Math.PI / 5);
    return { ...s, orbit, x: C + ORBITS[orbit].r * Math.cos(angle), y: C + ORBITS[orbit].r * Math.sin(angle) };
  });

  return (
    <svg className={`orbit ${className ?? ""}`} viewBox="0 0 520 520" aria-hidden>
      {/* orbit tracks */}
      <circle cx={C} cy={C} r={ORBITS[0].r} fill="none" stroke="var(--line)" strokeWidth="1.5" />
      <g className="orbit-spin" style={{ ["--dur" as string]: "120s" }}>
        <circle cx={C} cy={C} r={ORBITS[1].r} fill="none" stroke="var(--line)" strokeWidth="1.5" strokeDasharray="2 10" strokeLinecap="round" />
      </g>

      {/* ripples leaving the ring */}
      <circle className="orbit-ripple" cx={C} cy={C} r="70" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
      <circle className="orbit-ripple delay" cx={C} cy={C} r="70" fill="none" stroke="var(--ink)" strokeWidth="1.5" />

      {/* the brand ring (same proportions as the logo, scaled to r=70) */}
      <g className="orbit-ring">
        <circle
          cx={C}
          cy={C}
          r="70"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="19"
          strokeDasharray="395 45"
          transform={`rotate(-62 ${C} ${C})`}
        />
      </g>

      {/* satellites: each orbit rotates; each satellite counter-rotates to stay upright */}
      {ORBITS.map((o, oi) => (
        <g key={oi} className="orbit-spin" style={{ ["--dur" as string]: `${o.dur}s` }}>
          {placed
            .filter((p) => p.orbit === oi)
            .map((p) => (
              <g key={p.key} transform={`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`}>
                <g className="orbit-counter" style={{ ["--dur" as string]: `${o.dur}s` }}>
                  <title>{p.label}</title>
                  {p.node}
                </g>
              </g>
            ))}
        </g>
      ))}
    </svg>
  );
}

// Rounded, bordered tile for an image satellite (product logos).
export function ImageSatellite({ id, href, size = 52 }: { id: string; href: string; size?: number }) {
  const h = size / 2;
  return (
    <>
      <clipPath id={`sat-${id}`}>
        <rect x={-h} y={-h} width={size} height={size} rx={size * 0.24} />
      </clipPath>
      <rect x={-h - 4} y={-h - 4} width={size + 8} height={size + 8} rx={size * 0.3} fill="var(--bg)" stroke="var(--line)" />
      <image href={href} x={-h} y={-h} width={size} height={size} clipPath={`url(#sat-${id})`} preserveAspectRatio="xMidYMid slice" />
    </>
  );
}

// Empty "someone new" slot.
export function PlaceholderSatellite({ size = 52 }: { size?: number }) {
  const h = size / 2;
  return (
    <>
      <rect x={-h} y={-h} width={size} height={size} rx={size * 0.3} fill="var(--bg)" stroke="var(--muted)" strokeDasharray="4 5" />
      <path d="M0 -10 V10 M-10 0 H10" stroke="var(--muted)" strokeWidth="2.5" strokeLinecap="round" />
    </>
  );
}
