import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-100 bg-white/70">
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
    </footer>
  );
}
