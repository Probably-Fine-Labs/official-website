import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageBoard, Receipt } from "@/components/Desk";

export const metadata: Metadata = pageMeta(
  "Privacy",
  "How pflabs.in handles your data: no cookies, no analytics, no trackers.",
  "/privacy",
);

export default function Privacy() {
  return (
    <div className="wrap">
      <PageBoard
        label="privacy"
        title={
          <>
            Privacy, <em>in plain words.</em>
          </>
        }
        lede="Short version: this website collects nothing about you."
      >
        <Receipt
          at={{ right: "8%", top: "12%", r: 3 }}
          title="what pflabs.in keeps"
          rows={[
            ["cookies", "0"],
            ["analytics", "0"],
            ["trackers", "0"],
            ["theme choice", "1"],
          ]}
          total={["stays on", "your device"]}
        />
      </PageBoard>
      <section className="prose" style={{ maxWidth: 720 }}>
        <p>
          This website doesn&apos;t use cookies, analytics or trackers. The only
          thing stored in your browser is your light/dark theme choice, and it
          never leaves your device.
        </p>
        <p>
          If you contact us by email, we use your message only to reply. We
          don&apos;t sell or share it.
        </p>
        <p>
          Each product has its own privacy details on its page. Questions? Write
          to{" "}
          <a href={`mailto:${site.email}`} style={{ color: "var(--accent)" }}>
            {site.email}
          </a>
          .
        </p>
      </section>
    </div>
  );
}
