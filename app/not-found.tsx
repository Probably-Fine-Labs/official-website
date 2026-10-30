import Link from "next/link";
import { Note, PageBoard, Redacted } from "@/components/Desk";
import { ArrowLeft } from "@/components/Icons";

export default function NotFound() {
  return (
    <div className="wrap">
      <PageBoard
        label="404 · status: not so fine"
        title={
          <>
            This page is <em>probably</em> somewhere else.
          </>
        }
        lede="It might have moved, or it never existed. Either way, the desk is a bit messy."
        actions={
          <Link className="btn primary" href="/">
            <ArrowLeft /> Back home
          </Link>
        }
      >
        <Note at={{ right: "8%", top: "14%", r: 6 }} className="note-sm">
          note to self: the page was right here
        </Note>
        <Redacted
          at={{ right: "22%", bottom: "10%", r: -4 }}
          title="Page 404"
          progress={0}
        />
      </PageBoard>
    </div>
  );
}
