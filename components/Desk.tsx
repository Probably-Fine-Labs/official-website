import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import DraggableDesk from "./DraggableDesk";
import LogoMark from "./LogoMark";
import type { Product } from "@/lib/site";

// The "lab desk" design language, shared by every page:
//   Board     – dotted desk surface; items on it can be dragged, text stays in front
//   artifacts – paper objects that sit on a board (note, polaroid, app tile, ...)
//   Scribble  – a handwritten margin note with a drawn arrow
// Artifacts take `at` = position/tilt on the board, e.g. { right: "6%", top: "12%", r: 3 }.

type At = {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  r?: number;
};
const place = (at?: At): CSSProperties | undefined =>
  at &&
  ({
    left: at.left,
    right: at.right,
    top: at.top,
    bottom: at.bottom,
    ["--r" as string]: `${at.r ?? 0}deg`,
  } as CSSProperties);

/* ---------------------------------------------------------------- boards */

// Page header on a board: copy on the left (always in front), artifacts on the right.
export function PageBoard({
  label,
  title,
  lede,
  children,
  actions,
}: {
  label: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="board-wrap">
      <DraggableDesk className="board board-head">
        {children}
        <div className="board-copy">
          <div className="label">{label}</div>
          <h1 className="page">{title}</h1>
          {lede && <p className="lede">{lede}</p>}
          {actions && <div className="ctas">{actions}</div>}
        </div>
      </DraggableDesk>
    </section>
  );
}

/* ------------------------------------------------------------- artifacts */

export function Note({
  children,
  at,
  className = "",
}: {
  children: ReactNode;
  at?: At;
  className?: string;
}) {
  return (
    <div className={`artifact note ${className}`} style={place(at)} aria-hidden>
      <LogoMark className="note-pin" />
      {children}
    </div>
  );
}

export function Polaroid({
  caption,
  people = ["laptop", "coffee", "pointing"],
  href,
  at,
  className = "",
}: {
  caption: string;
  people?: string[];
  href?: string;
  at?: At;
  className?: string;
}) {
  const body = (
    <>
      <span className="photo">
        {people.map((p) => (
          <Image
            key={p}
            src={`/people/peep-${p}.svg`}
            alt=""
            width={96}
            height={136}
          />
        ))}
      </span>
      <span className="caption">{caption}</span>
    </>
  );
  return href ? (
    <Link
      href={href}
      className={`artifact polaroid ${className}`}
      style={place(at)}
      aria-label={caption}
    >
      {body}
    </Link>
  ) : (
    <div
      className={`artifact polaroid ${className}`}
      style={place(at)}
      aria-hidden
    >
      {body}
    </div>
  );
}

export function AppTile({
  p,
  at,
  className = "",
}: {
  p: Product;
  at?: At;
  className?: string;
}) {
  return (
    <Link
      href={`/products/${p.slug}`}
      className={`artifact app-tile ${className}`}
      style={place(at)}
      aria-label={p.name}
    >
      <Image src={p.logo} alt="" width={64} height={64} />
      <span className="app-name">{p.name}</span>
      <small>{p.platforms.join(" · ")}</small>
    </Link>
  );
}

export function Receipt({
  title,
  rows,
  total,
  at,
  className = "",
}: {
  title: string;
  rows: [string, string][];
  total?: [string, string];
  at?: At;
  className?: string;
}) {
  return (
    <div
      className={`artifact receipt ${className}`}
      style={place(at)}
      aria-hidden
    >
      <span className="r-title">
        <LogoMark style={{ width: 16, height: 16 }} /> {title}
      </span>
      {rows.map(([k, v]) => (
        <span key={k} className="r-row">
          <span>{k}</span>
          <span>{v}</span>
        </span>
      ))}
      {total && (
        <span className="r-row r-total">
          <span>{total[0]}</span>
          <span>{total[1]}</span>
        </span>
      )}
    </div>
  );
}

export function Postcard({
  message,
  to,
  at,
  className = "",
}: {
  message: ReactNode;
  to: string;
  at?: At;
  className?: string;
}) {
  return (
    <div
      className={`artifact postcard ${className}`}
      style={place(at)}
      aria-hidden
    >
      <span className="pc-msg">{message}</span>
      <span className="pc-addr">
        <span className="pc-stamp">
          <LogoMark />
        </span>
        <span className="pc-line">{to}</span>
        <span className="pc-line" />
        <span className="pc-line" />
      </span>
    </div>
  );
}

export function Redacted({
  title = "Experiment 004",
  progress = 72,
  at,
  className = "",
  still = false,
}: {
  title?: string;
  progress?: number;
  at?: At;
  className?: string;
  still?: boolean;
}) {
  return (
    <div
      className={`${still ? "" : "artifact "}redacted ${className}`}
      style={place(at)}
      aria-label={`${title}: classified, brewing`}
    >
      <span className="a-head">
        <LogoMark style={{ width: 20, height: 20 }} />
        {title}
        <small>classified</small>
      </span>
      <span className="bars" aria-hidden>
        <b style={{ width: "92%" }} />
        <b style={{ width: "70%" }} />
        <b style={{ width: "84%" }} />
      </span>
      <span className="progress">
        <span>status: brewing</span>
        <span>{progress}%</span>
      </span>
      <span className="pbar" aria-hidden>
        <i style={{ width: `${progress}%` }} />
      </span>
    </div>
  );
}

/* --------------------------------------------------------------- margins */

// Handwritten aside with a drawn arrow. dir = where the arrow points.
export function Scribble({
  children,
  dir = "down",
  className = "",
}: {
  children: ReactNode;
  dir?: "down" | "left" | "right";
  className?: string;
}) {
  const arrow =
    dir === "left" ? (
      <path d="M58 10 C 40 4, 18 10, 6 24 M6 24 l3 -10 M6 24 l10 -2" />
    ) : dir === "right" ? (
      <path d="M4 10 C 22 4, 44 10, 56 24 M56 24 l-3 -10 M56 24 l-10 -2" />
    ) : (
      // starts beside the note, loops out and comes back down-left toward the content below
      <path d="M8 8 C 40 2, 52 22, 16 36 M16 36 l9.9 1.5 M16 36 l6.3 -7.8" />
    );
  return (
    <span className={`scribble ${className}`} aria-hidden>
      <span>{children}</span>
      <svg
        viewBox="0 0 62 40"
        width="54"
        height="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {arrow}
      </svg>
    </span>
  );
}
