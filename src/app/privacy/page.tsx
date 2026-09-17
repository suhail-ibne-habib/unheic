import type { Metadata } from "next";
import { ContentCard, PageHero } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Privacy & Security",
  description:
    "Unheic converts HEIC photos to JPG entirely on your device. Files are never uploaded, stored, or shared with a server.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy & Security | Unheic",
    description:
      "HEIC to JPG conversion happens in your browser. Your photos never leave your device.",
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        kicker="Privacy & security"
        title="Your photos never leave this tab"
        description="Unheic is designed so that HEIC conversion cannot leak to a network. There is no upload API for images, and no account that could store them."
      />
      <ContentCard>
        <div className="space-y-8 text-sm leading-6 text-slate-500">
          <section>
            <h2 className="text-lg font-semibold text-slate-900">Client-side only</h2>
            <p className="mt-2">
              Decoding and JPEG encoding run in WebAssembly on your device. The
              HEIC bytes stay in browser memory until you download the JPG or
              close the tab.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-900">No image servers</h2>
            <p className="mt-2">
              We do not operate a photo processing backend. There is nothing to
              intercept, no disk that could retain a copy, and no third-party
              CDN that receives your files.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-900">Metadata stays with you</h2>
            <p className="mt-2">
              EXIF, GPS, and camera tags are read locally when Keep EXIF is on.
              If you turn it off, those tags are omitted from the JPG. Either
              way, metadata is not transmitted to us.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-900">What we do collect</h2>
            <p className="mt-2">
              The static website may receive ordinary hosting logs such as IP
              address and requested URL. Those logs never include your photos.
            </p>
          </section>
        </div>
      </ContentCard>
    </>
  );
}
