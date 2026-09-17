import type { Metadata } from "next";
import { ContentCard, PageHero } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Developer API",
  description:
    "Unheic has no photo upload API by design. Convert HEIC to JPG in the browser with the same client-side engine used on this site.",
  alternates: { canonical: "/api" },
  openGraph: {
    title: "Unheic Developer API",
    description:
      "Client-side HEIC to JPG conversion. There is no server endpoint that accepts photos.",
    url: "/api",
  },
};

export default function ApiPage() {
  return (
    <>
      <PageHero
        kicker="Developer API"
        title="A converter you can run in the browser"
        description="Unheic does not expose a REST endpoint for photos. That would require uploads. Use the same in-browser conversion path this site uses."
      />
      <ContentCard>
        <div className="space-y-8 text-sm leading-6 text-slate-500">
          <section>
            <h2 className="text-lg font-semibold text-slate-900">Why there is no upload API</h2>
            <p className="mt-2">
              A server-side HEIC converter would receive the original files.
              Unheic is built so conversion cannot leave the device. The public
              interface is this web app, not a multipart POST.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-900">Browser conversion</h2>
            <p className="mt-2">
              This site uses the <code className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-700">heic-to</code>{" "}
              engine (libheif in WebAssembly) to turn HEIC/HEIF into JPEG:
            </p>
            <pre className="mt-4 overflow-x-auto rounded-2xl bg-slate-950 p-4 text-[13px] leading-6 text-slate-100">
{`import { heicTo } from "heic-to/next";

const jpg = await heicTo({
  blob: file,
  type: "image/jpeg",
  quality: 0.9,
});`}
            </pre>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-900">Limits</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Up to 50 HEIC or HEIF files per batch</li>
              <li>JPEG quality from 0.5 to 0.95</li>
              <li>Optional EXIF copy on the client</li>
              <li>Folder drag-and-drop via the File System Access entries API</li>
            </ul>
          </section>
        </div>
      </ContentCard>
    </>
  );
}
