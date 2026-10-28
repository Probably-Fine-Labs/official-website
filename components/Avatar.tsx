// A deliberately wonky cartoon face, generated from a name.
// Same name, same face, so no image files are needed for new people.

const backgrounds = ["#ffd8a8", "#a5d8ff", "#b2f2bb", "#d0bfff", "#ffc9c9", "#99e9f2", "#ffec99"];
const skins = ["#f6c7a1", "#e0a982", "#c68b62", "#a86b45", "#8a5534", "#f2d4b6"];
const hairs = ["#2b2118", "#5c3a21", "#a0522d", "#d9a441", "#1c1a17", "#7a7a7a", "#e8590c"];

// Small seeded PRNG (mulberry32) so every feature is reproducible per name.
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export default function Avatar({ name, size = 72 }: { name: string; size?: number }) {
  const r = rng(hash(name));
  const pick = <T,>(arr: T[]) => arr[Math.floor(r() * arr.length)];
  const between = (a: number, b: number) => a + r() * (b - a);
  const f = (n: number) => Math.round(n * 10) / 10;

  const bg = pick(backgrounds);
  const skin = pick(skins);
  const hair = pick(hairs);

  // Head: a lumpy, slightly tilted potato.
  const tilt = between(-10, 10);
  const w = between(30, 38);
  const h = between(36, 42);
  const lump = () => between(-5, 5);
  const head = `M60 ${f(60 - h + lump())}
    C ${f(60 + w + lump())} ${f(60 - h)} ${f(60 + w + 4 + lump())} ${f(60 + h * 0.6)} 60 ${f(60 + h + lump())}
    C ${f(60 - w - 4 + lump())} ${f(60 + h * 0.6)} ${f(60 - w + lump())} ${f(60 - h)} 60 ${f(60 - h + lump())} Z`;

  // Ears: never the same size.
  const earL = between(6, 11);
  const earR = between(4, 9);

  // Eyes: mismatched sizes and heights, pupils looking somewhere random.
  const eyeL = { x: 60 - between(12, 17), y: 54 + between(-4, 3), r: between(7, 12) };
  const eyeR = { x: 60 + between(11, 16), y: 54 + between(-3, 5), r: between(4, 8) };
  const lookX = between(-0.5, 0.5);
  const lookY = between(-0.4, 0.4);
  const squint = r() < 0.25; // sometimes one eye just... gives up

  // Mouth: a wobbly line, a lopsided grin with one tooth, or a tiny "o".
  const mouthKind = Math.floor(r() * 3);
  const my = 82 + between(-3, 3);

  const hairKind = Math.floor(r() * 4);
  const top = 60 - h;

  return (
    <svg width={size} height={size} viewBox="0 0 120 120" role="img" aria-label={`Cartoon avatar for ${name}`}>
      <rect width="120" height="120" fill={bg} />
      <g transform={`rotate(${f(tilt)} 60 64)`} stroke="#1c1a17" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* ears */}
        <ellipse cx={f(60 - w - 2)} cy="62" rx={f(earL * 0.7)} ry={f(earL)} fill={skin} />
        <ellipse cx={f(60 + w + 3)} cy="58" rx={f(earR * 0.7)} ry={f(earR)} fill={skin} />

        {/* head */}
        <path d={head} fill={skin} />

        {/* hair */}
        {hairKind === 0 && (
          // spiky
          <path
            d={`M${f(60 - w + 4)} ${f(top + 14)} l6 -14 l5 10 l6 -15 l5 12 l7 -16 l4 13 l7 -11 l3 12`}
            fill="none"
            stroke={hair}
            strokeWidth="5"
          />
        )}
        {hairKind === 1 && (
          // mop that's sliding off
          <path
            d={`M${f(60 - w - 3)} ${f(top + 22)} Q 50 ${f(top - 14)} ${f(60 + w + 6)} ${f(top + 16)} Q 62 ${f(top + 4)} ${f(60 - w - 3)} ${f(top + 22)} Z`}
            fill={hair}
          />
        )}
        {hairKind === 2 && (
          // three brave hairs
          <g fill="none">
            <path d={`M56 ${f(top + 2)} q -4 -10 2 -16`} />
            <path d={`M61 ${f(top + 1)} q 2 -12 -1 -18`} />
            <path d={`M66 ${f(top + 3)} q 6 -8 4 -14`} />
          </g>
        )}
        {hairKind === 3 && (
          // tiny bun, way too high
          <>
            <path d={`M${f(60 - w + 2)} ${f(top + 18)} Q 60 ${f(top - 8)} ${f(60 + w - 2)} ${f(top + 18)}`} fill={hair} />
            <circle cx="66" cy={f(top - 8)} r="7" fill={hair} />
          </>
        )}

        {/* eyebrows: one surprised, one suspicious */}
        <path d={`M${f(eyeL.x - 9)} ${f(eyeL.y - eyeL.r - 6)} q 9 -8 18 -1`} fill="none" />
        <path d={`M${f(eyeR.x - 7)} ${f(eyeR.y - eyeR.r - 3)} l 14 ${f(between(-6, 2))}`} fill="none" />

        {/* eyes */}
        <circle cx={f(eyeL.x)} cy={f(eyeL.y)} r={f(eyeL.r)} fill="#fff" />
        <circle cx={f(eyeL.x + lookX * eyeL.r)} cy={f(eyeL.y + lookY * eyeL.r)} r={f(eyeL.r * 0.4)} fill="#1c1a17" stroke="none" />
        {squint ? (
          <path d={`M${f(eyeR.x - 6)} ${f(eyeR.y)} l 6 -3 l 6 3`} fill="none" />
        ) : (
          <>
            <circle cx={f(eyeR.x)} cy={f(eyeR.y)} r={f(eyeR.r)} fill="#fff" />
            <circle cx={f(eyeR.x - lookX * eyeR.r)} cy={f(eyeR.y + lookY * eyeR.r)} r={f(eyeR.r * 0.45)} fill="#1c1a17" stroke="none" />
          </>
        )}

        {/* nose: long, wandering */}
        <path d={`M58 60 q ${f(between(-10, 10))} 12 ${f(between(-2, 6))} 16 q -4 2 -7 0`} fill="none" />

        {/* blush */}
        <ellipse cx="40" cy="74" rx="6" ry="3.5" fill="#ff8787" opacity="0.5" stroke="none" />
        <ellipse cx="81" cy="72" rx="4" ry="2.5" fill="#ff8787" opacity="0.5" stroke="none" />

        {/* mouth */}
        {mouthKind === 0 && <path d={`M44 ${f(my)} q 5 -4 9 0 t 9 0 t 9 0 t 7 -3`} fill="none" />}
        {mouthKind === 1 && (
          <>
            <path d={`M45 ${f(my - 3)} Q 60 ${f(my + 14)} 78 ${f(my - 7)}`} fill="#7a2e2e" />
            <rect x="57" y={f(my + 1)} width="6" height="5" rx="1" fill="#fff" strokeWidth="1.5" />
          </>
        )}
        {mouthKind === 2 && <ellipse cx="64" cy={f(my)} rx="4" ry="5.5" fill="#7a2e2e" />}
      </g>
    </svg>
  );
}
