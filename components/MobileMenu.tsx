"use client";

import { useRef } from "react";

// <details> works without JS; this only closes it after a link is tapped,
// since the sticky header stays mounted across client-side navigations.
export default function MobileMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  return (
    <details
      ref={ref}
      className="menu"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest(".menu-panel a"))
          ref.current?.removeAttribute("open");
      }}
    >
      <summary aria-label="Open menu">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </summary>
      <div className="menu-panel">{children}</div>
    </details>
  );
}
