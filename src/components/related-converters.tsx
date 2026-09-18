import Link from "next/link";
import { INPUT_FORMATS, OUTPUT_FORMATS } from "@/lib/formats";
import { relatedTools, type ConversionTool } from "@/lib/tools";

export function RelatedConverters({ tool }: { tool: ConversionTool }) {
  const related = relatedTools(tool);
  if (!related.length) return null;

  return (
    <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
      <h2 className="text-center text-xl font-bold tracking-tight text-slate-900">
        More converters
      </h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {related.map((item) => (
          <Link
            key={item.slug}
            href={item.href}
            className="rounded-2xl border border-slate-100 bg-white px-5 py-4 text-sm font-semibold text-slate-800 shadow-[0_8px_30px_rgba(15,23,42,0.03)] transition hover:border-blue-100 hover:text-blue-700"
          >
            {INPUT_FORMATS[item.from].label} to {OUTPUT_FORMATS[item.to].label}
          </Link>
        ))}
      </div>
    </section>
  );
}
