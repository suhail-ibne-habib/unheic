import type { Metadata } from "next";
import { ContentCard, PageHero } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "How Image Conversion Works",
  description:
    "Unheic converts HEIC, JPG, PNG, WebP, and AVIF entirely in your browser. Learn how private, client-side conversion works.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How Image Conversion Works",
    description:
      "Unheic converts HEIC, JPG, PNG, WebP, and AVIF entirely in your browser.",
    url: "/how-it-works",
  },
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        kicker="How it works"
        title="HEIC, JPG, PNG, WebP, and AVIF without leaving your browser"
        description="Each format has its own page. Unheic decodes Apple HEIC with WebAssembly and converts JPG, PNG, WebP, and AVIF on a canvas in this tab."
      />
      <ContentCard>
        <ol className="space-y-8">
          <li>
            <h2 className="text-lg font-semibold text-slate-900">1. Add photos</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Drop individual files or an entire folder. Unheic accepts up to 50
              HEIC, HEIF, JPG, PNG, WebP, AVIF, or GIF files per batch.
            </p>
          </li>
          <li>
            <h2 className="text-lg font-semibold text-slate-900">2. Decode on your CPU</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              HEIC is unpacked with libheif in WebAssembly. JPG, PNG, WebP, and
              AVIF are decoded by the browser. Nothing is posted to a server.
            </p>
          </li>
          <li>
            <h2 className="text-lg font-semibold text-slate-900">3. Pick JPG, PNG, WebP, or AVIF</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Lossy formats use the quality you choose (default 90% High). PNG
              stays lossless. AVIF encoding depends on your browser.
            </p>
          </li>
          <li>
            <h2 className="text-lg font-semibold text-slate-900">4. Keep EXIF on JPG</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              With Keep EXIF enabled, camera make, lens, timestamp, and GPS are
              copied into JPG output. Other formats download without EXIF.
            </p>
          </li>
        </ol>
      </ContentCard>
    </>
  );
}
