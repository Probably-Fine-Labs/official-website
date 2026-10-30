"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "@/components/Icons";

const topics = [
  { value: "feedback", label: "Feedback or idea" },
  { value: "bug", label: "Bug report" },
  { value: "collab", label: "Collaboration / business" },
  { value: "join", label: "Joining the lab" },
  { value: "other", label: "Something else" },
];

// No backend yet: the form builds a pre-filled email in the visitor's mail app.
// Swap handleSubmit for a server action or form service later without touching the UI.
export default function ContactForm({
  email,
  products,
}: {
  email: string;
  products: string[];
}) {
  const topicRef = useRef<HTMLSelectElement>(null);

  // Preselect a topic from ?topic=… (e.g. the "Join the lab" link on About).
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("topic");
    if (t && topicRef.current && topics.some((x) => x.value === t))
      topicRef.current.value = t;
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const topic = f.get("topic");
    const label = topics.find((x) => x.value === topic)?.label ?? "Hello";
    const product = f.get("product");
    const subject = `[${label}]${product ? ` ${product}` : ""} — from ${f.get("name")}`;
    const body = `${f.get("message")}\n\n— ${f.get("name")}${f.get("reply") ? ` (${f.get("reply")})` : ""}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Your name
        <input
          name="name"
          required
          autoComplete="name"
          placeholder="Ada Lovelace"
        />
      </label>
      <label>
        Reply-to email{" "}
        <span className="hint">
          optional — only if it differs from the one you send from
        </span>
        <input
          name="reply"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
      </label>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
        }}
      >
        <label>
          Topic
          <select name="topic" ref={topicRef} defaultValue="feedback">
            {topics.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Product
          <select name="product" defaultValue="">
            <option value="">Not product-specific</option>
            {products.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Message
        <textarea name="message" required placeholder="What's on your mind?" />
      </label>
      <button
        className="btn primary"
        type="submit"
        style={{ alignSelf: "flex-start" }}
      >
        Send message <ArrowRight />
      </button>
      <span
        className="hint mono"
        style={{ fontSize: 12, color: "var(--muted)" }}
      >
        Opens your email app with everything filled in.
      </span>
    </form>
  );
}
