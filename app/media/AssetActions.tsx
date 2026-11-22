"use client";

import { useState } from "react";

// Copy buttons for one media asset. Links are built from the address the
// visitor is on, so they work on pflabs.in and www.pflabs.in alike.
async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Older browsers, or a page without clipboard permission.
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.append(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }
}

export default function AssetActions({
  file,
  name,
  size,
}: {
  file: string;
  name: string;
  size: number;
}) {
  const [done, setDone] = useState<"" | "link" | "embed">("");
  const url = () => new URL(file, window.location.origin).href;
  const run = (kind: "link" | "embed", text: () => string) => async () => {
    await copy(text());
    setDone(kind);
    setTimeout(() => setDone(""), 1600);
  };
  return (
    <div className="asset-actions">
      <a className="btn sm primary" href={file} download>
        Download
      </a>
      <button type="button" className="btn sm ghost" onClick={run("link", url)}>
        {done === "link" ? "Link copied" : "Copy link"}
      </button>
      <button
        type="button"
        className="btn sm ghost"
        onClick={run("embed", () => `<img src="${url()}" alt="${name}" width="${size}" height="${size}">`)}
      >
        {done === "embed" ? "Embed copied" : "Copy embed code"}
      </button>
      <span className="sr-only" aria-live="polite">
        {done ? (done === "link" ? "Link copied" : "Embed code copied") : ""}
      </span>
    </div>
  );
}
