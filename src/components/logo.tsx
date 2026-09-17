import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-blue-600 shadow-sm shadow-blue-600/20">
        <svg
          viewBox="0 0 24 24"
          className="h-[18px] w-[18px] text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="6" width="13" height="11" rx="2" />
          <path d="M8 19h10a2 2 0 0 0 2-2V8" />
          <circle cx="8.2" cy="11.2" r="1.1" fill="currentColor" stroke="none" />
          <path d="m6.8 15.2 2.3-2.3 1.6 1.6 2.6-3.1 2.5 3.8" />
        </svg>
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-slate-900">
        Unheic
      </span>
    </Link>
  );
}
