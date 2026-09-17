import { Cpu, Lock, Zap } from "lucide-react";

const FEATURES = [
  {
    icon: Lock,
    tint: "bg-emerald-50 text-emerald-600",
    title: "100% Private & In-Browser",
    body: "Files are processed entirely via optimized WebAssembly inside your browser tab. Zero network telemetry, zero remote cloud transfers.",
    footnote: "Zero server transmission",
    footnoteTint: "text-emerald-600",
  },
  {
    icon: Cpu,
    tint: "bg-sky-50 text-sky-600",
    title: "Preserve EXIF & HDR",
    body: "Maintains all critical metadata tags including GPS coordinates, capture timestamp, camera lens parameters, and wide Display P3 color space profiles.",
    footnote: "Display P3 to sRGB conversion",
    footnoteTint: "text-sky-600",
  },
  {
    icon: Zap,
    tint: "bg-indigo-50 text-indigo-600",
    title: "Fast Batch Processing",
    body: "Multithreaded SIMD web workers utilize your device’s multi-core CPU architecture to decode multiple HEIC streams simultaneously.",
    footnote: "Multithreaded Web Workers",
    footnoteTint: "text-indigo-600",
  },
] as const;

export function FeatureCards() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <p className="text-center text-[11px] font-semibold tracking-[0.22em] text-blue-600 uppercase">
        How it works
      </p>
      <h2 className="mt-3 text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Designed for Complete Data Sovereignty
      </h2>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {FEATURES.map((feature) => (
          <article
            key={feature.title}
            className="rounded-[28px] border border-white bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.04)]"
          >
            <span
              className={`mb-6 inline-flex h-11 w-11 items-center justify-center rounded-2xl ${feature.tint}`}
            >
              <feature.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-500">{feature.body}</p>
            <p className={`mt-6 text-xs font-medium ${feature.footnoteTint}`}>
              {feature.footnote}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
