import Link from "next/link";
import { INPUT_FORMATS, OUTPUT_FORMATS } from "@/lib/formats";
import { toolsBySource } from "@/lib/tools";

const converterGroups = toolsBySource();

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-100 bg-white/70">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] text-blue-600 uppercase">
              Converters
            </p>
            <h2 className="mt-1 text-lg font-semibold text-slate-900">
              Pick a format pair
            </h2>
          </div>
          <Link
            href="/tools"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View all converters
          </Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {converterGroups.map((group) => (
            <div key={group.from}>
              <p className="text-[11px] font-semibold tracking-[0.16em] text-slate-400 uppercase">
                {group.label}
              </p>
              <ul className="mt-2.5 space-y-1.5">
                {group.tools.map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={tool.href}
                      className="text-[13px] text-slate-600 hover:text-slate-900"
                    >
                      {INPUT_FORMATS[tool.from].label} to{" "}
                      {OUTPUT_FORMATS[tool.to].label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-slate-100">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-5 text-center sm:flex-row sm:px-6 sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            100% In-Browser • Zero Server Upload
          </div>
          <p className="text-[12px] text-slate-500">
            Files never leave your device.
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12px] text-slate-500">
            <Link href="/privacy-policy" className="hover:text-slate-800">
              Privacy Policy
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/api" className="hover:text-slate-800">
              Developer API
            </Link>
            <span className="text-slate-300">·</span>
            <span>© {new Date().getFullYear()} Unheic. Open client-side engine.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
