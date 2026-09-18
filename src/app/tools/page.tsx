import type { Metadata } from "next";
import Link from "next/link";
import { INPUT_FORMATS, OUTPUT_FORMATS } from "@/lib/formats";
import { toolsBySource } from "@/lib/tools";

export const metadata: Metadata = {
  title: "All Image Converters",
  description:
    "Convert HEIC, JPG, PNG, WebP, and AVIF in your browser. Pick a dedicated converter — files never leave your device.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  const groups = toolsBySource();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6">
      <p className="text-center text-[11px] font-semibold tracking-[0.22em] text-blue-600 uppercase">
        Converters
      </p>
      <h1 className="mt-3 text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Convert HEIC, JPG, PNG, WebP, and AVIF
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-base text-slate-500">
        Each tool is a dedicated page. Conversion still happens in your browser.
      </p>
      <div className="mt-12 space-y-10">
        {groups.map((group) => (
          <section key={group.from}>
            <h2 className="text-lg font-semibold text-slate-900">
              From {group.label}
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {group.tools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={tool.href}
                  className="rounded-2xl border border-slate-100 bg-white px-5 py-4 text-sm font-semibold text-slate-800 shadow-[0_8px_30px_rgba(15,23,42,0.03)] transition hover:border-blue-100 hover:text-blue-700"
                >
                  {INPUT_FORMATS[tool.from].label} to{" "}
                  {OUTPUT_FORMATS[tool.to].label}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
