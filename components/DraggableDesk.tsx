"use client";

import { useRef, type ReactNode } from "react";

type Drag = {
  el: HTMLElement;
  startX: number;
  startY: number;
  baseX: number;
  baseY: number;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  moved: boolean;
};

// Lets visitors push the hero's desk items (.artifact) around the board.
// Offsets live in CSS vars (--dx/--dy) so the tilt and hover styles still apply.
// A drag never triggers the item's link; a plain click still does.
export default function DraggableDesk({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  const desk = useRef<HTMLDivElement>(null);
  const drag = useRef<Drag | null>(null);
  const suppressClick = useRef(false);
  const top = useRef(10);

  function onPointerDown(e: React.PointerEvent) {
    if (e.button !== 0 || !desk.current) return;
    const el = (e.target as HTMLElement).closest<HTMLElement>(".artifact");
    if (!el || !desk.current.contains(el)) return;

    const baseX = parseFloat(el.style.getPropertyValue("--dx")) || 0;
    const baseY = parseFloat(el.style.getPropertyValue("--dy")) || 0;
    const d = desk.current.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    // Keep at least half of the item on the board.
    drag.current = {
      el,
      startX: e.clientX,
      startY: e.clientY,
      baseX,
      baseY,
      minX: baseX + (d.left - r.left) - r.width / 2,
      maxX: baseX + (d.right - r.right) + r.width / 2,
      minY: baseY + (d.top - r.top) - r.height / 2,
      maxY: baseY + (d.bottom - r.bottom) + r.height / 2,
      moved: false,
    };
    el.setPointerCapture(e.pointerId);
    el.style.zIndex = String(++top.current);
  }

  function onPointerMove(e: React.PointerEvent) {
    const d = drag.current;
    if (!d) return;
    const mx = e.clientX - d.startX;
    const my = e.clientY - d.startY;
    if (!d.moved && Math.hypot(mx, my) < 4) return; // small jitter is still a click
    if (!d.moved) {
      d.moved = true;
      d.el.classList.add("dragging");
    }
    const x = Math.min(d.maxX, Math.max(d.minX, d.baseX + mx));
    const y = Math.min(d.maxY, Math.max(d.minY, d.baseY + my));
    d.el.style.setProperty("--dx", `${x}px`);
    d.el.style.setProperty("--dy", `${y}px`);
  }

  function onPointerUp() {
    const d = drag.current;
    if (!d) return;
    d.el.classList.remove("dragging");
    suppressClick.current = d.moved;
    drag.current = null;
  }

  return (
    <div
      ref={desk}
      className={className}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onDragStart={(e) => e.preventDefault()}
      onClickCapture={(e) => {
        if (suppressClick.current) {
          e.preventDefault();
          e.stopPropagation();
          suppressClick.current = false;
        }
      }}
    >
      {children}
    </div>
  );
}
