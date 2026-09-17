"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";

const NAV = [
  { href: "/how-it-works", label: "How it Works" },
  { href: "/privacy", label: "Privacy & Security" },
  { href: "/api", label: "API" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100/90 bg-white/90 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="hidden rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-500 sm:inline">
            HEIC to JPG
          </span>
        </div>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 text-[13px] font-medium text-slate-500 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors hover:text-slate-900 ${
                pathname === item.href ? "text-slate-900" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/#converter"
            className="hidden h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm shadow-blue-600/25 sm:flex"
            aria-label="Start converting HEIC to JPG"
          >
            <span className="h-2 w-2 rounded-full bg-white" />
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-slate-100 bg-white px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-3 py-2.5 text-sm font-medium ${
                  pathname === item.href
                    ? "bg-slate-50 text-slate-900"
                    : "text-slate-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
