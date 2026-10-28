import Image from "next/image";
import type { Product } from "@/lib/site";

export default function ProductLogo({ p, size = 44 }: { p: Product; size?: number }) {
  return (
    <span
      className="logo-tile"
      style={{ width: size, height: size, background: p.logoBg ?? "transparent", padding: p.logoBg ? size * 0.12 : 0 }}
    >
      <Image src={p.logo} alt={`${p.name} logo`} width={size} height={size} unoptimized={p.logo.endsWith(".svg")} />
    </span>
  );
}
