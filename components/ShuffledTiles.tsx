"use client";

import { useSyncExternalStore } from "react";
import { AppTile } from "./Desk";
import type { Product } from "@/lib/site";

// Where the tiles sit on the header board (one per slot, staggered + tilted).
const slots = [
  { right: "27%", top: "18%", r: -5 },
  { right: "15%", bottom: "12%", r: 3 },
  { right: "4%", top: "13%", r: -2 },
];

// Picked once per page load, so a reload shows a different set while
// client-side navigation keeps the same one.
let picked: number[] | null = null;
function pick(count: number) {
  if (!picked) {
    const idx = Array.from({ length: count }, (_, i) => i);
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    picked = idx.slice(0, slots.length);
  }
  return picked;
}
const noop = () => () => {};

// The page is prerendered, so the random choice happens in the browser.
// The server renders no tiles (they're decorative) and they appear on hydration.
export default function ShuffledTiles({ products }: { products: Product[] }) {
  const choice = useSyncExternalStore(
    noop,
    () => pick(products.length),
    () => null,
  );
  if (!choice) return null;
  return choice.map((i, slot) => (
    <AppTile
      key={products[i].slug}
      p={products[i]}
      at={slots[slot]}
      className="sm tile-in"
    />
  ));
}
