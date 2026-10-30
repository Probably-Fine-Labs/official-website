import type { Metadata } from "next";
import { MailIcon, YouTubeIcon } from "@/components/Icons";
import { pageMeta } from "@/lib/seo";
import { products, site } from "@/lib/site";
import ContactForm from "./ContactForm";
import { Note, PageBoard, Postcard } from "@/components/Desk";

export const metadata: Metadata = pageMeta(
  "Contact",
  "Contact Probably Fine Labs: feedback, bug reports, collaborations or just a hello.",
  "/contact",
);

export default function Contact() {
  return (
    <div className="wrap">
      <PageBoard
        label="contact"
        title={
          <>
            Say hello. <em>We read everything.</em>
          </>
        }
        lede="Feature ideas, bug reports, collaborations or a quick thanks — it all shapes what we build next."
      >
        <Postcard
          at={{ right: "5%", top: "18%", r: 4 }}
          to={site.email}
          message={
            <>
              dear lab,
              <br />
              love the app. one tiny idea…
            </>
          }
        />
        <Note at={{ right: "7%", bottom: "7%", r: -6 }} className="note-sm">
          replies usually within a few days
        </Note>
      </PageBoard>
      <section>
        <div className="contact-grid">
          <ContactForm
            email={site.email}
            products={products.map((p) => p.name)}
          />
          <div className="channels">
            <a className="channel" href={`mailto:${site.email}`}>
              <span className="ci">
                <MailIcon />
              </span>
              <span>
                <strong>Email</strong>
                <small className="mono">{site.email}</small>
              </span>
            </a>
            <a
              className="channel"
              href={site.youtube}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="ci">
                <YouTubeIcon />
              </span>
              <span>
                <strong>YouTube</strong>
                <small className="mono">@ProbablyFineLabs</small>
              </span>
            </a>
            <div className="panel mono" style={{ lineHeight: 1.8 }}>
              <div className="row">
                <span className="k">reply</span>
                <span>usually within a few days</span>
              </div>
              <div className="row">
                <span className="k">bugs</span>
                <span>include OS + app version</span>
              </div>
              <div className="row">
                <span className="k">where</span>
                <span>{site.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
