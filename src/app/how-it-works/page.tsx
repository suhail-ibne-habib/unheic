import type { Metadata } from "next";
import { ContentCard, PageHero } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "How HEIC to JPG Conversion Works",
  description:
    "Unheic converts HEIC and HEIF photos to JPG entirely in your browser with WebAssembly. Learn how private, client-side conversion works.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How HEIC to JPG Conversion Works",
    description:
      "Unheic converts HEIC and HEIF photos to JPG entirely in your browser with WebAssembly.",
    url: "/how-it-works",
  },
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        kicker="How it works"
        title="HEIC to JPG without leaving your browser"
        description="Unheic decodes Apple HEIC photos locally with a WebAssembly libheif engine, then encodes a JPG you can download immediately."
      />
      <ContentCard>
        <ol className="space-y-8">
          <li>
            <h2 className="text-lg font-semibold text-slate-900">1. Add HEIC or HEIF files</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Drop individual photos or an entire folder. Unheic accepts up to 50
              .HEIC / .HEIF files per batch and ignores other formats so Windows
              Explorer dumps stay easy.
            </p>
          </li>
          <li>
            <h2 className="text-lg font-semibold text-slate-900">2. Decode on your CPU</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              A WebAssembly build of libheif unpacks the HEIC bitstream inside
              this tab. Nothing is posted to a server, so conversion works
              offline after the page has loaded.
            </p>
          </li>
          <li>
            <h2 className="text-lg font-semibold text-slate-900">3. Encode JPG at your quality</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Choose JPEG quality from 50% to 95%. The default 90% High setting
              is the best balance of fidelity and file size for iPhone photos.
            </p>
          </li>
          <li>
            <h2 className="text-lg font-semibold text-slate-900">4. Keep EXIF if you want it</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              With Keep EXIF enabled, camera make, lens, timestamp, and GPS are
              copied into the JPG. Disable it for a clean file with no location
              data.
            </p>
          </li>
        </ol>
      </ContentCard>
    </>
  );
}
