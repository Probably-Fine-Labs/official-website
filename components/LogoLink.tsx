"use client";

import Link from "next/link";
import type { ReactNode } from "react";

// Logo link to "/". When you're already on the home page, Next.js treats it as
// "same page" and doesn't scroll, so we scroll back to the top ourselves.
export default function LogoLink({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <Link
      href="/"
      className="logo"
      aria-label={label}
      onClick={(e) => {
        if (window.location.pathname === "/") {
          e.preventDefault();
          const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches;
          window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
        }
      }}
    >
      {children}
    </Link>
  );
}
