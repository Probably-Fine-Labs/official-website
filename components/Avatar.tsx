import Peep, {
  type AccessoryType,
  type BustPoseType,
  type FaceType,
  type FacialHairType,
  type HairType,
} from "react-peeps";

// Hand-drawn portrait in the site's people style (Open Peeps, CC0, via react-peeps).
// The look is picked from the person's name, so the same name always gets the
// same portrait and new people need no image files. Rendered on the server as
// plain SVG. Always ink-on-paper: it's a printed photo, it doesn't invert.

const bodies: BustPoseType[] = [
  "Shirt",
  "ButtonShirt",
  "Hoodie",
  "Turtleneck",
  "PocketShirt",
  "Sweater",
  "PoloSweater",
  "BlazerBlackTee",
  "Coffee",
  "Device",
];
const faces: FaceType[] = [
  "Smile",
  "Calm",
  "Cute",
  "Cheeky",
  "SmileBig",
  "Driven",
  "SmileTeeth",
  "LoveGrin",
];
const hairs: HairType[] = [
  "ShortWavy",
  "ShortMessy",
  "ShortCurly",
  "Afro",
  "Bun",
  "Long",
  "LongCurly",
  "MediumStraight",
  "Pomp",
  "Twists",
  "CornRows",
  "BantuKnots",
  "Hijab",
  "FlatTop",
  "ShortVolumed",
  "Buns",
];
const facialHairs: FacialHairType[] = [
  "None",
  "None",
  "None",
  "Chin",
  "Goatee",
  "MoustacheThin",
  "FullMedium",
];
const accessories: AccessoryType[] = [
  "None",
  "None",
  "GlassRound",
  "GlassRoundThick",
  "GlassClubmaster",
];

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// "use cache": react-peeps calls Math.random() internally (for SVG ids), which
// Cache Components won't allow in a prerender. Caching renders the portrait once
// and reuses it — it only depends on the name anyway.
export default async function Avatar({
  name,
  size = 96,
}: {
  name: string;
  size?: number;
}) {
  "use cache";
  const h = hash(name);
  // Different bit ranges per feature so they vary independently.
  const pick = <T,>(arr: T[], shift: number) => arr[(h >>> shift) % arr.length];

  return (
    <span
      className="peep-avatar"
      role="img"
      aria-label={`Hand-drawn portrait of ${name}`}
      style={{ width: size, height: size }}
    >
      <Peep
        style={{ width: "100%", height: "100%" }}
        body={pick(bodies, 0)}
        face={pick(faces, 4)}
        hair={pick(hairs, 8)}
        facialHair={pick(facialHairs, 14)}
        accessory={pick(accessories, 19)}
        strokeColor="#0a0a0a"
        backgroundColor="#efede8"
        // head and shoulders
        viewBox={{ x: "90", y: "20", width: "680", height: "680" }}
      />
    </span>
  );
}
